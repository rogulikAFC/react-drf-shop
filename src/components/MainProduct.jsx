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
            <strong className="price product__price"> {price} $ </strong>
            <h2 className="product__title">{title}</h2>
            <div className="product__interaction">
                <span className="product__count"> {count > 0? `${count} available`: 'Product is over'} </span>
                <button className="btn product__btn btn_dark-green" onClick={() => {addOneProductToCart(productObj)}}> To cart </button>
            </div>
        </div>
    )
}

export default MainProduct