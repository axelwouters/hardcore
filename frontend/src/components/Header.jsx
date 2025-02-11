import { Link, useNavigate } from "react-router-dom"
import Logo from "../assets/logo/logo-Hardcore.jpg"
import { useDispatch, useSelector } from "react-redux"
import { selectUser, logoutUser, connectUser } from "../slices/userSlice"
import { selectBasket } from "../slices/basketSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faGears, faPersonFalling, faSprayCan, faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"

const Header = (props) => {
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const basket = useSelector(selectBasket)

    //gestion du menu responsive
    const [showLinks, setShowLinks] = useState(false)

    const handleShowLinks = () => {
        setShowLinks(!showLinks)
    }

    const handleLinkClick = () => {
        setShowLinks(false) //fermer le menu
    }

    //fonction de déconnexion
    const logout = (e) => {
        e.preventDefault();
        window.localStorage.removeItem('hardcore-token')
        dispatch(logoutUser())
        navigate('/login')
    }

    //vérification de l'authentification au chargement de la page
    useEffect(() => {
        const token = window.localStorage.getItem('hardcore-token')
        if (token && !user.isLogged) { 
            fetch("http://localhost:9500/api/v1/user/login", {  //assurez-vous que cette route retourne les infos utilisateur
                method: "POST",
                headers: {
                    //On s'assure que la route API retourne les informations de l'utilisateur
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json", //on indique les envoie de donné en JSON
                },
            })
            .then(res => res.json())
            .then(data => {
                if (data.user) {
                    dispatch(connectUser(data.user));
                }
            })
            .catch(err => console.error("Erreur récupération user :", err));
        } 
    }, [dispatch, user.isLogged]);

    return (
        <header id="navigation">
            <nav className={`${showLinks ? "show-nav" : "hidden-nav"}`}>
                <img src={Logo} alt="Logo du site représentant une bombe hardcore"></img>

                <ul>
                    {/* lien vers la page d'accueil */}
                    <li>
                        <Link to="/" onClick={handleLinkClick}><FontAwesomeIcon icon={faHome} /></Link>
                    </li>

                    {/* lien Contactez-nous */}
                    <li><Link to="/contacts" onClick={handleLinkClick}>Contactez-nous</Link></li>

                    {/* utilisateur non connecté */}
                    {!user.isLogged && (
                        <>
                            <li><Link to="/register" onClick={handleLinkClick}>S'Enregistrer</Link></li>
                            <li><Link to="/login" onClick={handleLinkClick}>Se Connecter</Link></li>
                        </>
                    )}

                    {/* utilisateur connecté */}
                    {user.isLogged && (
                        <>
                            {user.infos.role === "ADMIN" && (
                                <li>
                                    <Link to="/admin" onClick={handleLinkClick}>
                                        <FontAwesomeIcon icon={faGears}/> Dashboard
                                    </Link>
                                </li>
                            )}
                            <li>
                                <Link to="/profil" onClick={handleLinkClick}>{user.infos.firstname} {user.infos.lastname.toUpperCase()}</Link>
                            </li>
                            <li><Link to="/my-orders" onClick={handleLinkClick}>Mes commandes</Link></li>
                            <li>
                                <a href="#" onClick={logout}>
                                    <FontAwesomeIcon icon={faPersonFalling}/> Logout
                                </a>
                            </li>
                        </>
                    )}

                    {/* lien vers les produits */}
                    <li>
                        <Link to="/product" onClick={handleLinkClick}><FontAwesomeIcon icon={faSprayCan} /> Produits</Link>
                    </li>

                    {/* lien vers le panier avec le nombre d'articles */}
                    <li>
                        <Link to="/basket" onClick={handleLinkClick}>
                            <FontAwesomeIcon icon={faCartShopping} />
                            {basket.basket.length > 0 && <span className="span-basket">{basket.basket.length}</span>}
                        </Link>
                    </li>
                </ul>

                <button onClick={handleShowLinks}>
                    <span></span>
                </button>
            </nav>
        </header>
    )
}

export default Header