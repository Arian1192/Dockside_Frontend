import { api } from './index';

export const getAllDepartments = async () => {
    try {
        const response = await api.get("/departments");
        return response;
    } catch {
        throw new Error("Error getting departments",);
    }
}