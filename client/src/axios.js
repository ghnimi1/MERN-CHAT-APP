import axios from "axios"

const instance = axios.create({
    baseURL: 'https://realtimemernapp.herokuapp.com/api'
})

axios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
});

export default instance