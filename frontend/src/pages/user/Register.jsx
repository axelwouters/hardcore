import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { addOneUser } from "../../api/user";
import { validateFirstname } from "../../../../backend/public/js/utilitise";
import { validateLastname } from "../../../../backend/public/js/utilitise";
import { validatePassword } from "../../../../backend/public/js/utilitise";
import { validateEmail } from "../../../../backend/public/js/utilitise";
import { validatePhone } from "../../../../backend/public/js/utilitise";
import { validateCity } from "../../../../backend/public/js/utilitise";
import { validateZip } from "../../../../backend/public/js/utilitise";

const Register = (props) => {

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const [zip, setZip] = useState(0)
    const [city, setCity] =useState("")
    const [phone, setPhone] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(null)

    const onSubmitForm = (e) => {
        e.preventDefault()
        setError(null)
        //On creer l'objet qui contient les données du formulaire
        const datas = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            address: address,
            zip: zip,
            city: city,
            phone: phone
        }
        //On valide le champ de formulaire
        if(!validateFirstname(firstname)){
            setError("Vous devez mettre au moins une majuscule et une miniscule, vous ne devez pas mettre de chiffre, ni de caractère spécial pour votre prénom")
            return
        }
        
        if(!validateLastname(lastname)){
            setError("Vous devez mettre au moins une majuscule et une miniscule, vous ne devez pas mettre de chiffre, ni de caractère spécial pour votre nom")
            return
        }

        
        if(!validateEmail(email)){
            setError("Vous devez vérifier votre en ajoutant un @ et un . pour votre email")
            return
        }
        
        if(!validatePassword(password)){
            setError("Le mot de passe doit contenir 8 caractère: Ajouter une Majuscule, une miniscule, un chiffre et un caractere spécial pour votre MOT DE PASSE")
            return
        }
        
        if(!validateZip(zip)){
            setError("Vous devez mettre votre adresse qui doit comporter au 5 chiffre")
            return
        }
        
        if(!validateCity(city)){
            setError("Vous devez mettre votre ville qui ne doit pas contenir de chiifre et de caractère spéciaux")
            return
        }
        
        if(!validatePhone(phone)){
            setError("Veulliez confirmer votre numéro de téléphone, qui contient bien des chiifres")
            return
        }
        
        //On envoie les données au serveur pour enregistrer
        addOneUser(datas)
        .then((res)=>{
            if(res.status === 200){
                setRedirect(true)//Si c'est bon alors on retourne a la page login
            } else {
                setError(res.msg)
            }
        })
        .catch(err=>console.log(err))
    }

    if(redirect){
        return <Navigate to="/login" />
    }
    return (
        <main id="bienvenue">

        <section>
            <h2 style={{textAlign: "center"}}>S'Enregistrer</h2>
            {error !== null && <p className="error-message">{error}</p>}
            <form
            className="register-form"
            onSubmit={onSubmitForm}
            >
            
                <input type="text" 
                placeholder="Veuiller mettre votre Prénom"
                onChange={(e)=>{
                    setFirstname(e.currentTarget.value)
                }}
                />
                 <input type="text" 
                placeholder="Veuiller mettre votre Nom"
                onChange={(e)=>{
                    setLastname(e.currentTarget.value)
                }}
                />
                 <input type="email" 
                placeholder="Veuiller mettre votre Email"
                onChange={(e)=>{
                    setEmail(e.currentTarget.value)
                }}
                />
                 <input type="password" 
                placeholder="Veuiller mettre votre Mot de Passe"
                onChange={(e)=>{
                    setPassword(e.currentTarget.value)
                }}
                />
                 <input type="text" 
                placeholder="Veuiller mettre votre adresse"
                onChange={(e)=>{
                    setAddress(e.currentTarget.value)
                }}
                />
                 <input type="number" 
                placeholder="Veuiller mettre votre code postal"
                onChange={(e)=>{
                    setZip(e.currentTarget.value)
                }}
                />
                 <input type="text" 
                placeholder="Veuiller mettre votre ville"
                onChange={(e)=>{
                    setCity(e.currentTarget.value)
                }}
                />
                 <input type="text" 
                placeholder="Veuiller mettre votre téléphone"
                onChange={(e)=>{
                    setPhone(e.currentTarget.value)
                }}
                />
                <input type="submit" name="Enregistrer"/>

            </form>
        </section>
                </main>
    )

}

export default Register