import AxiosIntance from "../config/api-config"
import APIPath from "../constants/api-constants/api-path"

/**
 * Get categories
 * @returns response
 */
export const getAllCategories = async () =>{
    const axiosIntance = AxiosIntance();
    const res = await axiosIntance.get(APIPath.GET_ALL_CATEGORIES);
    return res;
}


/**
 * Get topics
 * @param {Object} params 
 * @param {string} params.category
 * @param {string} params.sort register_des
 * @returns response
 */
export const getTopics = async (params) =>{
    const axiosIntance = AxiosIntance();
    const res = await axiosIntance.get(APIPath.GET_TOPICS, {params:params});
    return res;
}

