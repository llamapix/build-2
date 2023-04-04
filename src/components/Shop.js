import shopLlama from "../images/shopLlama.png";

function Shop() {

    return (
        <header>
            <link rel="stylesheet" type="text/css" href="index.css"/>
            <link rel="icon" type="image/x-icon" href="images/L_name.png"/>
            <h1 className="coming-soon">COMING SOON!</h1>
            <h1 className="holders-only">HOLDERS ONLY!</h1>
            <div className="shopLlama">
                    <img className="shop-llama" src={ shopLlama } alt="shop-llama"/></div>
        </header>
    );
}

export default Shop;