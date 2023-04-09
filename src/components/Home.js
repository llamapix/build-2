import goldFrame from "../images/frame.gif";
import goldenLlama from "../images/llama-gold.gif";
import collabsImage from "../images/collabsImage.png";
import collabsMobile from "../images/collabsMobile.png";

function Home() {

    return (
        <header>
            <link rel="stylesheet" type="text/css" href="index.css"/>
            <link rel="icon" type="image/x-icon" href="images/L_name.png"/>
            <div>
                <div className="framedGoldenLlama">
                    <img className="golden-llama" src={ goldenLlama } alt="yellow-llama"/>
                    <img className="gold-frame" src={ goldFrame } alt="golden-frame"/></div>
                <div className="pageTitle">
                    <h1 className="homepage-title">WHITELIST FORM</h1></div>
                <div className="pageSubTitle">
                    <h2 className="subTitle">FOR DEGEN BY DEGEN</h2></div>
                <div className="pageMainInfo">
                    <p className="mainInfo"> 
                        LlamaPix is an NFT collection of 3333 pixel themed cool llama characters.
                        We are bringing these Llamas to life for degens who wants to look cool. 
                        Until now, no llama holder has regretted the llama they minted. 
                        You will not regret it either. Stay tuned on twitter for announcements.
                    </p>
                </div>
                    <div className="collabs-description-container">
                        <h1 className="collabs-description">OUR COLLABS</h1>
                    </div>
                    <div className="collabs-image-container">
                        <img className="collabs-image" src={ collabsImage } alt="collabs"/>
                    </div>
                    <div className="collabs-mobile-container">
                        <img className="collabs-mobile" src={ collabsMobile } alt="collabsMobile"/>
                    </div>
            </div>
        </header>
    );
}

export default Home;
