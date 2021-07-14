import AxiosIntance from "../config/api-config";
import APIPath from "../constants/api-constants/api-path";

export const addWatchList = async (course_id) => {
  const axiosIntance = AxiosIntance();
  const res = axiosIntance.put(APIPath.WATCH_LIST, { course_id });
  return res;
};

export const getWatchList = async () => {
  const axiosIntance = AxiosIntance();
  const res = axiosIntance.get(APIPath.WATCH_LIST);
  return res;
};
