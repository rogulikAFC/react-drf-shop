import { useContext } from "react"
import InCartContainer from "./components/InCartContainer"
import Main from "./components/Main"
import { ProductsContext } from "./hooks/ProductsContext"
import cartImg from './images/cart.png'


function App() {
    let {showCart} = useContext(ProductsContext)

    return (
        <div className="App">
            <header className="header App__header">
                <div className="header__titles-container">
                    <button className="btn header__btn btn_open-cart btn_light-green" onClick={showCart}>
                        <img src={cartImg} alt="cart" className="btn__img" />
                    </button>
                    <div className="header__title-container">
                        <h1 className="header__title"> React shop </h1>
                        <h3 className="header__subtitle"> Buy everything you want </h3>
                    </div>
                </div>

                <hr />

                <InCartContainer />

                <hr />
            </header>

            <Main />

            <hr />

            <footer className="footer App__footer">
                <div className="footer__socials">
                    <div className="social socials__social">
                        <span className="social__title"> Telegram </span>
                    </div>
                    <div className="social socials__social">
                        <span className="social__title"> Whatsapp </span>
                    </div>
                    <div className="social socials__social">
                        <span className="social__title"> Reddit </span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default App
