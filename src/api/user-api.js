import AxiosIntance  from "../config/api-config";
import APIPath from "../constants/api-constants/api-path";

/**
 * Register
 * @param {Object} body 
 * @param {string} body.email 
 * @param {string} body.password 
 * @param {string} body.first_name 
 * @param {string} body.last_name
 * @param {number} body.role
 * @returns response
 */
export const register  = async (body) =>{
    const axiosIntance = AxiosIntance();
    const res = await axiosIntance.put(APIPath.USERS, body);
    return res;
}



/**
 * Login
 * @param {Object} body 
 * @param {string} body.email
 * @param {string} body.password
 * @returns response
 */
export const login = async (body)=>{
    const axiosIntance = AxiosIntance();
    const res = await axiosIntance.post(APIPath.LOGIN, body);
    return res;
}