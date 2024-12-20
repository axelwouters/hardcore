import { useEffect, useState } from "react"
import { getOneOrder, updateOrder } from "../../../api/order"
import { Link } from "react-router-dom"
import moment from "moment"


//On crée un composant pour afficher les détail d'une commande
const OrderDetail = (props) => {
    //On crée des variables pour stocker les infos de la commande
    const [user, setUser] = useState(null)
    const [order, setOrder] = useState(null)
    const [orderDetail, setOrderDetail] = useState([])

    //Fonction pour changer le statut de la commande
    const changeStatus = (newStatus) => {
        const datas = {
            orderId: props.params.id,
            status: newStatus
        }

        updateOrder(datas)
        .then((res)=>{
            if(res.status === 200){
                recupOrder() //On met à jour les jour infos de la commande
            } else {
                console.log(res)
            }
        })
        .catch(err=>console.log(err))
    }


    //Fonction pour récupérer les infos de la commande
    const recupOrder = () => {
        getOneOrder(props.params.id)
        .then((res)=>{
            if(res.status === 200){
                setOrder(res.order)
                setOrderDetail(res.orderDetail)
                setUser(res.user)
            }
        })
        .catch(err=>console.log(err))
    }

    //On récupère les infos de commande quand la pge se charge
    useEffect(()=>{
        recupOrder()
    }, [])

    //On affiche les détails de la commande
    return (<section>
        <Link to="/admin">Retour à l'admin</Link>
        <h2>Commande numéro {props.params.id}</h2>
        {/* On va afficher les infos du client*/ }
        {user !== null && <article style={{textAlign: "center"}}>
            <h3>{user.firstname} {user.lastname.toUpperCase()}</h3>
            <p>{user.address}</p>
            <p>{user.zip} {user.city}</p>
            <p>{user.phone}</p>
            </article>}
            <div>
                <h3>Détails de la commande</h3>
                 {/* On crée un tableau pour afficher les produits commandés */}
                <table className="tableHardcore first">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Description</th>
                            <th>Quantité acheté</th>
                            <th>Le Prix Total</th>
                        </tr>
                    </thead>
                    {/* On affiche les infos générales de la commande */}
                    {order !== null && <tfoot>
                        <tr>
                        <td></td>
                        <td></td>
                        <td>Date</td>
                        <td>{moment(order.created_at).format("DD-MM-YYYY")}</td>    
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>Total de la Commande</td>
                            <td>{order.total_amount}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>Status</td>
                            <td>{order.status}</td>
                        </tr>   
                    </tfoot>}
                     {/* On affiche chaque produit de la commande */}
                    <tbody>
                        {orderDetail.length > 0 && orderDetail.map((o)=>{
                            return <tr key={o.id}>
                                <td>{o.name}</td>
                                {o.description.length > 30 ? <td>{o.description.substr(0,30)}...</td> : <td>{o.description}</td>}
                                <td>{o.quantity}</td>
                                <td>{o.total} €</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
             {/* Boutons pour changer le statut de la commande */}
            <div style={{textAlign: "center"}}>
                <button
                    onClick={()=>{
                        changeStatus("cancelled")
                    }}
                >
                    Annuler
                </button>

                <button
                onClick={()=>{
                    changeStatus("shipped")
                }}
                >
                    Envoyer
                </button>

                <button
                onClick={()=>{
                    changeStatus("finish")
                }}
                >
                    Terminer
                </button>
            </div>
    </section>)
}

export default OrderDetail