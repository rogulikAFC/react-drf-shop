import React, { useContext, useEffect, useState } from "react"
import { ProductsContext } from "../hooks/ProductsContext"
import InCartProduct from "./InCartProduct"

function InCartProducts() {
    let {inCart, countedInCart, addToCountedInCart, setCountedInCart} = useContext(ProductsContext)
    // let [isLoading, setIsLoading] = useState(false)

    function getProductWithCount(product) {
        const countInCart = () => inCart.filter(
            arrProduct => product.id === arrProduct.id
        ).length

        let productCountInCart = countInCart()

        console.log(productCountInCart)

        product['count'] = productCountInCart

        return product
    }

    function countedArray() {
        let newArr = []

        inCart.forEach(product => {
            let countedProduct = getProductWithCount(product)

            newArr.push(
                countedProduct
            )
        })

        const uniqueProducts = () => [...new Map(newArr.map((m) => [m['id'], m])).values()]
        setCountedInCart(uniqueProducts())

        // return uniqueProducts()
    }

    useEffect(() => countedArray())

    return (
        <div className={`products in-cart-container__products`}>
            {countedInCart.map(product => (
                <InCartProduct key={product.id} id={product.id} title={product.title} count={product.count} />
            ))}
        </div>
    )
}

export default InCartProducts