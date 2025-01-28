import { useEffect, useState } from "react"
import { config } from "../config"
import { Link } from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowCircleLeft, faPlusCircle} from "@fortawesome/free-solid-svg-icons"
import {takeOneHardcore} from "../api/hardcore"

import { useDispatch, useSelector } from "react-redux"
import { modifyBasket, selectBasket } from "../slices/basketSlice"



const Detail = (props) => {
    const basket = useSelector(selectBasket)
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState("")
    const [error, setError] = useState(null)
    const [hardcore, setHardcore] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    //Une fonction pour ajout au panier
    const onClickBasket = (oldBasket, newProduct) => {
        let myQuantity
            if(quantity === ""){
                myQuantity = 1
                setQuantity(1)
            } else {
                myQuantity = parseInt(quantity)
            }

            if(isNaN(myQuantity)){
                setError("Veuillez saisir un nombre de quantité s'il vous plait")
            } else {
                setError(null)
                //Je fais une copie du panier en cassant le read only pour pouvoir le modifier
                let newBasket = JSON.parse(JSON.stringify(oldBasket))
                //Nous allons parcourir le panier pour verifier si le produit est ajouter existe ou pas
                const same = newBasket.findIndex((b)=> b.id === newProduct.id)
                //Le produit n'existe pas
                if(same === -1){
                    //le newProduct est aussi en read only on le casse
                    let myProduct = JSON.parse(JSON.stringify(newProduct))
                    //On va creer une nouvelle propriété pour savoir la quantiter
                    myProduct.quantityInCart = myQuantity
                    //On récupere le panier précedent en ajoutant le nouveau produit
                    let myBasket = [...newBasket, myProduct]
                    //On le pousse dans le panier pour le mettre a jour dans le storage
                    let lsBasket = JSON.stringify(myBasket)
                    window.localStorage.setItem("b4y-basket", lsBasket)
                    //On le pousse dans le store de redux
                    dispatch(modifyBasket(myBasket))
                } else {
                    //Le produit est déja dans le panier on va rajouter la quantité
                    newBasket[same].quantityInCart += myQuantity
                    //On pousse le panier qui a été mise a jour dans le storage
                    let lsBasket = JSON.stringify(newBasket)
                    window.localStorage.setItem("b4y-basket", lsBasket)
                    //On le pousse dans le store de redux
                    dispatch(modifyBasket(newBasket))
                }
                
            }
    }

    useEffect(()=>{
        setIsLoading(true)
        takeOneHardcore(props.params.id)
        .then((res)=>{
            if(res.status === 200){
                setHardcore(res.result)
            }
        })
        .catch(err=>console.log(err))
    }, [])

    return (<section id="detail">
        <h2 style={{textAlign: "center"}}>Details {props.params.id}</h2>
        {isPopUp && <PopUp 
            msg={`Vous avez ajouté: ${quantity} hardcore dans votre panier!`}
            onClickClose={(e)=>{
                setIsPopUp(false)
                setQuantity("")
            }}
        />}
        <Link className="comeBack" to="/product"><FontAwesomeIcon icon={faArrowCircleLeft}/></Link>
        {hardcore !== null && <div className="hardcoreDetail">
            <img src={config.pict_url + hardcore.picture} alt={`Image de hardcore ${hardcore.name}`}/>
            <h3>{hardcore.name}</h3>
            <p>{hardcore.description}</p>
        </div> }
        {error !== null && <p>{error}</p>}
        <form
            style={{textAlign:"center"}}
            onSubmit={(e)=>{
                e.preventDefault()
               onClickBasket(basket.basket, hardcore)
            }}
        >
            <input type="text"
                onChange={(e)=>{
                    setQuantity(e.currentTarget.value)
                }}
            />
            <button className="addToBasket"><FontAwesomeIcon icon={faPlusCircle}/></button>
        </form>
    </section>)
}

export default Detail

/**/