import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
//action
import { connectUser, selectUser } from "../slices/userSlice"
import { loadHardcores, selectHardcores } from "../slices/hardcoreSlice"
import { Navigate, useParams } from "react-router-dom"
import { checkMyToken } from "../api/user"
//ici je recupere mes bombe
import { displayHardcores } from "../api/hardcore"


const RequireAuth = (props) => {

    //On recup les params de la route
    const params = useParams()
    //On recupere les states globale de user et hardcore dans le store
    const user = useSelector(selectUser)
    const allHardcores = useSelector(selectHardcores)
    //On recupere la fonction dispatch  
    const dispatch = useDispatch()
    //On va recuperer le composant pour afficher en tant que props
    const Child = props.child
    //On gere la direction
    const [redirect, setRedirect] = useState(false)
    const [redirectAdmin, setRedirectAdmin] = useState(false)

    //quand les props de notre composant sont chargés
    useEffect(()=>{

        if(allHardcores && allHardcores.hardcores && allHardcores.hardcores.length === 0){
            displayHardcores()
            .then((res)=>{
                if(res.status === 200){
                    dispatch(loadHardcores(res.result))
                }
            })
            .catch(err=>console.log(err))
        }

        //Nous allons tester si on es connecter a redux
        //si l'utilisateur n'est pas connecter
        if(user.isLogged === false){
            console.log("user", user.isLogged)
            //on recop le token
            const token = window.localStorage.getItem("hardcore-token")
            //si le storage repond null (pas trouver) et que la props auth est true
            if(token === null && props.auth){
                //accés vers la route refusé
                setRedirect(true)
            } else {
                //si le token est null
                if(token !== null){
                    //on appel notre requete ajax
                    checkMyToken()
                    .then((res)=>{
                        //si la reponse n'est pas 200 positif
                        if(res.status !== 200){
                            //si la route est protéger
                            if(props.auth){
                                //acces a la route refusé
                                setRedirect(true)
                            }
                        } else {
                            //Je stock ma response de la requete ajax
                            let myUser = res.user
                            //On rajoute le token à l'objet
                            myUser.token = token
                            //On appel l'action de la connexion de l'utilisateur dans le store de redux
                            dispatch(connectUser(myUser))
                            //On vas verifié si jamais la route demandé est admin son role sera admin
                            if(myUser.role !== "ADMIN" && props.admin){
                                setRedirectAdmin(true)
                            }
                        }
                    })
                    .catch(err=>console.log(err))
                }
            }
        } else {
            //On stock la réponse de la requete ajax
            //si le role n'est pas admin
            if(user.infos.role !== "ADMIN"){
                //si la props admin est true (route protégée d'admin)
                if(props.admin){
                    //on demande la redirection
                    setRedirectAdmin(true)
                }
            }
        }
    }, [props])
    if(redirect){
        return <Navigate to="/login"/>
    }
    if(redirectAdmin){
        return <Navigate to="/"/>
    }
    return (<Child {...props} params={params} />)
}

export default RequireAuth