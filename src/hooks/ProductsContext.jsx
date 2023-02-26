import { createContext, useState } from "react"

export const ProductsContext = createContext()

export const Context = (props) => {
    const [products, setProducts] = useState([
        { id: 1, title: 'ladno' },
        { id: 2, title: 'ladno 2' },
        { id: 3, title: 'ladno 3' },
        { id: 4, title: 'ladno 4' }
    ])

    const addProduct = (product) => {
        setProducts([
            product, ...products
        ])
    }

    const removeProduct = (productID) => {
        let productToRemove = products.filter(
            product => product.id === productID
        )
        setProducts(
            products.remove(productToRemove)
        )
    }
}