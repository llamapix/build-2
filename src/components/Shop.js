import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { Buffer } from "buffer";
import { useState, useEffect } from "react";

import { faSailboat, faList } from "@fortawesome/free-solid-svg-icons";
import { faMedium, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import logo from "../images/logo.png";
import iconImage from "../images/L_name.png";
import shopLlama from "../images/shopLlama.png";

function Shop() {

    // eslint-disable-next-line
    let signer;
    window.Buffer = window.Buffer || Buffer;
    const [ show, setShow ] = useState(true);
    const [ walletAddress, setWalletAddress ] = useState("");
    const connectedProvider = ((window.ethereum != null) ? 
        new ethers.providers.Web3Provider(window.ethereum) : 
        ethers.providers.getDefaultProvider());

    useEffect(() => {
        getCurrentWallet();
        addWalletListener();
    });
    
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setShow(false);
            } else if (window.innerWidth < 768) {
                setShow(true);
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const connectWallet = async() => {
        if(typeof window != "undefined" && typeof window.ethereum != "undefined"){
            try{
                const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
                setWalletAddress(accounts[0]);
                let connectedProvider = new ethers.providers.Web3Provider(window.ethereum);
                signer = connectedProvider.getSigner();
            } catch(err) {
                console.error(err.message);
            }
        } else {
            console.log("Please install MetaMask");
        }
    }

    const getCurrentWallet = async() => {
        if(typeof window != "undefined" && typeof window.ethereum != "undefined"){
            try{
                const accounts = await window.ethereum.request({method: "eth_accounts"});
                if(accounts.length > 0){
                    setWalletAddress(accounts[0]);
                    console.log(accounts[0]);
                    signer = connectedProvider.getSigner();
                } else {
                    console.log("Please connect with MetaMask")
                }
            } catch(err) {
                console.error(err.message);
            }
        } else {
            console.log("Please install MetaMask");
        }
    }

    const addWalletListener = async() => {
        if(typeof window != "undefined" && typeof window.ethereum != "undefined"){
            window.ethereum.on("accountsChanged", (accounts) => {
                setWalletAddress(accounts[0]);
            });
        } else {
            setWalletAddress("");
            console.log("Please install MetaMask");
        }
    }

    return (
        <header>
            <link rel="stylesheet" type="text/css" href="index.css"/>
            <link rel="icon" type="image/x-icon" href="images/L_name.png"/>
            <div className="top-bar">
                <Link to="/"><img className="logo" src={logo} alt="logo"/></Link>
                <Link to="/"><img className="icon" src={iconImage} alt="icon"/></Link>
                <div alt="list button"><button className="list-button" onClick={()=>setShow(!show)}>
                    <FontAwesomeIcon icon={faList} style={{color: "yellow"}} /></button></div>
                <div>
                    {
                        show ? <></> :
                        <>
                            <Link className="home-page-button" to="/">HOME</Link>
                            <Link className="gallery-page-button" to="/gallery">GALLERY</Link>
                            <Link className="shop-page-button" to="/shop">SHOP</Link>
                            <Link className="collabs-page-button" to="/mint">MINT</Link>
                        </>
                    }
                </div>
                <div className="twitter-button" alt="twitter button">
                    <a href="https://twitter.com/LlamaPixNFT" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faTwitter}/></a></div>
                <div className="opensea-button" alt="opensea button"><a href="# ">
                    <FontAwesomeIcon icon={faSailboat}/></a></div>
                <div className="medium-button" alt="medium button">
                    <a href="https://medium.com/@llamapix.nft/llamapix-9ff635226703" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faMedium}/></a></div>
                    <div className="connect-button" onClick={connectWallet}>
                    {//eslint-disable-next-line
                    ((walletAddress && walletAddress.length > 0) ? <a>{walletAddress.substring(0, 2)}...{
                    //eslint-disable-next-line
                    walletAddress.substring(38)}</a> : <a>Connect</a>)}
                </div>
            </div>
            <h1 className="coming-soon">COMING SOON!</h1>
            <h1 className="holders-only">HOLDERS ONLY!</h1>
            <div className="shopLlama">
                    <img className="shop-llama" src={ shopLlama } alt="shop-llama"/></div>
        </header>
    );
}

export default Shop;