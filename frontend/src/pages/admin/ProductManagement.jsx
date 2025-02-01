import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteOneHardcore, displayHardcores } from "../../api/hardcore";
import { config } from "../../config";
import { loadHardcores, selectHardcores } from "../../slices/hardcoreSlice";
import { Link } from "react-router-dom";

const ProductManagement = () => {
  // Récupère l'état des produits depuis Redux
  const hardcore = useSelector(selectHardcores);
  const dispatch = useDispatch();

  // Charger les produits au montage du composant
  useEffect(() => {
    displayHardcores()
      .then((response) => {
        if (response.status === 200) {
          dispatch(loadHardcores(response.result));
        } else {
          console.error(`Erreur de chargement : ${response.status}`);
        }
      })
      .catch((err) => console.error("Erreur lors du chargement des produits :", err));
  }, [dispatch]);

  // Fonction pour supprimer un produit
  const onClickDeleteHardcore = (id) => {
    deleteOneHardcore(id)
      .then((res) => {
        if (res.status === 200) {
          return displayHardcores();
        } else {
          throw new Error(`Erreur de suppression : ${res.status}`);
        }
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(loadHardcores(response.result));
        }
      })
      .catch((err) => console.error("Erreur lors de la suppression :", err));
  };

  return (
    <div className="management">
      <Link to="/addHardcore" className="addhardcore">Ajouter un produit</Link>

      <table className="tableHardcore-first">
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {hardcore.hardcores.length > 0 ? (
            hardcore.hardcores.map((b) => (
              <tr key={b.id}>
                <td>
                  <img src={`${config.pict_url}${b.picture}`} alt={b.name} />
                </td>
                <td>{b.name}</td>
                <td>
                  <Link className="btn-modifier" to={`/editHardcore/${b.id}`}>Modifier</Link>
                  <button onClick={() => onClickDeleteHardcore(b.id)}>Supprimer</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Aucun produit disponible</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
