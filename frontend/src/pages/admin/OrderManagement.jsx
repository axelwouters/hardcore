import { useEffect, useState } from "react" 
import { getAllOrders } from "../../api/order" 
import moment from "moment" //Bibliotheque js
import { Link } from "react-router-dom" 

const OrderManagement = () => {
  const [orders, setOrders] = useState([]) //créer un état local pour stocker la liste des commandes

  //chargement des commandes lors du montage du composant
  useEffect(() => {
    getAllOrders() //appel à l'API pour récupérer toutes les commandes
      .then((res) => {
        if (res.status === 200) { //vérifie si la réponse est réussie
          setOrders(res.result) //met à jour l'état local avec les commandes récupérées
        }
      })
      .catch((err) => console.error(err)) //gère des erreur en cas de problème d'API
  }, [])

  return (
    <div>
      <h3>Liste des Commandes</h3>
      
      <table className="table-Hardcore"> 
        <thead> 
          <tr>
            <th>Numéro</th> 
            <th>Prix Total</th>
            <th>Date de confirmation</th> 
            <th>Etat</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? ( // vérifie si des commandes sont disponibles
            orders.map((o) => ( // parcourt la liste des commandes
              <tr key={o.id}> {/* chaque ligne a une clé unique basée sur l'ID de la commande */}
                <td>
                  {/* lien vers les détails de la commande */}
                  <Link to={`/orderDetail/${o.id}`}>{o.id}</Link> {/* affiche l'ID de la commande comme lien */}
                </td>
                <td>{o.total_amount} euros</td>
                <td>{moment(o.created_at).format("DD-MM-YYYY")}</td> 
                <td>{o.status}</td> 
              </tr>
            ))
          ) : (
            //message si aucune commande n'est disponible
            <tr>
              <td colSpan="4">Aucune commande disponible</td> 
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default OrderManagement