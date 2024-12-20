import { useSelector } from "react-redux"
import { selectHardcores } from "../slices/hardcoreSlice"
import ArticleDetail from "../components/Article-product"



const Product = () => {
    const produits = useSelector(selectHardcores)

    return (
        <section id="produit">
            <h2>Le graffiti est l'un des rares outils dont on dispose quand on n'a presque rien</h2>
            {produits.hardcores.length > 0 && <ul>
                    {produits.hardcores.map((b)=>{
                        return <ArticleDetail key={b.id} prod={b} />
                    })}
                </ul>}
        </section>
    )
}

export default Product