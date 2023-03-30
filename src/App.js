import Home from "./components/Home";
import Gallery from "./components/Gallery";
import Shop from "./components/Shop";
import Mint from "./components/Mint";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
        
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/Gallery">
                    <Gallery />
                </Route>
                <Route exact path="/Shop">
                    <Shop />
                </Route>
                <Route exact path="/Mint">
                    <Mint />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
