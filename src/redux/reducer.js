import { combineReducers } from 'redux';
import { 
  actions, 
  SET_BACKGROUND,  
  SET_OPEN_MODAL,
  SET_OPEN_ACCOUNT,
  SET_USER,
  SET_NAVIGATE,
  SET_OPEN_SIDEBAR_RIGHT,
  GET_SONG,
  SET_PATH,
} from './actions';
import { generatePath } from 'react-router-dom';

// Initial
const initActive = {
    activeIndex : 'red',
    text: null,
}
const initOpen= {
    isOpen: false,
    isOpenAccount: false
}
const initBackground = {
    backgroundSearchBar: 'bg-primary',
    backgroundBody : 'bg-primary',
    imgSetting : '/mp3/imgBackGround/rose-thumb-setting.jpg',
    backgroundPopupSetting: 'bg-colorPopup',
    backgroundControlAudio: 'bg-navBar',
    backgroundName: 'Tim',
    textColor: 'text-[#DADADA]',
    backgroundModel: 'bg-[#34224f]',
    activeTab: 'bg-[#ffffff1a]',
    backgroundUpdateAccount: 'bg-[#9b4de0]',
    textActiveTabColor: 'text-white',
    bgHover: 'bg-[#0000000d]',
    bgSidebarLeft: 'bg-[#ffffff0d]',
    bgNavBar: 'bg-[#170f23cc]',
    
}
const initActiveNavigate = {
    item: 'Khám phá',
    isActive: false
}
const initOpenSidebarRight = {
  isOpen: false
}
const initInfoSong = {
  song: {
    id: null,
    albumId: null,
    artistId: null,
    genreId: null,
    title: null,
    artist: null,
    composer: null,
    album: null,
    genre: null,
    releaseDate: null,
    duration: null,
    url: null
  },
 
  listenNear: '',
  activeAudio: false,
  autoPlay: false,
  prevSong: false,
  nextSong: false, 
}
const initUser= {
  username: '',
  group: '',
  avatarUrl: '',
  isLogging: false,
}

const initPath = {
  path: ['/'],
}


