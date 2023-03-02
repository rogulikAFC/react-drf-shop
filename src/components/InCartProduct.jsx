function InCartProduct({id, title, count}) {
    // let {remove }

    // const removeOne = () => {
    //     removeFromCart(id)
    //     console.log('product removed')

    //     setChoosenCount(prev => prev - 1)
    // }

    return (
        <div className="product products__product">
            <h2 className="product__title">{title}</h2>
            <div className="product__interaction">
                {/* <button className="btn product__btn product__to-cart" onClick={addProductToCart}> To cart </button> */}
                <span className="product__count"> {count} added </span>
            </div>
        </div>
    )
}

export default InCartProduct