import { useDispatch, useSelector } from "react-redux"
import { cleanBasket, modifyBasket, selectBasket } from "../slices/basketSlice"
import { selectUser } from "../slices/userSlice"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faTrash} from "@fortawesome/free-solid-svg-icons"
import {saveOneOrder} from "../api/order"
import { Navigate } from "react-router-dom"
import { updateQuantityHardcore } from "../api/hardcore"




const Basket = (props) => {
    const basket = useSelector(selectBasket)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)
    const [redirect2, setRedirect2] = useState(false)
    const [orderId, setOrderId] = useState(null)

    //Au click de l'enregistrement d'une commande et envoie vers le boitier de paiment
    const onClickSaveOrder = (e) => {
        e.preventDefault()
        //si l'utilisateur est connecté
        if(user.isLogged){
            //on va récupérer l'id de l'user connecter est son panier pour l'enregistrement dans le back
            const datas = {
                users_id: user.infos.id,
                basket: basket.basket
            }
            console.log("datas", datas)
            //On appel de la fonction Ajax pour enregistrer une commande
            saveOneOrder(datas)
            .then((res)=>{
                if(res.status === 200){
                    //j'enregistre l'orderId de la commande retourné par la requete
                    setOrderId(res.orderId)
                    setRedirect(true)
                } else {
                    console.log(res)
                }
            })
            .catch(err=>console.log(err))
        } else {
            // si nous sommes pas connecter, on ne peux pas commander
            setRedirect2(true) //On renvoie vers le login
        }
    }

    //Au clik on supprime le produit du panier
    const removeToBasket = (oldBasket, myHardcore) => {
        //On casse le readonly
        let newBasket = JSON.parse(JSON.stringify(oldBasket))
        //On va filtrer l'ancien panier pour créer un nouveau panier sans l'élément
        let basketDel = newBasket.filter(b => b.id !== myHardcore.id)
        //On va écrase le panier dans le storage
        let lsBasket = JSON.stringify(basketDel)
        window.localStorage.setItem("b4y-basket", lsBasket)
        dispatch(modifyBasket(basketDel))
    }

    //Au click on ajoute de la quantité sur un produit
    const addQuantity = (oldBasket, myHardcore) => {
        //On fait péter le readonly
        let newBasket = JSON.parse(JSON.stringify(oldBasket))
        //on cherche dans la panier l'élément sur lequel on veut travailler
        const same = newBasket.findIndex((nb) => nb.id === myHardcore.id)
        if(same !== -1){
            //On l'empéche de prendre plus que la quantité disponible
            if(newBasket[same].quantityInCart < newBasket[same].quantity){
                newBasket[same].quantityInCart += 1
                //On écrase le panier dans le storage et dans le store de redux
                let lsBasket = JSON.stringify(newBasket)
                window.localStorage.setItem("b4y-basket", lsBasket)
                dispatch(modifyBasket(newBasket))
            }
        }
    }

    //Au click on supprime de la quantité sur un produit
    const removeQuantity = (oldBasket, myHardcore) => {
        //On casse le readonly
        let newBasket = JSON.parse(JSON.stringify(oldBasket))
        //On Cherche dans le panier l'élément sur lequel on travaille
        const same = newBasket.findIndex((nb)=> nb.id === myHardcore.id)
        if(same !== -1){
            //On va gerer pour qu'il soit superieur à 0 sinon on supprime
            if(newBasket[same].quantityInCart > 1){
                newBasket[same].quantityInCart -= 1
                //On écrase le panier dans notre storage et dans le store
                let lsBasket = JSON.stringify(newBasket)
                window.localStorage.setItem("b4y-basket", lsBasket)
                dispatch(modifyBasket(newBasket))
            } else {
                removeToBasket(oldBasket, myHardcore)
            }
        }
    }
    //On clique on va supprimer tout le panier
    const vider = () => {
        //on supprime le panier du storage et on va réinitialiser le store de redux
        window.localStorage.removeItem("b4y-basket")
        dispatch(cleanBasket())
    }

    if(redirect){
        return <Navigate to={`/payment/${orderId}`} />
    }
    if(redirect2){
        return <Navigate to="/login" />
    }


    return (<section id="basket">
        <h2>Mes Bombes aérosols Hardcore</h2>
        {basket.basket.length > 0 ? <table className="basketTable">
            <thead>
                <tr>
                    <th>Quantité</th>
                    <th>Action</th>
                    <th>Nom</th>
                    <th className="deskop">Prix Unitaire</th>
                    <th>Le Prix Total</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <td>

                <button
                        className="red-button"
                        onClick={(e)=>{
                            vider()
                        }}
                        >
                            Vider le panier
                        </button>
                            </td>
                </tr>
               
            </tfoot>
            <tbody>
                {basket.basket.map((hardcore)=>{
                    let total = parseFloat(hardcore.price) * parseInt(hardcore.quantityInCart)
                    return (<tr key={hardcore.id}>
                        <td>{hardcore.quantityInCart}</td>
                        <td>
                            <button className="moins"
                            onClick={()=>{
                                removeQuantity(basket.basket, hardcore)
                            }}
                            >
                                -
                            </button>
                            <button className="plus"
                            onClick={()=>{
                                addQuantity(basket.basket, hardcore)
                            }}
                            >
                                +
                            </button>
                        </td>
                        <td>{hardcore.name}</td>
                        <td>{hardcore.price}</td>
                        <td>{total}</td>
                        <td>
                            <button
                            onClick={()=>{
                                removeToBasket(basket.basket, hardcore)
                            }}
                            >
                                <FontAwesomeIcon icon={faTrash}/>
                            </button>
                        </td>
                    </tr>)
                })}
            </tbody>
        </table> : <p>Le panier est vide</p>}
        {basket.basket.length > 0 && <button className="payer" onClick={onClickSaveOrder} style={{display: "block", margin:"10px auto"}}>Payer</button>}
    </section>)
}

export default Basket
