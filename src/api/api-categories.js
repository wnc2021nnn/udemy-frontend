import AxiosIntance from "../config/api-config"
import APIPath from "../constants/api-constants/api-path"

export const getAllCategories = async () =>{
    const axiosIntance = AxiosIntance();
    const res = await axiosIntance.get(APIPath.GET_ALL_CATEGORIES);
    return res;
}