// Reducer
const backgroundReducer = (state = initBackground, action) => { 
  switch (action.type) {
    case SET_BACKGROUND:
      switch (action.payload && action.payload.desc) {
        case 'Rose':
          return {
            ...state,
            backgroundBody: action.payload.link,
            backgroundSearchBar: 'bg-searchBarRose',
            imgSetting: action.payload.src,
            backgroundPopupSetting: 'bg-bluePrimaryRose',
            backgroundControlAudio: 'bg-controlAudioRose',
            backgroundName: action.payload.desc,
            textColor: 'text-[#DADADA]',
            backgroundModel: 'bg-blueRose',
            backgroundUpdateAccount: 'bg-[#3560f5]',
            textActiveTabColor: 'text-white',
            bgNavBar: 'bg-[#061c4fcc]'
          }
        case 'Lisa':
          return {
            ...state,
            backgroundBody: action.payload.link,
            backgroundSearchBar: 'bg-searchBarLisa',
            imgSetting: action.payload.src,
            backgroundPopupSetting: 'bg-[#f9e6e2] shadow',
            backgroundControlAudio: 'bg-controlAudioLisa',
            backgroundName: action.payload.desc,
            textColor: 'text-[#1a1a1a]',
            backgroundModel: 'bg-[#f9e6e2]',
            backgroundUpdateAccount: 'bg-[#d14781]',
            textActiveTabColor: 'text-[#d14781]',
            bgNavBar: 'bg-[#f1ddd8cc]'
            
          }
        case 'Jennie':
          return {
            ...state,
            backgroundBody: action.payload.link,
            backgroundSearchBar: 'bg-searchBarJennie',
            imgSetting: action.payload.src,
            backgroundPopupSetting: 'bg-[#cac6dd]',
            backgroundControlAudio: 'bg-controlAudioJennie',
            backgroundName: action.payload.desc,
            textColor: 'text-[#1a1a1a]',
            backgroundModel: 'bg-[#cac6dd]',
            backgroundUpdateAccount: 'bg-[#8919ae]',
            textActiveTabColor: 'text-[#2a5e6b]',
            bgNavBar: 'bg-[#bbb9c4cc]'
            
          }
        case 'Jisoo':
          return {
            ...state,
            backgroundBody: action.payload.link,
            backgroundSearchBar: 'bg-white',
            imgSetting: action.payload.src,
            backgroundPopupSetting: 'bg-[#ffffff] shadow',
            backgroundControlAudio: 'bg-controlAudioEiffel',
            backgroundName: action.payload.desc,
            textColor: 'text-[#1a1a1a]',
            backgroundModel: 'bg-[#ffffff]',
            backgroundUpdateAccount: 'bg-[#8919ae]',
            textActiveTabColor: 'text-[#2a5e6b]',
            bgNavBar: 'bg-[#ffffffcc]'
            
          }
        case 'IU':
          return {
            ...state,
            backgroundBody: action.payload.link,
            backgroundSearchBar: 'bg-searchBarIU',
            imgSetting: action.payload.src,
            backgroundPopupSetting: 'bg-[#efedeb] shadow',
            backgroundControlAudio: 'bg-controlAudioIU',
            backgroundName: action.payload.desc,
            textColor: 'text-[#1a1a1a]',
            backgroundModel: 'bg-[#efedeb]',
            backgroundUpdateAccount: 'bg-[#c24793]',
            textActiveTabColor: 'text-[#2a5e6b]',
            bgNavBar: 'bg-[#e6e1decc]'
            
          }
        case 'Eiffel':
          return {
            ...state,
            backgroundBody: action.payload.link,
            backgroundSearchBar: 'bg-searchBarEiffel',
            imgSetting: action.payload.src,
            backgroundPopupSetting: 'bg-[#363636] shadow',
            backgroundControlAudio: 'bg-controlAudioEiffel',
            backgroundName: action.payload.desc,
            textColor: 'text-textEiffel',
            backgroundModel: 'bg-[#363636]',
            backgroundUpdateAccount: 'bg-[#9b4de0]',
            textActiveTabColor: 'text-white',
            bgNavBar: 'bg-[#282828cc]'
            
          }
        case 'London':
          return {
            ...state,
            backgroundBody: action.payload.link,
            backgroundSearchBar: 'bg-white',
            imgSetting: action.payload.src,
            backgroundPopupSetting: 'bg-[#173b45] shadow',
            backgroundControlAudio: 'bg-controlAudioEiffel',
            backgroundName: action.payload.desc,
            textColor: 'text-[#1a1a1a]',
            backgroundModel: 'bg-[#173b45]',
            backgroundUpdateAccount: 'bg-[#8d22c3]',
            textActiveTabColor: 'text-[#2a5e6b]',
            bgNavBar: 'bg-[#0f1a2ecc]'
            
          }
        default:
          return state
      }
    default:
      return state
    }
}
const openThemeModalReducer = (state = initOpen, action) => {
  switch (action.type) {
    case SET_OPEN_MODAL:
      return {
          ...state,
          isOpen: action.payload
      }
      case SET_OPEN_ACCOUNT:
        return {
            ...state,
            isOpenAccount: action.payload
        }
    default:
      return state
    }
}
const activeNavigateReducer = (state = initActiveNavigate, action) => {
  switch (action.type) {
    case SET_NAVIGATE:
      return {
          ...state,
          item: action.payload.item,
          isActive: action.payload.isActive
      }
    default:
      return state
    }
}
const openSidebarRightReducer = (state = initOpenSidebarRight, action) => {
  switch (action.type) {
    case SET_OPEN_SIDEBAR_RIGHT:
      return {
        ...state,
        isOpen: !state.isOpen
      }
    default:
      return state
    }
}
const getInfoSongReducer = (state = initInfoSong, action) => {
  switch (action.type) {
    case GET_SONG:
      if(action.payload.song) {
        return {
          ...state,
          song: action.payload.song,
          listenNear: action.payload.song,
          activeAudio: action.payload.activeAudio,
          autoPlay: action.payload.autoPlay,
          prevSong: action.payload.prevSong,
          nextSong: action.payload.nextSong,
        }
      }
      
      if(!action.payload.song && action.payload.activeAudio !== undefined) {
        return {
          ...state,
          activeAudio: action.payload.activeAudio,
          prevSong: action.payload.prevSong,
          nextSong: action.payload.nextSong,
        }
        
      }
      return state
    default:
      return state
    }
}
const setUserReducer = (state = initUser, action) => {
  switch (action.type) {
    case SET_USER:
      return {
          ...state,
          username: action.payload.username || '',
          group: action.payload.group || '',
          isLogging: action.payload.isLogging,
          avatarUrl: action.payload.avatarUrl
      }
    default:
      return state
    }
}
const pathReducer = (state = initPath, action) => {
  switch (action.type) {
    case SET_PATH:
      return {
          ...state,
          path: [...state.path, action.payload.path],
      }
    default:
      return state
    }
}




// Middleware reducers
// const setThumbMiddleware = (thumb) => {
//   return (dispatch) => {
//     new Promise((resolve) => {
      
//         document.body.style.backgroundColor = `${thumb ? '' : 'bg-primary'}`
//         document.body.style.backgroundImage = `url('/mp3/${thumb?.link}')`
//         document.body.style.backgroundRepeat = 'no-repeat'
//         document.body.style.backgroundSize = 'cover'
//         document.body.style.backgroundPosition = ''
//         document.body.style.backgroundAttachment = 'fixed'
//         document.body.classList.add('body-animate')
//         resolve()
      
//     }).then(() => {
//       dispatch(actions.setThumbAction(thumb))
//     })
//   }
// }


  // Combine Reducers
const rootReducer = combineReducers({
    backgroundReducer,
    openThemeModalReducer,
    activeNavigateReducer,
    openSidebarRightReducer,
    getInfoSongReducer,
    setUserReducer,
    pathReducer
})


export default rootReducer