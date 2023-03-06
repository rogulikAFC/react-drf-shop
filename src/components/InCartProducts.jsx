import React, { useContext, useRef } from "react"
import { ProductsContext } from "../hooks/ProductsContext"
import InCartProduct from "./InCartProduct"

function InCartProducts() {
    let {productsInCart, setCartRef} = useContext(ProductsContext)
    let cartRef = useRef()
    setCartRef(cartRef)

    return (
        <div className="products in-cart-container__products products_modal" ref={cartRef}>
            {productsInCart.map(product => (
                <InCartProduct key={product.id} id={product.id} title={product.title} price={product.price} count={product.count} />
            ))}
        </div>
    )
}

export default InCartProducts