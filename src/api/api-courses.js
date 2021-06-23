import AxiosIntance from "../config/api-config"
import APIPath from "../constants/api-constants/api-path"


/**
 * 
 * @param {Object} params 
 * @param params.sort
 * @param params.limit
 * @param params.search
 * @param params.topic
 * @returns get courses response
 */
export const getAllCourses = async (params) =>{
    const axiosIntance = AxiosIntance();
    const res = await axiosIntance.get(APIPath.GET_ALL_COURSES, {params: params});
    return res;
}

 