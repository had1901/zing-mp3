
const SET_THUMB = 'SET_THUMB'
const SET_BACKGROUND = 'SET_BACKGROUND'
const SET_OPEN_MODAL = 'OPEN_MODAL'
const SET_OPEN_ACCOUNT = 'SET_OPEN_ACCOUNT'
const SET_BACKGROUND_SEARCH = 'SET_BACKGROUND_SEARCH'
const SET_NAVIGATE = 'SET_NAVIGATE'
const SET_OPEN_SIDEBAR_RIGHT = 'SET_OPEN_SIDEBAR_RIGHT'
const GET_SONG = 'GET_SONG'
const SET_PLAYING = 'SET_PLAYING'

// Actions
 const setThumbAction = (thumb) => {
    return {
        type: SET_BACKGROUND,
        payload: thumb
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

 const actions = {
    setThumbAction,
    openThemeModalAction,
    activeNavigateAction,
    openSidebarRightAction,
    getInfoSongAction,
    autoPlaySongAction,
    openAccountPopupAction
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
  SET_OPEN_ACCOUNT
}
