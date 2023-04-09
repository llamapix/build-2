import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Web3 from "web3";

import { faSailboat, faList } from "@fortawesome/free-solid-svg-icons";
import { faMedium, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import logo from "../images/logo.png";
import iconImage from "../images/L_name.png";

function Navbar() {

    const [ show, setShow ] = useState(true);
    const [ walletAddress, setWalletAddress ] = useState("");

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

    useEffect(() => {
        async function connectToWeb3() {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({
                        method: 'eth_accounts',
                    });
                    if (accounts.length > 0) {
                        setWalletAddress(accounts[0]);
                    }
                    window.ethereum.on('accountsChanged', (newAccounts) => {
                        setWalletAddress(newAccounts[0]);
                    });
                    const web3 = new Web3(window.ethereum);
                } catch (error) {
                console.error(error);
                }
            } else {
                console.error('Web3 not found');
            }
        }
        connectToWeb3();
    }, []);

    async function handleClick() {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const web3 = new Web3(window.ethereum);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <link rel="stylesheet" type="text/css" href="index.css"/>
            <link rel="icon" type="image/x-icon" href="images/L_name.png"/>
            <div className="top-bar">
                <Link to="/"><img className="logo" src={logo} alt="logo"/></Link>
                <Link to="/"><img className="icon" src={iconImage} alt="icon"/></Link>
                <div alt="list button"><button className="list-button" onClick={()=>setShow(!show)}>
                    <FontAwesomeIcon icon={faList} style={{color: "yellow"}} /></button></div>
                <div>
                    {
                        show ? 
                            <></> :
                            <>
                                <Link className="home-page-button" to="/">HOME</Link>
                                <Link className="gallery-page-button" to="/gallery">GALLERY</Link>
                                <Link className="shop-page-button" to="/shop">SHOP</Link>
                            </>
                    }
                </div>
                <div className="twitter-button-position" alt="twitter button">
                    <a className="twitter-button" href="https://twitter.com/LlamaPixNFT" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faTwitter}/></a>
                </div>
                <div className="opensea-button-position" alt="opensea button">
                    <a className="opensea-button" href="# ">
                    <FontAwesomeIcon icon={faSailboat}/></a>
                </div>
                <div className="medium-button-position" alt="medium button">
                    <a className="medium-button" href="https://medium.com/@llamapix.nft" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faMedium}/></a>
                </div>
                <div className="connect-button-position" onClick={handleClick}>
                    {(walletAddress && walletAddress.length > 0) ? <button className="connect-button">
                    {walletAddress.substring(0, 2)}...{walletAddress.substring(38)}</button> : 
                    <button className="connect-button">Connect</button>}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
