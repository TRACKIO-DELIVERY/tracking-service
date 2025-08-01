export async function getCoords (orderId) {
    try {
        const response = await fetch(
            "http://localhost:3000/api/track/route-preview", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({orderId})
            })  
        if (!response.ok) {
            throw new Error(`Http error: ${response.status}`);
        }

        const data = await response.json();
        console.log("DATA", data.coords);
        localStorage.setItem("coords", JSON.stringify(data.coords));
    } catch (error) {
        console.error("Erro ao buscar coordenadas:", error);
        return null;      
    }
}