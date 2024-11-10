
const SET_THUMB = 'SET_THUMB'
const SET_BACKGROUND = 'SET_BACKGROUND'
const SET_OPEN_MODAL = 'OPEN_MODAL'
const SET_OPEN_ACCOUNT = 'SET_OPEN_ACCOUNT'
const SET_BACKGROUND_SEARCH = 'SET_BACKGROUND_SEARCH'
const SET_NAVIGATE = 'SET_NAVIGATE'
const SET_OPEN_SIDEBAR_RIGHT = 'SET_OPEN_SIDEBAR_RIGHT'
const GET_SONG = 'GET_SONG'
const SET_PLAYING = 'SET_PLAYING'
const SET_USER = 'SET_USER'
const SET_PATH = 'SET_PATH'
const GET_LIST_SONG = 'GET_LIST_SONG'


// Actions
 const setThumbAction = (theme) => {
    return {
        type: SET_BACKGROUND,
        payload: theme
    }
 }
 const openThemeModalAction = (payload) => {
    return {
        type: SET_OPEN_MODAL,
        payload: payload
    }
 }
 const openAccountPopupAction = (payload) => {
  return {
      type: SET_OPEN_ACCOUNT,
      payload: payload
  }
}
 const activeNavigateAction = (payload) => {
    return {
        type: SET_NAVIGATE,
        payload: payload
    }
  }
  const openSidebarRightAction = (payload) => {
    return {
        type: SET_OPEN_SIDEBAR_RIGHT,
        payload: payload
    }
  }
  const getInfoSongAction = (payload) => {
    return {
        type: GET_SONG,
        payload: payload
    }
  }
  const autoPlaySongAction = (payload) => {
    return {
        type: SET_PLAYING,
        payload: payload
    }
  }
  const userLoginAction = (payload) => {
    return {
        type: SET_USER,
        payload: payload
    }
  }
  const pathAction= (payload) => {
    return {
        type: SET_PATH,
        payload: payload
    }
  }
  const getListSongAction= (payload) => {
    return {
        type: GET_LIST_SONG,
        payload: payload
    }
  }

 

 const actions = {
    setThumbAction,
    openThemeModalAction,
    activeNavigateAction,
    openSidebarRightAction,
    getInfoSongAction,
    autoPlaySongAction,
    openAccountPopupAction,
    userLoginAction,
    pathAction,
    getListSongAction
  }


 export { 
  actions, 
  SET_THUMB, 
  SET_BACKGROUND, 
  SET_OPEN_MODAL, 
  SET_BACKGROUND_SEARCH, 
  SET_NAVIGATE,
  SET_OPEN_SIDEBAR_RIGHT,
  GET_SONG,
  SET_PLAYING,
  SET_OPEN_ACCOUNT,
  SET_USER,
  SET_PATH,
  GET_LIST_SONG,
}
