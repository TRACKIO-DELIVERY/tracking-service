export async function getCoords () {
    try {
        const response = await fetch("http://localhost:3000/api/track/route-preview")
        if (!response.ok) {
            throw new Error(`Http error: ${response.status}`);
        }

        const data = await response.json();
        console.log("DATA", data.coords);
        localStorage.setItem("coords", JSON.stringify(data.coords.coords.data));
    } catch (error) {
        console.error("Erro ao buscar coordenadas:", error);
        return null;      
    }
}