import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import React, { useState, useEffect } from "react";
import keccak256 from "keccak256";
import MerkleTree from "merkletreejs/dist";
import goldenLlamaForMint from "../images/llama-gold.gif";
import goldFrameForMint from "../images/frame.gif";
import infoframe from "../images/info-frame.png";
import Web3 from "web3";
import MyContractABI from "../MyContractABI.json";

const ipfs = create('https://ipfs.io/');
const bufToHex = x => "0x" + x.toString("hex");

function Mint() {
    const [num, setNum] = useState(3);
    const [newList, setList] = useState([]);
    const [walletAddress, setWalletAddress] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [contractInstance, setContractInstance] = useState(null);
    const storage = 'QmaBR6R7uTe5M5CKRTigVAsjVCBVS5vfbdkf4CwaeTtH81';
    const MyContractAddress = "0x9204f747FDa6F9F61e6D6dC982CDBf2dAF87aE4c";

    const numIncrease = async () => {
        num < 3 ? setNum(num + 1) : setNum(num);
    };

    const numDecrease = async () => {
        num > 1 ? setNum(num - 1) : setNum(num);
    };

    async function file(storage) {
        const fileStream = ipfs.cat(storage);
        const chunks = [];
        for await (const chunk of fileStream) {
        chunks.push(chunk);
        }
        const fetchedData = Buffer.concat(chunks).toString().toLowerCase();
        const newData = fetchedData.split(",").map((item) => item.substring(2));
        newData[0] = "0x" + newData[0];
        return newData;
    }

    useEffect(() => {file(storage).then((list) => {setList(list);});}, []);

    const tree = new MerkleTree(newList.map((x) => keccak256(x)), keccak256, {
        sortPairs: true,
    });

    function generateProof(userAddress) {
        return tree.getProof(keccak256(userAddress)).map((x) => bufToHex(x.data));
    }

    //console.log(bufToHex(tree.getRoot()))

    async function mintButton() {
        if (window.ethereum) {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(MyContractABI, MyContractAddress);
            setContractInstance(contract);
            const accounts = await web3.eth.getAccounts();
            setAccounts(accounts);
            setWalletAddress(accounts[0]);
            const proof = walletAddress ? generateProof(walletAddress) : null;
            const balance = await contractInstance.methods
                .balanceOf(walletAddress).call();
            console.log(balance)
            function ifNoBalance(){
                if (balance == 0){
                    return num - 1
                }else{
                    return num
                }
            }
            const weiAmount = web3.utils.toWei(((ifNoBalance()) * 0.004).toString(), "ether");
            const result = await contractInstance.methods.whitelistMint(num, proof).send({
                from: accounts[0],
                value: weiAmount
            });
        } else {
            console.error("Web3 not found");
        }
    }

    return (
        <header>
            <script></script>
            <link rel="stylesheet" type="text/css" href="index.css"/>
            <link rel="icon" type="image/x-icon" href="images/L_name.png"/>
            <div className="framedGoldenLlama">
                <img className="golden-llama-for-mint" src={goldenLlamaForMint} alt=""/>
                <img className="gold-frame-for-mint" src={goldFrameForMint} alt=""/>
            </div>
            <div className="pageTitle">
                <h1 className="title">MINT IS LIVE!</h1>
            </div>
            <div className="pageSubTitle">
                <a className="whitelist-label" href="/#">Whitelist</a>
                <a className="public-label" href="/#">Public</a>
                <img className="infoframe-whitelist" src={infoframe} alt=""></img>
                <img className="infoframe-public" src={infoframe} alt=""/>
            </div>
            <div className="pageMainInfo">
                <p className="whitelist-info"> 
                    1 Free <br/>
                    0.004 For More<br/>
                    (3 per wallet)
                </p>
                <p className="public-info"> 
                    <br/>
                    0.006<br/>
                    (3 per wallet)
                </p>
            </div>
            <div className="postPageInfo">
                <div className="mint-button-position">
                    <button className="mint-button" onClick={mintButton}>MINT</button>
                </div>
                <div className="minus-button-position" onClick={numDecrease}>
                    <button className="minus-button">-</button>
                </div>
                <p className="counter">{num}</p>
                <div className="plus-button-position" onClick={numIncrease}>
                    <button className="plus-button">+</button>
                </div>
            </div>
        </header>
    );
}

export default Mint;
