import React, { useContext } from "react"
import { ProductsContext } from "../hooks/ProductsContext"
import InCartProduct from "./InCartProduct"

function InCartProducts() {
    let {productsInCart} = useContext(ProductsContext)

    return (
        <div className={`products in-cart-container__products`}>
            {productsInCart.map(product => (
                <InCartProduct key={product.id} id={product.id} title={product.title} price={product.price} count={product.count} />
            ))}
        </div>
    )
}

export default InCartProducts