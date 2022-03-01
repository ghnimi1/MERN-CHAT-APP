import axios from "axios"

const instance = axios.create({
    baseURL: 'https://trusting-lewin-1cc369.netlify.app/api'
})

axios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
});

export default instance