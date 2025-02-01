import { useState } from "react"
import ProductManagement from "./ProductManagement" 
import OrderManagement from "./OrderManagement"
import ContactsManagement from "./ContactsManagement"

//déclaration du composant admin
const Admin = () => {
  //déclaration de l'état local activeTab pour gérer l'onglet actif (par défaut "products")
  const [activeTab, setActiveTab] = useState("products")

  return (
    <section id="admin"> 
      <h2>Dashboard</h2> 

      {/* boutons pour changer d'onglet */}
      <div className="admin-tabs"> {/* conteneur des onglets */}
        <button
          className={`tab ${activeTab === "products" ? "active" : ""}`} //ajout de la classe active si l'onglet actuel est products
          onClick={() => setActiveTab("products")} //changement d'onglet vers products au clic
        >
          Gestion des Produits
        </button>
        <button
          className={`tab ${activeTab === "orders" ? "active" : ""}`} //ajout de la classe active si l'onglet actuel est orders
          onClick={() => setActiveTab("orders")} //changement d'onglet vers "orders" au clic
        >
          Gestion des Commandes
        </button>
        <button
          className={`tab ${activeTab === "contacts" ? "active" : ""}`} //ajout de la classe active si l'onglet actuel est orders
          onClick={() => setActiveTab("contacts")} //changement d'onglet vers "orders" au clic
        >
          Gestion des Messages
        </button>
      </div>

      {/* affichage du contenu de l'onglet actif */}
      <div className="tab-content"> {/* conteneur du contenu des onglets */}
        {activeTab === "products" && <ProductManagement />} {/* j'affiche le composant ProductManagement si l'onglet actif est "products" */}
        {activeTab === "orders" && <OrderManagement />} {/* j'affiche le composant OrderManagement si l'onglet actif est "orders" */}
        {activeTab === "contacts" && <ContactsManagement />} {/* j'affiche le composant OrderManagement si l'onglet actif est "orders" */}

      </div>
    </section>
  )
}

export default Admin
