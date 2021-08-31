import axios from "axios";

const client = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
    timeout: 1000,
});

export default client;