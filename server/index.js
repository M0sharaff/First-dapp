const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");

const app = express();
app.use(cors());
app.use(express.json());

// Route to fetch Ethereum wallet balance
app.post("/api/get-balance", async (req, res) => {
    try {
        const { walletAddress } = req.body;
        const provider = new ethers.providers.JsonRpcProvider("https://rpc-mainnet.maticvigil.com/");
        const balance = await provider.getBalance(walletAddress);
        res.json({ balance: ethers.utils.formatEther(balance) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch balance" });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
