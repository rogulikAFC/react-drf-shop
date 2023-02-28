import Main from "./components/Main"
import { Context } from "./hooks/ProductsContext"

function App() {
    return (
        <Context>
            <div className="App">
                <header className="header App__header">
                    <h1 className="header__title"> React shop </h1>
                    <h3 className="header__subtitle"> Buy everything you want </h3>
                </header>
                <Main />
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
        </Context>
    )
}

export default App
