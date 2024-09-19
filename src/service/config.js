import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
})

console.log('env', process.env.REACT_APP_BASE_URL)


instance.interceptors.response.use(function (res) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data

  return res.data
}, async function (error) {
  const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Gọi refreshToken để lấy token mới
        await instance.post('/auth/refreshToken');
        return instance(originalRequest); // Gửi lại request ban đầu với token mới
      } catch (err) {
        return Promise.reject(err); // Xử lý lỗi nếu refresh token không thành công
      }
    }
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