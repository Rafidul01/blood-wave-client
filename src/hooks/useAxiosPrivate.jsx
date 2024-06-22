import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosPrivate = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxiosPrivate = () => {
    const navigate =useNavigate();
    const { logout } = useAuth();
    axiosPrivate.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    })

    // interceptors 401 and 403 status
    axiosPrivate.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        if(status === 401 || status === 403){
            await logout();
            navigate('/login');
        }
        return Promise.reject(error);
    })
    return axiosPrivate;
};

export default useAxiosPrivate;