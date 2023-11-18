import axios from "axios";
import Cookies from 'js-cookie';
import  { useNavigate } from 'react-router-dom'


const API = axios.create({
  baseURL: process.env.REACT_APP_API,
});


API.interceptors.request.use(function(config) {
    const token = Cookies.get('tokenBigData')
    if ( token != null ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, function(err) {
    return <div>{err}</div>
  });


API.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        const navigate = useNavigate()
        navigate('/')
      }
      return Promise.reject(error);
    }
  );

export default API