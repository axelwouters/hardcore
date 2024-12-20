import { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import { useDispatch } from "react-redux"
import { cleanBasket } from "../slices/basketSlice"




const Success = (props) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        window.localStorage.removeItem("b4y-basket")
        dispatch(cleanBasket())
    }, [])

    return (
        <section id="succes">
            <h2>Hardcore, vous remercie de votre achat</h2>
            <p>Votre commande à été effectuer avec succès</p>
            <Link className="retour" to="/">Retour</Link>
        </section> 

    )
}
export default Success