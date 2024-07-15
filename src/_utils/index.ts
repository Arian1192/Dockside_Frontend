
import axios from 'axios'

export const api = axios.create({
    baseURL: "http://localhost:3001"
})



export const setAccesTokenToLocalStorage = (access_token: string) => {
    localStorage.setItem('access_token', access_token)
}

export const deleteAccesTokenFromLocalStorage = () => {
    localStorage.removeItem('access_token')
}