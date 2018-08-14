import axios, { AxiosError } from "axios";
import router from "./router";
const http = axios.create({ baseURL: `api/` });

http.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

http.interceptors.response.use((response) => {
    return response;
}, (error: AxiosError) => {
    // 認証エラー時、ログイン画面にリダイレクトする
    if (error.response.status === 401) { router.push("/login"); }
    return Promise.reject(error);
});

export default http;
