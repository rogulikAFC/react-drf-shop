import { createContext, useState } from "react"

export const ProductsContext = createContext()

export const Context = (props) => {
    const [products, setProducts] = useState([
        {id: 1, title: 'product 1', price: 1983, count: 10},
        {id: 2, title: 'product 2', price: 198, count: 2}
    ])

    const addProduct = product => {
        setProducts([
            product, ...products
        ])
    }

    const addOneProduct = productID => {
        products.forEach(product => {
            if (product.id === productID) {
                product.count += 1
            }
        })
    }

    const removeOneProduct = productID => {
        let isFinded = false

        products.forEach(function loop(product) {
            if (product.id === productID) {
                if (product.count !== 0) {
                    product.count -= 1

                    isFinded = true
                    loop.stop = true
                }
            }
        })

        return isFinded
    }

    const [productsInCart, setProductsInCart] = useState([])

    const addOneProductToCart = product => {
        if (!removeOneProduct(product.id)) return false

        let isFinded = false
        let findedProduct

        productsInCart.forEach(function loop(productInCart) {
            if (product.id === productInCart.id) {
                productInCart.count += 1

                isFinded = true
                findedProduct = productInCart
                loop.stop = true
            }
        })

        if (isFinded) {
            setProductsInCart(prev => {
                let newArray = prev.filter(productInCart => productInCart.id !== product.id)
                newArray.push(findedProduct)

                return newArray
            })
            
            return true
        }

        product.count = 1

        setProductsInCart([
            product, ...productsInCart
        ])

        isFinded = true

        return true
    }

    const removeAllOfProductFromCart = productID => {
        productsInCart.forEach(product => {
            if (productID === product.id) {
                addOneProduct(productID)
                setProductsInCart(
                    prev => prev.filter(productToFilter => productToFilter.id !== productID)
                )
            }
        })
    }

    const removeOneProductFromCart = product => {
        productsInCart.forEach(productInCart => {
            if (product.id === productInCart.id) {
                if (product.count === 1) {
                    removeAllOfProductFromCart(product.id)
                } else {
                    product.count -= 1
                
                    setProductsInCart(prev => {
                        let newArray = prev.filter(productInCart => productInCart.id !== product.id)
                        newArray.push(product)
                        
                        return newArray
                    })

                    addOneProduct(product.id)
                }


                return true
            }
        })

        return false
    }

    const contextValue = {
        products,
        addProduct,
        addOneProduct,
        removeOneProduct,

        productsInCart,
        addOneProductToCart,
        removeOneProductFromCart
    }

    return (
        <ProductsContext.Provider value={contextValue}>
            {props.children}
        </ProductsContext.Provider>
    )
}