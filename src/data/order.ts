interface OrderToBeTracked {
    orderId: string
}

interface CoordsToPreview {
    origin: {
        lat: string,
        lng: string,
    },
    destination: {
        lat: string,
        lng: string,
    }
}
export const orderInMemo : Record<string, OrderToBeTracked> = {}

export const coordsInMemo: Record<string, any> = {
}