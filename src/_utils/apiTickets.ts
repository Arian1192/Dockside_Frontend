import { api } from "./index"
import { jwtDecode } from 'jwt-decode'

export const getAllTickets = async () => {

    const token = localStorage.getItem('access_token');
    if (!token) {
        throw new Error("No token found")
    } else {
        const response = await api.get(`/tickets/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    }
}


export const getAllTicketsByCreatorId = async (id?: string) => {

    const token = localStorage.getItem('access_token');
    if (!id) {
        throw new Error("No user provided")
    } else {
        const response = await api.get(`/tickets/creatorId/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response.data)
        return response
    }
}

export const createTicket = async (data: any) => {
    const response = await api.post("/tickets", data)
    return response
}
