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

export {
    fetching,
    fetchingMusic,
    postMusic,
    putMusic,
    deleteMusic
}