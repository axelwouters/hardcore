import { Link, useNavigate } from "react-router-dom";
 import Logo from "../assets/logo/logo-Hardcore.jpg"; 
 import { useDispatch, useSelector } from "react-redux"; 
 import { selectUser, logoutUser } from "../slices/userSlice"; 
 import {selectBasket} from "../slices/basketSlice" 
 import {FontAwesomeIcon} from "@fortawesome/react-fontawesome" 
 import {faHome, faGears, faPersonFalling, faSprayCan, faCartShopping} from "@fortawesome/free-solid-svg-icons"   
 import { useState } from "react";
const Header = (props) => {   

const user = useSelector(selectUser)     
const navigate = useNavigate()     
const dispatch = useDispatch()     
const basket = useSelector(selectBasket) 

//On crée un état pour gérer l'affichage des liens
const [showLinks, setShowLinks] = useState(false)

//Fonction pour basculer l'affichage des liens
const handleShowLinks = () =>{
    setShowLinks(!showLinks)
}

const logout = (e) => { 
    e.preventDefault()         
    //on oublie pas de supprimer le token du localStorage         
    window.localStorage.removeItem('hardcore-token')         
    //on se deconnect du store         
    dispatch(logoutUser())         
    //on se redirige vers le login         
    navigate('/login')     
}     

return (          

    <header id="navigation">
            <nav className={`${showLinks ? "show-nav" : "hidden-nav"}`}>
            <img src={Logo} alt="Logo du site représentant une bombe hardcore"></img>                
            
                <h1>Hardcore</h1>
           
                <ul>
                    {/* Lien vers la page d'accueil */}
                    <li>
                    <Link to="/"><FontAwesomeIcon icon={faHome} />Home </Link>
                    </li>
                    
                    
    
                    {/* Liens quand l'utilisateur non connectés */}
                    {!user.isLogged && (
                        <>
                            <li>
                            <Link to="/register">S'Enregistrer</Link>
                            </li>
                            <li>
                            <Link to="/login">Se Connecter</Link>
                            </li>
                        </>
                    )}
    
                    {/* Liens quand l'utilisateur est connecté */}
                    {user.isLogged && (
                        <>
                            {user.infos.role === "ADMIN" && (
                                <li>
                                    <Link to="/admin">
                                        <FontAwesomeIcon icon={faGears}/> Dashboard
                                    </Link>
                                </li>
                            )}
                            <li>
                                
                                <Link to="/profil">{user.infos.firstname} {user.infos.lastname.toUpperCase()}</Link>
                                
                            </li>
                            <li>
                                <a href="#" onClick={logout}>
                                <FontAwesomeIcon icon={faPersonFalling}/> Logout
                                </a>
                            </li>
                        </>
                    )}
    
                    {/* Lien basket toujours visible */}

                     {/* Lien vers les produits */}
                    <li>
                    <Link to="/product"><FontAwesomeIcon icon={faSprayCan} />Produit</Link> 
                    </li>
                    {/* Lien vers le panier avec le nombre d'articles */}
                    <li>
                    <Link to="/basket"><FontAwesomeIcon icon={faCartShopping} />{basket.basket.length > 0 && <span className="span-basket">{basket.basket.length}</span>}</Link>
                    </li>
                    
                </ul>
    
                <button
                    onClick={handleShowLinks}
                >
                    <span></span>
                </button>
            </nav>
        </header>


    
    ) 
}  

export default Header 