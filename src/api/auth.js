import config from "@/config"
import axios from "axios"


export const login =async(data)=>{
    return await axios.post(`${config.apiUrl}/api/auth/login`, data);

};
export const signup =async(data)=>{
   return await axios.post(`${config.apiUrl}/api/auth/register`, data);

};