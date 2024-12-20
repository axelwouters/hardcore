import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { loginUser } from "../../api/user"
import {useDispatch} from "react-redux"
import { connectUser } from "../../slices/userSlice"
import { validateEmail } from "../../../../backend/public/js/utilitise";
import { validatePassword } from "../../../../backend/public/js/utilitise";



const Login = (props) => {

    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(null)

const onSubmitForm = (e) => {
    e.preventDefault()
    setError(null)

    const datas = {
        email: email,
        password: password
    }

    if(!validateEmail(email)){
        setError("Vous devez vérifier votre en ajoutant un @ et un .")
        return
    }

    if(!validatePassword(password)){
        setError("Le mot de passe doit contenir 8 caractère: Ajouter une Majuscule, une miniscule, un chiffre et un caractere spécial")
        return
    }

    loginUser(datas)
    .then((res)=>{
        if(res.status === 200){
            //Je vais stocker mon token dans le localStorage
            window.localStorage.setItem('hardcore-token', res.token)
            //Je crée un objet d'user à pousser dans le store de redux
            let newUser = res.user
            newUser.token = res.token
            //Je vais ordonner la connexion à redux
            dispatch(connectUser(newUser))
            //Je vais rediriger vers l'accueil
            setRedirect(true)
        } else {
            setError(res.msg)
        }
    })
    .catch(err=>console.log(err))
}

if(redirect){
    return <Navigate to="/profil" />
}
    return (
        
        <div id="login-container">
            <div className="login-form">
                <h2>Se connecter</h2>
                    {error !== null && <p>{}error</p>}
            <form
            onSubmit={onSubmitForm}
            >
                <input type="email" 
                placeholder="Veuillez saisir votre Email"
                onChange={(e)=>{
                    setEmail(e.currentTarget.value)
                 }}
                />
                <input type="password" 
                placeholder="Veuillez saisir votre Mot de Passe"
                onChange={(e)=>{
                    setPassword(e.currentTarget.value)
                 }}
                />
                <input type="submit" name="Enregistrer"/>
            </form>
    
        </div>
    </div>
    
    
    
)

}

export default Login