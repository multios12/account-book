import axios from "axios";

/** 認証オブジェクト */
const auth = {
    /** 認証とログイン処理を実行する */
    async login(username: string, password: string) {
        const url = `api/login`;
        const body = { username, password };
        const response = await axios.post(url, body);
        localStorage.removeItem("token");

        const loggedIn = response.data.token !== undefined;

        if (loggedIn) {
            localStorage.setItem("token", response.data.token);
            console.log(`token:${response.data.token}`);
        }

        return loggedIn;
    },
    /** ログアウト処理を実行する */
    logout() {
        localStorage.removeItem("token");
    },
    token() {
        return localStorage.getItem("token");
    },
};

export default auth;
