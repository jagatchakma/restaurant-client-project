import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    // todo AuthProvider to useAuth
    const { logoutUser } = useAuth();
    //
    axiosSecure.interceptors.request.use(function (config) {
        // console.log('intercepted request');
        const token = localStorage.getItem('access-token');
        // console.log(token);
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject("the error", error);
    })

    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async function (error) {
        const statusCode = error.response ? error.response.status : null;
        // if status code not belongs with user then logout
        if (statusCode === 401 || statusCode === 403) {
            await logoutUser();
            navigate('/login');
        }
        return Promise.reject("the error", statusCode);
    })
    //
    return axiosSecure;
}

export default useAxiosSecure;