import { useState, useEffect } from "react"
import { config } from "../config"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { modifyBasket, selectBasket } from "../slices/basketSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons"


const ArticleDetail = (props) => {
    // On récupère le panier depuis Redux
    const basket = useSelector(selectBasket)
    const dispatch = useDispatch()
    
    //On crée des états locaux pour la quantité, les erreurs et la popup
    const [quantity, setQuantity] = useState("")
    const [error, setError] = useState(false)
    
    //Fonction pour ajouter un produit au panier
    const onClickBasket = (oldBasket, newProduct) => {
        let myQuantity
        //Si l'utilisateur n'a pas saisi de quantité, on met 1 par défaut
        if(quantity === ""){
            myQuantity = 1
            setQuantity(1)
        } else {
            myQuantity = parseInt(quantity)
        }

        //On vérifie si la quantité est valide
        if(isNaN(myQuantity || myQuantity <= 0)){
            setError("Saisissez un nombre positif s'il vous plait")
        } else {
            setError(null)
            //On crée une copie du panier pour le modifier
            let newBasket = JSON.parse(JSON.stringify(oldBasket))
            //On cherche si le produit est déja dans le panier
            const same = newBasket.findIndex((b) => b.id === newProduct.id)
            //Si le produit n'est pas dans le panier
            if(same === -1){
                //On crée une copie du produit
                let myProduct = JSON.parse(JSON.stringify(newProduct))
                //On ajoute la quantité au produit
                myProduct.quantityInCart = myQuantity
                //On ajoute le produit au panier
                let myBasket = [...newBasket, myProduct]
                //On sauvegarde le panier dans le localStorage
                window.localStorage.setItem("b4y-basket", oldBasket)
                //On met a jour le panier dans Redux
                dispatch(modifyBasket(myBasket))
            }
            
        }
    }

    return (<li id="product-mosaic">
        {/*Affichage des erreus s'il y en a */}
        {error !== null && <p>{error}</p>}

        
        <div>
            <h3>{props.prod.name}</h3>
            <img src={config.pict_url + props.prod.picture} alt={`bombe aérosol hardcore ${props.prod.name} - ${props.prod.description}`}/> 
            <p>{props.prod.description.substr(0,50)}</p>
            <p>prix : {props.prod.price} €</p>
            {/*Lien vers la page de détail du produit */}
            <Link to={`/detail/${props.prod.id}`} className="btn-detail" > En savoir Plus
            
            </Link>
            </div>
        

        {/*Formulaire pour ajouter au panier */}
        <form
            onSubmit={(e)=>{
                e.preventDefault()
                onClickBasket(basket.basket, props.prod)
            }}
        >
            <input type="text" 
                onChange={(e)=>{
                    setQuantity(e.currentTarget.value)
                }}
            />
            <button className="addToBasket"><FontAwesomeIcon icon={faPlusCircle}/></button>
        </form>
    </li>)
}

export default ArticleDetail