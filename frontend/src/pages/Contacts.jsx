import { useState } from "react"

export default function Contacts() {

    //on déclare l'état pour stocker les données du formulaire
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        story: ""
    })

    //état pour gerer l'affichage du message de confirmation
    const [messageSent, setMessageSent] = useState(false)
    const [error, setError] = useState(null)

    //gère la saisie utilisateur dans les chammps du formulaire
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value //met à jour la valeur correspondant au champ modifier
        })
    }
//gère la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault() //empêche le rechargement de la page
        setError(null) //réinitialise l'état d'erreur

        try {
            //envoi les données au serveur via une requête API
            const response = await fetch("http://localhost:9500/api/v1/contact", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), //convertit les données en JSON
            })

            const result = await response.json()

            if (response.ok) {
                setMessageSent(true) //affiche le message de succès
                setFormData({ name: "", email: "", story: "" }) //réinitialise le formulaire

                //masque le message de succès après 3 secondes
                setTimeout(() => setMessageSent(false), 3000)
            } else {
                throw new Error(result.msg || "Erreur lors de l'envoi du message")
            }
        } catch (error) {
            console.error("Erreur API :", error)
            setError("Oups, une erreur est survenue.")
        }
    }
return (
        <div className="main-content">
            <div className="contact-container">
                <h2>Contactez-nous</h2>
                {messageSent && <p className="success-message">Message envoyé avec succès</p>}
                {error && <p className="error-message"> {error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nom"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="story" 
                        placeholder="Votre message"
                        value={formData.story} 
                        onChange={handleChange}
                        required
                    ></textarea>
                    <button type="submit">Envoyer</button>
                </form>
            </div>
        </div>
    )
}