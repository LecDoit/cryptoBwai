"use client"; // Runs on the frontend

import { useState, useEffect } from "react";

export default function CryptoList() {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCoins() {
            try {
                const res = await fetch("/api/coinmarketcap"); // Calls our API
                const data = await res.json();
                if (res.ok) {
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

    return (
        <div>
            <h2>Top Cryptocurrencies</h2>
            <ul>
                {coins.slice(0, 10).map((coin) => (
                    <li key={coin.id}>
                        <strong>{coin.name} ({coin.symbol})</strong> - ${coin.quote.USD.price.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
}
