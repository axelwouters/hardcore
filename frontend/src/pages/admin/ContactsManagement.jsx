import { useState, useEffect } from "react"



const ContactsManagement = () => {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const API_BASE_URL = "http://localhost:9500/api/v1/contacts"
    
    //On recupere la liste des contacts 
    useEffect(() => {
        const fetchContacts = async () => {
            try{
                const response = await fetch(`${API_BASE_URL}/all`) 
                if(!response.ok){
                    throw new error (`Erreur ${response.status}: ${response.statusText}`)
                }
                const data = await response.json()
                setContacts(data.contacts)
            }catch(err){
                setError(err.message)
            }finally{
                setLoading(false)
            }
        }
        fetchContacts()
    }, [])

    //On supprime le message
    const handleDelete = async (id) => {
        if(!window.confirm("Voulez-vous vraiment supprimer le message ?")) return
        try{
            const response = await fetch(`http://localhost:9500/api/v1/contact/delete/${id}`, {
                method: "DELETE",
            })
            if(!response.ok){
                throw new Error(`Erreur ${response.status}: ${response.statusText}`)
            }
            setContacts (contacts.filter((contact) => contact.id !== id )) //Mise a jour de la liste
        } catch(err){
            alert("Impossible de suprrimer le message") 
        }
    }

    //marque le message comme lu
  const markAsRead = async (id) => {
    try {
        const response = await fetch(`http://localhost:9500/api/v1/contact/${id}/read`, {
            method: "PUT",
        })

        if (!response.ok) {
            throw new Error(`Erreur ${response.status} : ${response.statusText}`)
        }

        //met à jour la liste sans recharger la page
        setContacts(
            contacts.map((contact) =>
                contact.id === id ? { ...contact, statut: "lu" } : contact
            )
        )
    } catch (err) {
        alert("Impossible de marquer comme lu !")
    }
}

const markAsUnread = async (id) => {
    try {
        const response = await fetch(`http://localhost:9500/api/v1/contact/${id}/unread`, {
            method: "PUT",
        })

        if (!response.ok) {
            throw new Error(`Erreur ${response.status} : ${response.statusText}`)
        }

        setContacts(
            contacts.map((contact) =>
                contact.id === id ? { ...contact, statut: "non lu" } : contact
            )
        )
    } catch (err) {
        alert("Impossible de marquer comme non lu !")
    }
}

    return(
        <div className="contacts-management">
            <h2>Gestion des Messages</h2>
            {loading ? (
                <p>Chargement des messages...</p>
            ): error ? (
                <p className="error">Erreur: {error}</p>
            ): contacts.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact.id}>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.story}</td>
                                <td>{new Date(contact.receipt_date).toLocaleDateString()}</td>
                                <td>{contact.statut === "non lu"? (
                                    <button className="mark-btn read" onClick={()=> markAsRead(contact.id)}>
                                         Lu
                                    </button>
                                ):(
                                    <button className="mark-btn unread" onClick={()=> markAsUnread(contact.id)}>
                                        Non lu
                                    </button>
                                )}
                                <button className="delete-btn" onClick={()=> handleDelete(contact.id)}>
                                    Supprimer
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ): (
                <p>Aucun message reçu</p>
            )}
        </div>
    )

}

export default ContactsManagement