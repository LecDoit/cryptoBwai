"use client"; // Runs on the frontend

import { useState, useEffect } from "react";

// import { stringify } from "json5";


export default function CryptoList() {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {


        async function fetchCoins() {
            try {
                const stored = localStorage.getItem("coinsData")
                // const storedCoins = 
                if (stored){
                    setCoins(JSON.parse(stored))
                    setLoading(false)
                }
  
                const res = await fetch("/api/coinmarketcap"); // Calls our API
                const data = await res.json();
                if (res.ok) {
                    localStorage.setItem('coinsData',JSON.stringify(data.data))
                    
                    setCoins(data.data);

                } else {
                    throw new Error(data.error || "Failed to load coins");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCoins();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return null
}
