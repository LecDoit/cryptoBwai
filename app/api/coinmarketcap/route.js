export const dynamic = "force-dynamic"; // Ensures fresh data on each request

export async function GET() {
    const API_KEY = process.env.COINMARKETCAP_API_KEY;
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`;

    const headers = {
        "X-CMC_PRO_API_KEY": API_KEY,
        "Accept": "application/json",
    };

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
