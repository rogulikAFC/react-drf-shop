import { createContext, useState } from "react"

export const ProductsContext = createContext()

export const Context = (props) => {
    const [products, setProducts] = useState([
        { id: 1, title: 'ladno' },
        { id: 2, title: 'ladno 2' },
        { id: 3, title: 'ladno 3' },
        { id: 4, title: 'ladno 4' }
    ])

    const [inCart, setInCart] = useState([])

    const addProduct = product => {
        setProducts([
            product, ...products
        ])
    }

    const removeProduct = productID => {
        setProducts(products.filter(product => product.id !== productID))
    }

    const addToCart = product => {
        setInCart([
            product, ...inCart
        ])
    }

    const removeFromCart = productID => {
        setInCart(inCart.filter(product => product.id !== productID))
    }

    const [countedInCart, setCountedInCart] = useState([])

    const addToCountedInCart = product => {
        setCountedInCart([...countedInCart, product])
    }

    const removeFromCountedInCart = productID => {
        console.log(countedInCart)

        countedInCart.forEach(product => {
            if (productID === product.id) {
                product.count -= 1
            }
        })      
    }

    const contextValue = {
        products,
        addProduct,
        removeProduct,
        inCart,
        addToCart,
        removeFromCart,
        countedInCart,
        addToCountedInCart,
        setCountedInCart,
        removeFromCountedInCart
    }

    return (
        <ProductsContext.Provider value={contextValue}>
            {props.children}
        </ProductsContext.Provider>
    )
}