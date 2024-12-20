
//On importe les outils dont nous avons besoin
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../../../slices/userSlice"
import { loadHardcores } from "../../../slices/hardcoreSlice"
import  {Navigate} from "react-router-dom"
import { displayHardcores, takeOneHardcore, updateOneHardcore } from "../../../api/hardcore"

import axios from "axios"
import { config } from "../../../config"

//On créer un composant pour modifier un produit "Hardccore" existant
const EditHardcore = (props) => {
    //On recupere les infos de l'utilisateur et on prepare des actions pour plus tard
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    //On créer des variables pour stocker les infos du produit à modifier
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [selectedFile, setFile] = useState(null)
    const [oldPict, setOldPict] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(null)

    //Fonction pour mettre à jour le produit dans la base de données
    const addProd = (datas) => {
        updateOneHardcore(datas, props.params.id)
        .then((res)=>{
            if(res.status === 200){
                //Si ça fonctionne, on met à jour la liste des produit
                displayHardcores()
                .then((response)=>{
                    if(response.status === 200){
                        dispatch(loadHardcores(response.result))
                        setRedirect(true)
                    }
                })
                .catch(err=>console.log(err))
            }
        })
        .catch(err=>console.log(err))
    }

    //Fonction pour sauvegarder le produit modifié (avec image ou sans image)
    const saveCompleteHardcore = () => {
        if(selectedFile === null){
            //Si on n'a pas de nouvelle image, on garde l'ancienne
            const datas = {
                name: name,
                description: description,
                price: price,
                quantity: quantity,
                picture: oldPict
            }
            addProd(datas)
        } else {
            //On prepare l'objet formData qui permet le transport de l'image dans ma requete ajax
            const formData = new FormData()
            formData.append("images", selectedFile)
            //ma requete ajax pour ajouter une image
            axios({
                method: "post",
                url: `${config.api_url}/api/v1/hardcore/pict`,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    "x-access-token": user.infos.token
                }
            })
            .then((res)=>{
                //Si notre image a bien été enregistrée
                if(res.status === 200){
                    const datas = {
                        name: name,
                        description: description,
                        price: price,
                        quantity: quantity,
                        picture: res.data.url
                    }
                    addProd(datas)
                }
            })
            .catch(err=>console.log(err))
        }
    }

    //Une fonction qui s'éxecute quand on soumet le formulaire 
    const onSubmitForm = (e) => {
        e.preventDefault()
        setError(null)
        //On vérifie que tous les champs sont remplis et valides
        if(name === "" || description === "" || price === "" || quantity === ""){
            setError("Tous les champs ne sont pas remplis!")
        } else if(isNaN(quantity) || isNaN(price)){
            setError("Les champs 'prix' et 'quantité' doivent obligatoirement être un chiffré!")
        } else {
            saveCompleteHardcore()
        }
    }

    //Quand la page se charge, on récupère les infos du produit à modifier
    useEffect(()=>{
        console.log(props.params)
        takeOneHardcore(props.params.id)
        .then((res)=>{
            console.log(res)
            setName(res.result.name)
            setDescription(res.result.description)
            setQuantity(res.result.quantity)
            setOldPict(res.result.picture)
            setPrice(res.result.price)
        })
        .catch(err=>console.log(err))
    }, [])

    //Si tout est bon, on redirige vers la page admin
    if(redirect){
        return <Navigate to="/admin"/>
    }

    //On affiche le formulaire pour modifier le produit
    return(<section id="modifier">
        <h2>Modifier un produit</h2>
        {error !== null && <p>{error}</p>}
        <form
        className="b-form"
        onSubmit={onSubmitForm}
        >
            {/* Champs pour le nom, l'image, la description, la quantité et le prix */}
            <input 
            type="text"
            placeholder="Nom de la bombe aérosol"
            defaultValue={name}
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
            name="description"
            defaultValue={description}
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
            defaultValue={price}
            placeholder="Prix de vente"
            onChange={(e)=>{
                setPrice(e.currentTarget.value)
            }}
            />
            <button>Enregistrer</button>
        </form>
        {/* On affiche l'image actuelle du produit */}
        {oldPict !== null && <img src={config.pict_url + oldPict} alt="image actuelle" />}
    </section>)
}

export default EditHardcore