import axios from "axios";


// const API =
// "http://localhost:8000";
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
});



export const getDashboardStats = async()=>{


    const response =
    await axios.get(
        `${API}/dashboard/stats`
    );


    return response.data;


}