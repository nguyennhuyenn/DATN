import axios, { AxiosRequestConfig } from "axios";
import { apiUrl } from "../config";

const defaultHeaders = {
    "Accept": 'application/json',
    "Content-Type": 'application/json',
    "Access-Control-Allow-Origin": "*",
};


export default function requestApi(
    endpoint: string,
    method: string,
    body: object,
    contenType?: "multipart/form-data" | "application/json",
    responseType: AxiosRequestConfig['responseType'] = 'json'
) {
    if (contenType) {
        defaultHeaders["Content-Type"] = contenType
    }
    const token = localStorage.getItem('token');
    const headers = token ? { ...defaultHeaders, "Authorization": `Bearer ${token}` } : { ...defaultHeaders };


    const instance = axios.create({ headers });

    instance.interceptors.response.use((response: any) => {
        return response;
    }, async (error: any) => {
        const originalRequest = error.config;
        console.log(error.response);

        return Promise.reject(error);
    })

    return instance.request({
        method: method,
        url: `${apiUrl}${endpoint}`,
        data: body,
        responseType: responseType
    });
}
