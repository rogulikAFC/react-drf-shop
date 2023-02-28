import { useContext } from "react"
import { ProductsContext } from "../hooks/ProductsContext"
import MainProducts from "./MainProducts"
import InCartProducts from "./InCartProducts"

function Main() {
    let {inCart} = useContext(ProductsContext)

    const countInCart = inCart.length

    return (
        <div className="App__main">
            <div className="in-cart-container main__in-cart-container">
                <button className="in-cart-container__view-cart-button"> {countInCart} items in cart </button>
                <InCartProducts />
            </div>

            <hr />

            <MainProducts />
        </div>
    )
}

export default Main
