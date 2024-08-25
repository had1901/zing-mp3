import axios from "./config"


const fetching = async (callbackAPI, path, setData) => {
    try {
        const res = await callbackAPI(path)
        if(res.status !== 200 ) {
          throw new Error(`Fetching '${res.status}' failed`)
        }
        setData(res.data)
    } catch (err) { 
        console.log(err) 
    }
    return setData
}


const fetchingMusic = (url) => {
    return axios.get(url)
}

const postMusic = (url, data) => {
    return axios.post(url, { data })
}

const putMusic = (url, data) => {
    return axios.post(url, { data })
}

const deleteMusic = (url, data) => {
    return axios.post(url, { data })
}

// auth
const login = (url, data) => {
    return axios.post(url, { data })
}

const registerUser = (url, data) => {
    return axios.post(url, { data })
}

const logout = (url, ...data) => {
    return axios.post(url, ...data )
}

const getUser = (url, data) => {
    return axios.post(url, { data })
}

const refreshNewToken = (url, ...data) => {
    return axios.post(url, ...data)
}

const verifyAccessToken = (url, ...data) => {
    return axios.post(url, ...data)
}

const uploadFile = (url, data) => {
    return axios.post(url, data)
}

const getFile = (url) => {
    return axios.get(url)
}


const handleLogout = async (dispatch, actions, navigate) => {
    try {
        const { data } = await logout('/auth/logout')
        console.log('logout:', data)

        if(data.isLogout === false) {
            return new Error('Login failed')
        }
        localStorage.removeItem('user')
        localStorage.removeItem('listPlaying')
        // localStorage.clear()
        dispatch(actions.userLoginAction({
            isLogging: false
        }))
        alert('Phiên đăng nhập hết hạn')
        navigate('/login')
    } catch (err) {
        return new Error(err.message)
    }
}

export {
    fetching,
    fetchingMusic,
    postMusic,
    putMusic,
    deleteMusic,
    login,
    logout,
    registerUser,
    getUser,
    refreshNewToken,
    verifyAccessToken,
    handleLogout,
    uploadFile,
    getFile
}