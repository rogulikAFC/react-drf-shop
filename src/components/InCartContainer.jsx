import InCartProducts from "./InCartProducts"
import { ProductsContext } from "../hooks/ProductsContext"
import { useContext } from "react"

function InCartContainer() {
    let countInCart = 0
    let cartPrice = 0

    let {productsInCart, isCartOpen, hideCart} = useContext(ProductsContext)

    productsInCart.forEach(product => {
        countInCart += product.count
        cartPrice += product.count * product.price
    })

    return (
        <div className="in-cart-container main__in-cart-container" >
            <button className="btn in-cart-container__btn btn_light-green btn_open-cart"> {countInCart > 0? `${countInCart} items in cart`: 'Cart is empty'} </button>
            {cartPrice > 0? <strong className="price in-cart-container__price"> {cartPrice}$ </strong>: null}
            {isCartOpen? <button className="btn in-cart-container__btn btn_dark-green btn_close-cart" onClick={hideCart}> Close cart </button>: null}
            <InCartProducts />
            {productsInCart.length > 0? <button className="btn in-cart-container__btn btn_dark-green"> Pay! </button>: null}
        </div>
    )
}

export default InCartContainer