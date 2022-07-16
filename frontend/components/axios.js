import Axios from 'axios';
import Cookie from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const axios = Axios.create({
    baseURL: API_URL,
    headers: {
        'Authorization': `Bearer ${Cookie.get("token")}`,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
})

export default axios;