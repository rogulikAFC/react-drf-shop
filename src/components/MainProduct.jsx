import { React, useContext } from "react"
import { ProductsContext } from "../hooks/ProductsContext"

function MainProduct({id, title, price, count}) {
    let {addOneProductToCart} = useContext(ProductsContext)

    let productObj = {
        id: id,
        title: title,
        price: price,
        count: count
    }

    return (
        <div className="product products__product">
            <h2 className="product__title">{title}</h2>
            <div className="product__interaction">
                <button className="btn product__btn product__to-cart" onClick={() => {addOneProductToCart(productObj)}}> To cart </button>
                <strong className="product__price"> {price}$ </strong>
                {count <= 0? <strong> Product is over </strong>: null}
            </div>
        </div>
    )
}

export default MainProduct