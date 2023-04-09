import { HashRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import Shop from "./components/Shop";

function App() {
        
    return (
        <HashRouter>
            <Navbar />
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
            </Switch>
        </HashRouter>
    );

}

export default App;
