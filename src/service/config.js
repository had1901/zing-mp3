import axios from "axios";

const instance = axios.create({
    baseURL: 'https://be-zmp3.onrender.com',
    withCredentials: true,
})




instance.interceptors.response.use(function (res) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data

  return res.data
}, async function (error) {
  
  return Promise.reject(error.response);
})

instance.interceptors.request.use(function (request) {

  // if(token) {
  //   request.headers.Authorization = `Bearer ${token}`
  // }
  
  return request
}, function (error) {
  return Promise.reject(error)
})





export default instance