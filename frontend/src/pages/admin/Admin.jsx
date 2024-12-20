import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { deleteOneHardcore, displayHardcores } from "../../api/hardcore"
import { config } from "../../config"
import {Link} from "react-router-dom"
import { loadHardcores, selectHardcores } from "../../slices/hardcoreSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons"
import { getAllOrders } from "../../api/order"
import moment from "moment"




const Admin = (props) => {
    const hardcore = useSelector(selectHardcores)
    const dispatch = useDispatch()
    const [orders, setOrders] = useState([])
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)


    //Nous allons faire une suppression d'une bombe hardcore
    const onClickDeleteHardore = (id) => {
        console.log("Début de onClickDeleteHardore pour l'ID:", id);
        deleteOneHardcore(id)
            .then((res) => {
                console.log("Résultat de deleteOneHardcore:", res);
                if (res.status === 200) {
                    console.log("Suppression réussie, affichage des hardcores");
                    return displayHardcores();
                } else {
                    console.log("Statut de réponse inattendu:", res.status);
                    return Promise.reject(new Error(`Statut de réponse inattendu: ${res.status}`));
                }
            })
            .then((response) => {
                console.log("Résultat de displayHardcores:", response);
                if (response.status === 200) {
                    dispatch(loadHardcores(response.result));
                } else {
                    console.log("Erreur lors de l'affichage des hardcores:", response);
                    return Promise.reject(new Error("Erreur lors de l'affichage des hardcores"));
                }
            })
            .catch(err => {
                console.error("Erreur capturée dans onClickDeleteHardore:", err);
                setError(err.message || "Une erreur est survenue lors de la suppression")
                // Ici, vous pouvez définir un état pour afficher l'erreur à l'utilisateur
            });
    }

    useEffect(()=>{
        getAllOrders()
        .then((res)=>{
            if(res.status === 200){
                setOrders(res.result)
            }
        })
        .catch(err=>console.log(err))
    }, [])


    return (<section id="admin">
        <div>
        <h2>Administration</h2>
        <Link className="addhardcore" to="/addHardcore" style={{display: "block", textAlign: "center"}}><FontAwesomeIcon icon={faPlusCircle}/>Ajouter une bombe aérosol</Link>
        <h3>Les Produits</h3>
        <table className="tableHardcore first">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Nom</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    {hardcore.hardcores.length > 0 ? hardcore.hardcores.map((b) => {
        return <tr key={b.id}>
            <td><img src={config.pict_url + b.picture} alt={b.name}/></td>
            <td>{b.name}</td>
            <td>
                <Link className="modifie" to={`/editHardcore/${b.id}`}>Modifier</Link>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        onClickDeleteHardore(b.id)
                    }}
                >
                    Supprimer
                </button>
           
            </td>
        </tr>
    }) : <tr>
        <td colSpan="4">No hardcores available</td>
    </tr>}
</tbody>
        </table>
        </div>


    <article className="FlexTable">
        <h3>Mes Commandes</h3>
        <div>
            <h4>Payer</h4>
        <table className="tableHardcore">

            <thead>
                <tr>
                    <th>Numéro</th>
                    <th>Prix Total</th>
                    <th>Date de confirmation</th>
                    <th>Etat</th>
                </tr>
            </thead>
            <tbody>
                {orders.length > 0 ? orders.map((o)=>{
                    if(o.status === "not payed" || o.status === "cancelled"){
                        return <tr key={o.id}>
                            <td><Link to={`/orderDetail/${o.id}`}>{o.id}</Link></td>
                            <td>{o.total_amount} euros</td>
                            <td>{moment(o.created_at).format("DD-MM-YYYY")}</td>
                            <td>{o.status}</td>
                        </tr>
                    }
                }) : <tr>
                    <td colSpan="3"></td>
                    </tr>}
            </tbody>
        </table>
        </div>
        
        <div>
            <h4>En préparation</h4>
            <table className="tableHardcore">
                <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Prix Total</th>
                        <th>Date de confirmation</th>
                        <th>Etat</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? orders.map((o)=>{
                        if(o.status === "payed"){
                            return <tr key={o.id}>
                                <td><Link to={`/orderDetail/${o.id}`}>{o.id}</Link></td>
                                <td>{o.total_amount} euros</td>
                                <td>{moment(o.created_at).format("DD-MM-YYYY")}</td>
                                <td>{o.status}</td>
                            </tr>
                        }
                    }) : <tr>
                        <td colSpan="3"></td>
                        </tr>}
                </tbody>
            </table>
        </div>

        <div>
            <h4>Expédier</h4>
            <table className="tableHardcore">
                <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Prix Total</th>
                        <th>Date de confirmation</th>
                        <th>Etat</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? orders.map((o)=>{
                        if(o.status === "shipped"){
                            return <tr key={o.id}>
                                <td><Link to={`/orderDetail/${o.id}`}>{o.id}</Link></td>
                                <td>{o.total_amount}</td>
                                <td>{moment(o.created_at).format("DD-MM-YYYY")}</td>
                                <td>{o.status}</td>
                            </tr>
                        }
                    }) :<tr>
                        <td colSpan="3"></td>
                        </tr>}
                </tbody>
            </table>
        </div>

        <div>
            <h4>Terminer</h4>
            <table className="tableHardcore">
                <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Prix Total</th>
                        <th>Date de confirmation</th>
                        <th>Etat</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? orders.map((o)=>{
                        if(o.status === "finish"){
                            return <tr key={o.id}>
                                <td><Link to={`/orderDetail/${o.id}`}>{o.id}</Link></td>
                                <td>{o.total_amount}</td>
                                <td>{moment(o.created_at).format("DD-MM-YYYY")}</td>
                                <td>{o.status}</td>
                            </tr>
                    }
                }) :<tr>
                    <td colSpan="3"></td>
                    </tr>}
                </tbody>
            </table>
        </div>

    </article>

    </section>)
}

export default Admin