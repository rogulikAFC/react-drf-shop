import { useContext } from "react"
import { ProductsContext } from "../hooks/ProductsContext"

function InCartProduct({id, title, price, count}) {
    let {removeOneProductFromCart} = useContext(ProductsContext)

    let productObj = {
        id: id,
        title: title,
        price: price,
        count: count
    }

    return (
        <div className="product products__product">
            <strong className="price product__price"> {price*count} $ </strong>
            <h2 className="product__title">{title}</h2>
            <div className="product__interaction">
                <span className="product__count"> {count} added </span>
                <button className="btn product__btn btn_green" onClick={() => removeOneProductFromCart(productObj)}> Remove one </button>
            </div>
        </div>
    )
}

export default InCartProduct