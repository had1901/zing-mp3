const TOG = 'TOG'
const SET_THUMB = 'SET_THUMB'
 
// Actions
 const btnActiveAction = (data) => {
   return {
     type: TOG,
     payload: data
   }
 }
 const setThumbAction = (thumb) => {
    return {
        type: SET_THUMB,
        payload: thumb
    }
 }

 const actions = {
    btnActiveAction,
    setThumbAction,
  }


 export { actions , TOG, SET_THUMB }
