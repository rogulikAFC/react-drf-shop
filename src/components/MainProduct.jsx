import { React, useContext, useState } from "react"
import { ProductsContext } from "../hooks/ProductsContext"

function MainProduct({id, title}) {
    let {addToCart, removeFromCart, removeFromCountedInCart} = useContext(ProductsContext)
    let [choosenCount, setChoosenCount] = useState(0)

    const addProductToCart = () => {
        addToCart({
            id: id,
            title: title
        })
        console.log('product added!')

        setChoosenCount(prev => prev + 1)
    }

    return (
        <div className="product products__product">
            <h2 className="product__title">{title}</h2>
            <div className="product__interaction">
                <button className="btn product__btn product__to-cart" onClick={addProductToCart}> To cart </button>
                {choosenCount > 0 ? (
                    <>
                        <button className="product__remove" onClick={() => removeFromCountedInCart(id)}> Remove one </button>
                        <span className="product__added-count"> {choosenCount} added </span>
                    </ >
                ): null}
            </div>
        </div>
    )
}

export default MainProduct