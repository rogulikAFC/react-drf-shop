import { useContext } from "react"
import { ProductsContext } from "../hooks/ProductsContext"
import MainProduct from "./MainProduct"

function MainProducts() {
    // if (elName === 'main__products') {
    //     let {products} = useContext(ProductsContext)

    // } else if (elName === 'in-cart-container__products') {
    //     let {inCart} = useContext(ProductsContext)
    // }

    let {products} = useContext(ProductsContext)

    // console.log(inCart)
    // // console.log(elName)
    
    // let productsToList
    // let isInCart

    // if (elName === 'main__products') {
    //     productsToList = products
    //     isInCart = false

    // } else if (elName === 'in-cart-container__products') {
    //     productsToList = inCart
    //     isInCart = true
    // }

    return (
        <div className={`products main__products`}>
            {products.map(product => (
                <MainProduct key={product.id} id={product.id} title={product.title} />
            ))}
        </div>
    )
}

export default MainProducts