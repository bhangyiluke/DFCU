import authHeader from "@/auth/authHeader";
import handleResponse from "@/helpers/handle-response";
import  {apiUrl}  from "../config";

const getAll = () => {
    const requestOptions = Object({ method: "GET", headers: authHeader() });
    return fetch(`${apiUrl}/users`, requestOptions).then(handleResponse);
};

const getById = (id: any) => {
    const requestOptions = Object({ method: 'GET', headers: authHeader() });
    return fetch(`${apiUrl}/users/${id}`, requestOptions).then(handleResponse);
};
export const userService = { getAll, getById };
