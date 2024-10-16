import authHeader from "@/auth/authHeader";
import { apiUrl } from "@/config";
import handleResponse from "@/helpers/handle-response";

const updateStaff = (id: any = undefined, patch: any) => {
    const requestOptions = Object({
        method: "PATCH",
        headers: authHeader(),
        body: patch,
    });
    return fetch(`${apiUrl}/staff/update/${id}`, requestOptions).then(
        handleResponse,
    );
};

const registerStaff = (data: FormData) => {
    const requestOptions = Object({
        method: "POST",
        headers: authHeader(),
        body: data,
    });
    return fetch(`${apiUrl}/staff/register`, requestOptions).then(
        handleResponse,
    );
};

const retrieveStaff = (employeeNo: any = undefined) => {
    const requestOptions = Object({
        method: "GET",
        headers: authHeader(),
    });
    
    const path = employeeNo
        ? `${apiUrl}/staff/retrieval/${employeeNo}`
        : `${apiUrl}/staff/retrieval`;

        // alert("Retrieve data for employee..."+path);
    return fetch(path, requestOptions).then(
        handleResponse
    );
};

export const staffService = { registerStaff, updateStaff, retrieveStaff };
