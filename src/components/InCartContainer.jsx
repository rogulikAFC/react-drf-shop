import InCartProducts from "./InCartProducts"
import { useContext } from "react"
import { ProductsContext } from "../hooks/ProductsContext"

function InCartContainer() {
    let {productsInCart} = useContext(ProductsContext)

    let countInCart = 0
    let cartPrice = 0

    productsInCart.forEach(product => {
        countInCart += product.count
        cartPrice += product.count * product.price
    })

    return (
        <div className="in-cart-container main__in-cart-container">
            <button className="in-cart-container__view-cart-button"> {countInCart > 0? `${countInCart} items in cart`: 'Cart is empty'} </button>
            {cartPrice > 0? <strong className="in-cart-container__price-of-cart"> {cartPrice}$ </strong>: null}
            <InCartProducts />
            {productsInCart.length > 0? <button className="in-cart-container__pay-cart"> Pay! </button>: null}
        </div>
    )
}

export default InCartContainer