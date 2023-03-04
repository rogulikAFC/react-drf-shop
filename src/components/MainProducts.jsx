import { useContext } from "react"
import { ProductsContext } from "../hooks/ProductsContext"
import MainProduct from "./MainProduct"

function MainProducts() {
    let {products} = useContext(ProductsContext)

    return (
        <div className={`products main__products`}>
            {products.map(product => (
                <MainProduct key={product.id} id={product.id} title={product.title} price={product.price} count={product.count}/>
            ))}
        </div>
    )
}

export default MainProducts