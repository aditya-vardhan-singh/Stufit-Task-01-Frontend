import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { NEXT_PUBLIC_BACKEND_URL } from "./environments";

const token = Cookies.get("token");

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: NEXT_PUBLIC_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
    },
    withCredentials: true,
});
