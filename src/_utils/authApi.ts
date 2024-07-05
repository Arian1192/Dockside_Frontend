import { RegisterData, LoginData } from '@/components/AuthForm/AuthForm';
import axios from 'axios'

const api = axios.create({
    baseURL : "http://localhost:3000"
})


const register = async ( data : RegisterData) => {
    console.log("Data on API.REGISTER", data)
    const response = await api.post("/auth/register", data)
    console.log(response);
}

const login = async (data: LoginData) => {
    const response = await api.post("/auth/login", data)
    console.log(response)
}

export default {
    register,
    login
}