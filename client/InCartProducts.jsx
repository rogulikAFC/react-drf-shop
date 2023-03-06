import { useContext } from "react"
import { ProductsContext } from "../hooks/ProductsContext"
import Product from "./Product"

function InCartProducts() {
    let {inCart} = useContext(ProductsContext)

    return (
        <div className={`products in-cart-container__products`}>
            {inCart.map(product => (
                <Product key={product.id} id={product.id} title={product.title} />
            ))}
        </div>
    )
}

export default InCartProducts