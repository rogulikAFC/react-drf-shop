import MainProducts from "./MainProducts"
import InCartContainer from "./InCartContainer"


function Main() {
    return (
        <div className="App__main">
            <InCartContainer />

            <hr />

            <MainProducts />
        </div>
    )
}

export default Main
