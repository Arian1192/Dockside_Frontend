import { api } from "./index"
import { jwtDecode } from 'jwt-decode'
export const getAllTicketsByCreatorId = async () => {

    const token = localStorage.getItem('access_token');
    if (!token) {
        throw new Error("No token found")
    } else {
        const decodedToken = jwtDecode(token);
        const response = await api.get(`/tickets/creatorId/${decodedToken.sub}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    }
}

export const createTicket = async (data: any) => {
    const response = await api.post("/tickets", data)
    return response
}
