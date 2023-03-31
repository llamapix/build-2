import { Route, Switch } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import Shop from "./components/Shop";
import Mint from "./components/Mint";

function App() {
        
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/gallery">
                    <Gallery />
                </Route>
                <Route exact path="/shop">
                    <Shop />
                </Route>
                <Route exact path="/mint">
                    <Mint />
                </Route>
            </Switch>
        </HashRouter>
    );

}

export default App;
