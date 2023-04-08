import { Buffer } from "buffer";
import { create } from "ipfs-http-client";
import { useState, useEffect } from "react";
import React from "react";

const ipfs = create('https://ipfs.io/');
const bufToHex = x => "0x" + x.toString("hex")
window.Buffer = window.Buffer || Buffer;

function Checker() {

    const [ newList, setList ] = useState([]);
    const [ userWallet, setUserWallet] = useState ("");
    const [ status, setStatus] = useState(". . .");
    const [ color, setColor ] = useState("yellow");
    const storage = 'QmZzEiEkFrozJrJvmaAFAqkG39z2tcSSWbDNbD22V3UDUp';

    async function file(storage) {
        const fileStream = ipfs.cat(storage);
        const chunks = [];

        for await (const chunk of fileStream) {
            chunks.push(chunk);
        }

        const fetchedData = Buffer.concat(chunks).toString().toLowerCase();
        const newData = fetchedData.split(',').map(item => item.substring(2));
        newData[0] = '0x' + newData[0];
        return newData;
    }

    useEffect(() => {
        file(storage).then(list => {
            setList(list);
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(newList.includes(userWallet)){
            setStatus("YOU ARE WHITELISTED!")
            setColor("greenyellow")
        } else {
            setStatus("YOU ARE NOT WHITELISTED!")       
            setColor("red")
        }
    }

    return (
        <div>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
            <link rel="stylesheet" href="index.css"/>  
            <h1 className="button-result" style={{color: color}}>{status}</h1>
            <h1 className="checker-warning">MAKE SURE TO ENTER THE RIGHT WALLET</h1>
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <div className="demo-flex-spacer"></div>
                    <div className="webflow-style-input">
                        <input className="" required value={userWallet}
                            onChange={(e) => setUserWallet((e.target.value).toLowerCase())}
                            placeholder="ENTER YOUR WALLET">
                        </input>
                    </div>
                    <div className="demo-flex-spacer"></div>
                    <div className="check-button-container">
                        <button className="check-button">Check</button>
                    </div>
                    <div className="checker-description">
                        Don't worry if you don't show up as whitelisted. 
                        We're going to continue collecting wallets until 
                        mint day. If you are concerned about your wallet 
                        not showing up as whitelisted you can contact us
                        through twitter.
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Checker;