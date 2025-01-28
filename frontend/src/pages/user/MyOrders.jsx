import { useEffect, useState } from "react"
import { getUserOrders } from "../../api/order"
import moment from "moment"


const MyOrders = () => {
  const [orders, setOrders] = useState([])

  //fonction pour récupérer les commandes de l'utilisateur
  const fetchOrders = () => {
    getUserOrders()
      .then((res) => {
        if (res.status === 200) {
          setOrders(res.result) //stock les commandes dans le state
        } else {
          console.error("Erreur lors de la récupération des commandes :", res.msg)
        }
      })
      .catch((err) => console.error("Erreur API :", err))
  }

  //chargement des commandes
  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <section className="my-orders-container orders-with-navbar">
    <h2 className="my-orders-title">Mes Commandes</h2>
    {orders.length === 0 ? (
      <p className="no-orders-message">
        Vous n'avez encore passé aucune commande. <span>💔</span>
      </p>
    ) : (
      <table className="tableHardcore">
        <thead>
          <tr>
            <th>Numéro</th>
            <th>Date</th>
            <th>Montant Total</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{moment(order.created_at).format("DD-MM-YYYY")}</td>
              <td>{order.total_amount} €</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </section>
  )
}

export default MyOrders