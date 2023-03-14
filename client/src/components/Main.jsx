import MainProducts from "./MainProducts"
import InCartContainer from "./InCartContainer"
import { useContext, useEffect } from "react"
import { ProductsContext } from "../hooks/ProductsContext"


function Main() {
    let {fetchProducts} = useContext(ProductsContext)

    useEffect(() => {
        fetchProducts()
// eslint-disable-next-line
    }, [])

    return (
        <div className="App__main">
            <MainProducts />
        </div>
    )
}

export default Main
