import { useSelector, useDispatch } from "react-redux" 
import { deleteOneHardcore, displayHardcores } from "../../api/hardcore" 
import { config } from "../../config" 
import { loadHardcores, selectHardcores } from "../../slices/hardcoreSlice"
import { Link } from "react-router-dom" 

const ProductManagement = () => {
  //récupère de l'état des produits depuis Redux
  const hardcore = useSelector(selectHardcores)
  const dispatch = useDispatch() 

  //fonction pour supprimer un produit
  const onClickDeleteHardcore = (id) => {
    deleteOneHardcore(id) //appel à l'API pour supprimer le produit
      .then((res) => {
        if (res.status === 200) { //vérifie si la suppression est réussie
          return displayHardcores() //appelle l'API pour récupérer la liste mise à jour des produits
        } else {
          throw new Error(`Erreur de suppression : ${res.status}`) //lève une erreur si la suppression échoue
        }
      })
      .then((response) => {
        if (response.status === 200) { //vérifie si la récupération des produits est réussie
          dispatch(loadHardcores(response.result)) //met à jour l'état global avec les nouveaux produits
        }
      })
      .catch((err) => console.error(err)) 
  }
  return (
    <div className="management">
      <Link to="/addHardcore" className="addhardcore">
        Ajouter un produit
      </Link>

      <table className="tableHardcore-first">
        <thead> 
          <tr>
            <th>Image</th> 
            <th>Nom</th> 
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
          {/* affiche les produits si la liste n'est pas vide */}
          {hardcore.hardcores.length > 0 ? (
            hardcore.hardcores.map((b) => ( //parcours de la liste des produits
              <tr key={b.id}> {/* chaque ligne a une clé unique basée sur l'ID du produit */}
                <td>
                  <img src={config.pict_url + b.picture} alt={b.name} /> {/* affiche l'image du produit */}
                </td>
                <td>{b.name}</td> {/* affiche le nom du produit */}
                <td>
                  {/* lien pour modifier le produit */}
                  <Link className="btn-modifier" to={`/editHardcore/${b.id}`}>Modifier</Link>
                  {/* bouton pour supprimer le produit */}
                  <button onClick={() => onClickDeleteHardcore(b.id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            //message si aucun produit n'est disponible
            <tr>
              <td colSpan="3">Aucun produit disponible</td> 
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ProductManagement