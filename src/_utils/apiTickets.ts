import { api } from "./index"

export const getAllTickets = async () => {
    const response = await api.get("/tickets")
    return response
}

export const createTicket = async (data: any) => {
    const response = await api.post("/tickets", data)
    return response
}
