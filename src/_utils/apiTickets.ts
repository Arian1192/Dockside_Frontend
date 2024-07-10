import { api } from "./index"

export const getAllTickets = async () => {
    const response = await api.get("/tickets")
    return response
}
