import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../../../slices/userSlice"
import { loadHardcores } from "../../../slices/hardcoreSlice"
import { Navigate } from "react-router-dom"

import { displayHardcores, addOneHardcore } from "../../../api/hardcore"

import axios from "axios"
import {config} from "../../../config"

//On crée un composant pour ajouter un nouveau produit "Hardcore"
const AddHardcore = (props) => {
    //On recupere les infos de l'utilisateur et on prépare des actions pour plus tard
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    //On crée des variables pour stocker les infos du nouveau produit
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [selectedFile, setFile] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(null)

    //Je fais la fonction pour ajouter le produit dans la base de données
    const addProd = (datas) => {
        addOneHardcore(datas)
        .then((res)=>{
            if(res.status === 200){
                //Si ça marche, on met à jour la liste des produits
                displayHardcores()
                .then((response)=>{
                    if(response.status === 200){
                        dispatch(loadHardcores(response.result))
                        setRedirect(true)
                    }
                })
                .catch(err=>console.log(err))
            } else {
                console.log(res)
            }
        })
        .catch(err=>console.log(err))
    }

    //Fonction pour sauvegarder le produit complet
    const saveCompleteHardcore = async () => {
        try {
            // Utilisons les deux sources de token pour debugger
            const localToken = window.localStorage.getItem('hardcore-token');
            const reduxToken = user.infos?.token;
            
            console.log("Local Storage token:", localToken);
            console.log("Redux token:", reduxToken);
            
            // Utilisons le token de Redux en priorité, sinon celui du localStorage
            const token = reduxToken || localToken;
    
            if(!token) {
                setError("Token d'authentification manquant");
                return;
            }
    
            if(selectedFile === null) {
                const datas = {
                    name,
                    description,
                    price,
                    quantity,
                    picture: "no-pict.jpg"
                }
                addProd(datas)
            } else {
                const formData = new FormData()
                formData.append("images", selectedFile)
    
                // Ajoutons les deux tokens dans les headers pour tester
                const headers = {
                    "Content-Type": "multipart/form-data",
                    "x-access-token": token,
                    "Authorization": `Bearer ${token}`  // Ajout d'un header Bearer au cas où
                };
    
                console.log("Headers envoyés:", headers);
                console.log("URL de la requête:", `${config.api_url}/api/v1/hardcore/pict`);
    
                const response = await axios({
                    method: "post",
                    url: `${config.api_url}/api/v1/hardcore/pict`,
                    data: formData,
                    headers: headers,
                    validateStatus: function (status) {
                        return status < 500; // Pour voir les erreurs 400
                    }
                });
    
                console.log("Réponse complète:", response);
    
                if(response.status === 200) {
                    const datas = {
                        name,
                        description,
                        price,
                        quantity,
                        picture: response.data.url
                    }
                    addProd(datas)
                } else {
                    throw new Error(response.data.msg || "Erreur lors de l'upload");
                }
            }
        } catch (err) {
            console.error("Erreur détaillée:", err);
            setError(err.message || "Erreur inconnue");
        }
    }

    //Fonction qui s'exécute quand on soumet le formulaire
    const onSubmitForm = (e) => {
        e.preventDefault()
        //On vérifie que tous les champs sont remplis et valides
        if(name === "" || description === "" || price === "" || quantity === ""){
            setError("Tous les champs ne sont pas remplis!")
        } else if(isNaN(quantity) || isNaN(price)){
            setError("Les champs 'prix' et 'quantité' doivent obligatoirement être un chiffré!")
        } else {
            saveCompleteHardcore()
        }
    }
    //Si tout est bon, on redirige vers la page admin
    if(redirect){
        return <Navigate to="/admin" />
    }

    //On affiche le formulaire pour ajouter un produit
    return (<section id="ajouter">
        <h2>Mettez un Produit</h2>
        {error !== null && <p>{error}</p>}
        <form
        className="b-form"
        onSubmit={onSubmitForm}
        >
            {/*Champs pour le noom, l'image, la description, la quantité et le prix */}
            <input
            type="text"
            placeholder="Nom de la Bombe aérosol Hardcore"
            onChange={(e)=>{
                setName(e.currentTarget.value)
            }}
            />

            <input
            type="file"
            onChange={(e)=>{
                setFile(e.currentTarget.files[0])
            }}
            />

            <textarea
            type="description"
            onChange={(e)=>{
                setDescription(e.currentTarget.value)
            }}
            ></textarea>

            <input
            type="text"
            placeholder="Quantité disponible"
            onChange={(e)=>{
                setQuantity(e.currentTarget.value)
            }}
            />

            <input
            type="text"
            placeholder="Prix de vente"
            onChange={(e)=>{
                setPrice(e.currentTarget.value)
            }}
            />

            <button>Enregistrer</button>
        </form>
    </section>)

}

export default AddHardcore