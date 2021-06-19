import axios from 'axios';

const AxiosIntance = () => {
    const TOKEN = localStorage.getItem("");
    const instance = axios.create();

    let header;
    if (TOKEN) {
        header = {
            "auth-token": TOKEN,
            'Content-Type': 'application/json',
        }
    }
    else {
        header = {
            'Content-Type': 'application/json',
        }
    }

    instance.defaults.baseURL = "https://wnc2021be.herokuapp.com/api";
    instance.defaults.headers.common = header;

    instance.interceptors.request.use(request => {
        console.log("Request ", request);
        // Edit request config
        return request;
    }, error => {
        console.log(error);
        return Promise.reject(error);
    });

    instance.interceptors.response.use(response => {
        console.log("Response ", response);
        // Edit response config
        return response;
    }, error => {
        console.log(error);
        return Promise.reject(error);
    });
    return instance;
}

export default AxiosIntance;

