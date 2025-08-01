import pool from "./index.ts"

export async function selectTrackingCoordsByOrderId(orderId: string) {
    const query = `
        SELECT * FROM core_ordertracking WHERE order_id = ${orderId}
    `
    try {
        const response = await pool.query(query)
        console.log(response.rows)

    
        const coords = {
            origin: {
                lat: Number(response.rows[0].start_latitude),
                lng: Number(response.rows[0].start_longitude)
            },
            destination: {
                lat: Number(response.rows[0].end_latitude),
                lng: Number(response.rows[0].end_longitude)
            }
        }

        console.log(coords)
        return coords
        
    } catch (error) {
        console.log(error)
    }
}
