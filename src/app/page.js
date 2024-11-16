"use client";

import { useState } from "react";

export default function Page() {
    const [walletAddress, setWalletAddress] = useState("");
    const [balance, setBalance] = useState("");

    const fetchBalance = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/get-balance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ walletAddress }),
            });
            const data = await response.json();
            setBalance(data.balance);
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Blockchain Balance Checker</h1>
            <input
                type="text"
                placeholder="Enter Wallet Address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                style={{ marginRight: "10px", padding: "5px" }}
            />
            <button onClick={fetchBalance} style={{ padding: "5px 10px" }}>
                Get Balance
            </button>
            {balance && <p>Balance: {balance} ETH</p>}
        </div>
    );
}
