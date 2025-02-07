import axios, { AxiosRequestConfig } from "axios";

const defaultHeaders = {
    "Accept": 'application/json',
    "Content-Type": 'application/json',
    "Access-Control-Allow-Origin": "*",
};


export default function requestApi(
    endpoint: string,
    method: string,
    body: object,
    responseType: AxiosRequestConfig['responseType'] = 'json'
) {
    const token = localStorage.getItem('token');
    const headers = token ? { ...defaultHeaders, "Authorization": `Bearer ${token}` } : { ...defaultHeaders };

    const instance = axios.create({ headers });

    instance.interceptors.response.use((response) => {
        return response;
    }, async (error) => {


        return Promise.reject(error);
    })

    return instance.request({
        method: method,
        url: `http://localhost:3000/api/${endpoint}`,
        data: body,
        responseType: responseType
    });
}
