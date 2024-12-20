import { useDispatch, useSelector } from "react-redux"
import { connectUser, logoutUser, selectUser } from "../../slices/userSlice"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { deleteUser, updateProfil } from "../../api/user"


const Profil = (props) => {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
   // console.log('user state in component:', user);
    const navigate = useNavigate()
    const [msg, setMsg] = useState(null)
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [address, setAddress] = useState("")
    const [zip, setZip] = useState(0)
    const [city, setCity] = useState("")
    const [phone, setPhone] = useState("")

        console.log("probleme",user)
    const removeUser = (e) => {
        e.preventDefault()
       // console.log("usersslice",connectUser)
        deleteUser(user.infos.id)
        .then((res)=>{
            console.log("parla", res)
            if(res.status === 200){
                window.localStorage.removeItem("hardcore-token")
                dispatch(logoutUser())
                navigate("/login")
            } else {
                setMsg("Oups, impossible de supprimer le compte")
            }
        })
        .catch(err=>console.log("teste",err))
        
    }
    const onSubmitForm = (e) => {
        e.preventDefault()
        setMsg(null)
        const datas = {
            firstname,
            lastname,
            address,
            zip,
            city,
            phone
        }
        
        updateProfil(datas, user.infos.id)
        .then((res)=>{
            if(res.status === 200) {  // Vérifiez la structure exacte de votre réponse
                const token = window.localStorage.getItem("hardcore-token")
                let newUser = res.newUser
                newUser.token = token
                dispatch(connectUser(newUser))
                setMsg("Le profil a bien été modifié")
            } else {
                setMsg("Impossible de modifier : " + (res.message || "Erreur inconnue"))
            }
        })
        .catch(err => {
            console.error(err)
            setMsg("Erreur lors de la modification du profil")
        })
    }

    useEffect(()=>{
        setFirstname(user.infos.firstname)
        setLastname(user.infos.lastname)
        setAddress(user.infos.address)
        setZip(user.infos.zip)
        setCity(user.infos.city)
        setPhone(user.infos.phone)
    }, [user])

    return (
        <main id="bienvenue">

        <section>
        <h2 style={{textAlign: "center"}}>Mon Profil</h2>
        {msg !== null && <p style={{textAlign: "center"}}>{msg}</p>}
        <form
            className="register-form"
            onSubmit={onSubmitForm}
            >
            <input type="text"
            defaultValue={user.infos.firstname}
            placeholder="Veuillez mettre votre Prénom"
            onChange={(e)=>{
                setFirstname(e.currentTarget.value)
            }}
            />
            <input type="text"
            defaultValue={user.infos.lastname}
            placeholder="Veuillez mettre votre Nom"
            onChange={(e)=>{
                setLastname(e.currentTarget.value)
            }}
            />
            <input type="text"
            defaultValue={user.infos.address}
            placeholder="Veuillez mettre votre Adresse"
            onChange={(e)=>{
                setAddress(e.currentTarget.value)
            }}
            />
            <input type="number"
            defaultValue={user.infos.zip}
            placeholder="Veuillez mettre votre code postal"
            onChange={(e)=>{
                setZip(e.currentTarget.value)
            }}
            />
            <input type="text"
            defaultValue={user.infos.city}
            placeholder="Veuillez mettre votre ville"
            onChange={(e)=>{
                setCity(e.currentTarget.value)
            }}
            />
            <input type="text"
            defaultValue={user.infos.phone}
            placeholder="Veuillez mettre votre téléphone"
            onChange={(e)=>{
                setPhone(e.currentTarget.value)
            }}
            />
            <input type="submit" name="Enregistrer"/>
        </form>

            <button
            style={{textAlign: "center", backgroundColor: "red", color:"white", display:"block", margin: "10px auto", padding: "10px"}} onClick={removeUser
                
            }
            >
                Supprimer mon Compte
            </button>

    </section>
    </main>
    
)


}



export default Profil