import { RegisterData, LoginData } from '@/components/AuthForm/AuthForm';
import {api} from './index';

export const register = async (data: RegisterData) => {
    console.log("Data on API.REGISTER", data)
    const response = await api.post("/auth/register", data)
    console.log("Response on API.REGISTER", response)
    return response
}

export const login = async (data: LoginData) => {
    console.log("Data on API.LOGIN", data)
    const response = await api.post("/auth/login", data)
    return response
}
