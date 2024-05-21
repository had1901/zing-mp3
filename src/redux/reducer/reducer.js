import { combineReducers } from 'redux';
import { actions, TOG, SET_THUMB } from '../actions/actions';

// Initial
const initActive = {
    activeIndex : 'red',
    text: null,
}
const initThumb = {
    thumb : 'bg-primary'
}


// Reducer
const activeReducer = (state = initActive, action) => {
  switch (action.type) {
    case TOG:
      return {
          ...state,
          activeIndex: action.payload,
          text: action.payload
      }
    default:
      return state
    }
}

const thumbReducer = (state = initThumb, action) => {
    switch (action.type) {
      case SET_THUMB:
        return {
            ...state,
            thumb: action.payload
        }
      default:
        return state
      }
  }


  // Middleware reducers
  const setThumbMiddleware = (thumb) => {
    return (dispatch) => {
        document.body.style.backgroundColor = `${thumb ? '' : 'bg-primary'}`
        document.body.style.backgroundImage = `url('/mp3/${thumb}')`
        document.body.style.backgroundRepeat = 'no-repeat'
        document.body.style.backgroundSize = 'cover'
        document.body.style.backgroundPosition = ''
        document.body.style.backgroundAttachment = 'fixed'
        dispatch(actions.setThumbAction(thumb))
    }
  }


const rootReducer = combineReducers({
    activeReducer,
    thumbReducer
})
const middleware = {
    setThumbMiddleware,
}
export { middleware }
export default rootReducer