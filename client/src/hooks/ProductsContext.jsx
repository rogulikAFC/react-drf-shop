import { createContext,  useState } from "react"

export const ProductsContext = createContext()

export const Context = props => {
    // const getProductsViaApi = async () => {
    //     const response = await fetch('http://127.0.0.1:8000/api/products')
    //     const json = await response.json()
    //     let productsArray = []
    //     json.forEach(product => {
    //         productsArray.push({
    //             id: product.id,
    //             title: product.title,
    //             price: product.price,
    //             rating: product.rating,
    //             count: product.available,
    //         })
    //     })
    //     return productsArray
    // }

    const [products, setProducts] = useState([])

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

    const removeSomeOfProduct = (productID, count) => {
        let isFinded = false

        products.forEach(function loop(product) {
            if (product.id === productID) {
                if (product.count >= count) {
                    product.count -= count

                    isFinded = true
                    loop.stop = true
                }
            }
        })

        return isFinded
    }

    const removeOneProduct = productID => {
        return removeSomeOfProduct(productID, 1)
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

    let [cartRef, setCartRef] = useState()
    let [isCartOpen, setIsCartOpen] = useState(false)

    const hideCart = () => {
        cartRef.current.style.display = 'none'
        setIsCartOpen(false)
    }

    const showCart = () => {
        cartRef.current.style.display = 'grid'
        setIsCartOpen(true)
    }

    const fetchProducts = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/products')
        const json = await response.json()
        console.log(json)
        let productsArray = []
        json.forEach(product => {
            productsArray.push({
                id: product.id,
                title: product.title,
                price: product.price,
                rating: product.rating,
                count: product.available,
            })
        })
        setProducts(productsArray)
    }

    const contextValue = {
        products,
        addProduct,
        addOneProduct,
        removeOneProduct,
        setProducts,
        fetchProducts,

        productsInCart,
        addOneProductToCart,
        removeOneProductFromCart,
        setProductsInCart,

        setCartRef,
        hideCart,
        showCart,

        isCartOpen,
        
        // getProductsViaApi
    }

    return (
        <ProductsContext.Provider value={contextValue}>
            {props.children}
        </ProductsContext.Provider>
    )
}