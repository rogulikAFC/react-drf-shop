import InCartProducts from "./InCartProducts"
import { ProductsContext } from "../hooks/ProductsContext"
import { useContext, useState, useEffect } from "react"

function InCartContainer() {
    let countInCart = 0
    let cartPrice = 0

    let {productsInCart, isCartOpen, hideCart, fetchProducts, setProductsInCart, products} = useContext(ProductsContext)
    let [isError, setIsError] = useState(false)
    let [error, setError] = useState()

    productsInCart.forEach(product => {
        countInCart += product.count
        cartPrice += product.count * product.price
    })

    const getSimplifiedInCart = () => {
        let products = []

        productsInCart.forEach(product => {
            products.push({
                id: product.id,
                count: product.count
            })
        })

        return products
    }

    const buyCart = async () => {
        setIsError(false)
        let response = await fetch('http://127.0.0.1:8000/api/buy_cart', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },

            body: JSON.stringify(getSimplifiedInCart())
        })

        if (!response.ok) {
            let result = await response.json()
            setIsError(true)
            setError(result.detail)
            return
        }

        fetchProducts()
    }

    useEffect(() => setProductsInCart([]), [products])

    return (
        <div className="in-cart-container main__in-cart-container" >
            <button className="btn in-cart-container__btn btn_light-green btn_open-cart"> {countInCart > 0? `${countInCart} items in cart`: 'Cart is empty'} </button>
            {cartPrice > 0? <strong className="price in-cart-container__price"> {cartPrice}$ </strong>: null}
            {isCartOpen && productsInCart.length > 0? <button className="btn in-cart-container__btn btn_dark-green btn_close-cart" onClick={hideCart}> Close cart </button>: null}
            <InCartProducts />
            {productsInCart.length > 0? <button className="btn in-cart-container__btn btn_dark-green" onClick={buyCart}> Pay! </button>: null}
            {isError? <strong className="error in-cart-container__error"> {error} </strong>: null}
        </div>
    )
}

export default InCartContainer