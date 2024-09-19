import instance from "./config"
import axios from "./config"


const uploadFile = (url, data) => {
    return axios.post(url, data)
}

const getFile = (url) => {
    return axios.get(url)
}


const handleLogout = async (dispatch, actions, navigate) => {
    try {
        const res = await instance.post('/auth/logout', {})
        if(res.isLogout === false) {
            return new Error('Login failed')
        }
        localStorage.removeItem('user')
        localStorage.removeItem('playing')
        dispatch(actions.userLoginAction({
            isLogging: false
        }))
        alert('Phiên đăng nhập hết hạn')
        navigate('/login')
    } catch (err) {
        return new Error(err)
    }
}

export {
    handleLogout,
    uploadFile,
    getFile
}