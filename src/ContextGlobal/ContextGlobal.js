import { useState, useRef, useEffect, createContext } from "react";
import { Musics } from "../mp3/Music/Music";

const Context = createContext()

function ContextProvider({ children }) {
  const [theme, setTheme] = useState('dark')
  const [songInitial, setSongInitial] = useState(Musics[0])
  const [infoMusic, setInfoMusic] = useState([])
  const [listPlay, setListPlay] = useState(() => {
    let songPlaying = JSON.parse(localStorage.getItem('listPlay'))
    return songPlaying || songInitial
  })
  const [songListen, setSongListen] = useState(() => {
    let stores = JSON.parse(localStorage.getItem('songListen'))
    return stores
  })
  const [thumb, setThumb] = useState(``)
  const [thumbSetting, setThumbSetting] = useState('./mp3/imgBackGround/london-thumb-setting.png')
  const [thumbName, setThumbName] = useState('Tím')
  
  const [colorBgSearch, setColorBgSearch] = useState()
  const [colorBgSidebar, setColorBgSidebar] = useState()
  const [colorBgSidebarItem, setColorBgSidebarItem] = useState()
  const [colorBgButton, setColorBgButton] = useState()
  const [colorBgPopup, setColorBgPopup] = useState('bg-colorPopup')
  const [colorBgPrimary, setColorBgPrimary] = useState('bg-sidebarRose')
  const [colorPlaceInput, setColorPlaceInput] = useState('bg-inp')
  const [colorTextWhite, setColorTextWhite] = useState('text-white')
  const [colorText, setColorText] = useState()
  const [colorTextActive, setColorTextActive] = useState()
  const [colorTextHover, setColorTextHover] = useState()
  const [colorTextBtn, setColorTextBtn] = useState()
  const [colorTextPopup, setColorTextPopup] = useState()
  const [colorIconArrow, setColorIconArrow] = useState()
  const [colorIconSetting, setColorIconSetting] = useState()
  const [colorTitlePopup, setColorTitlePopup] = useState()
  const [colorControlAudio, setColorControlAudio] = useState('bg-navBar')
  const [colorLineSidebar, setColorLineSidebar] = useState()
  const [colorSearchBar, setColorSearchBar] = useState('bg-primary')
  const [colorTextViolet, setColorTextViolet] = useState('text-violet')
  const [colorTextPrimary, setColorTextPrimary] = useState()

  const [checkScroll, setCheckScroll] = useState()
  const [isActive, setIsActive] = useState(false)
  const [path, setPath] = useState('')
  const [gifplay, setGifplay] = useState(false)
  const [isActiveSidebar, setIsActiveSidebar] = useState(false)
  const [isOpenSidebarRight, setIsOpenSidebarRight] = useState(false)
  const [activeAudio, setActiveAudio] = useState(false)


  const [sidebarComponent, setSidebarComponent] = useState()
  const [searchComponent, setSearchComponent] = useState()
  const [buttonDownLoadComponent, setButtonDownLoadComponent] = useState()

  const elementContainer = useRef()
  const buttonRef = useRef()
  const searchRef = useRef()
  const divRef = useRef()
  const sectionRef = useRef()
  const sidebarRef = useRef()
  const buttonDownLoadRef = useRef()

  let sideBar = thumb ? colorBgSidebar : colorBgPrimary
  let search = thumb ? colorBgSearch : colorBgPrimary
  let iconArrow = thumb ? colorIconArrow : null
  let inputPlaceHolder = thumb ? colorPlaceInput : colorTextWhite
  let btnDownLoad = thumb ? colorBgButton : colorBgPrimary
  let iconDownLoad = thumb ? colorTextBtn : colorTextViolet
  let iconSetting = thumb ? colorIconSetting : colorTextWhite
  let sidebarItem = thumb ? colorBgSidebarItem : 'bg-active text-colo'
  let sidebarItemActive = thumb ? colorTextActive : 'hover:text-white '
  let settingPopup = thumb ? colorBgPopup : colorBgPopup
  let settingTextPopup = thumb ? colorBgPopup : colorBgPopup
  let titlePopup = thumb ? colorTitlePopup : ''
  let controlAudio = thumb ? colorControlAudio : 'bg-navBar'
  let searchBar = checkScroll ? colorSearchBar : 'bg-transparent'
  const deps = [
    elementContainer,
    searchRef,
    buttonRef,
    divRef,
    sectionRef,
    sidebarRef,
    buttonDownLoadRef
  ]

  
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if(window.scrollY > 0) {
        setCheckScroll(window.scrollY)
      } else {
        setCheckScroll('')

      }
    })
  }, [])

  useEffect(() => {
    if(searchRef && searchRef.current) {
      setSearchComponent(searchRef.current.getAttribute('datatype'))
    }
    if(sidebarRef && sidebarRef.current) {
      setSidebarComponent(sidebarRef.current.getAttribute('datatype'))
    }
    if(buttonDownLoadRef && buttonDownLoadRef.current) {
      setButtonDownLoadComponent(buttonDownLoadRef.current.getAttribute('datatype'))
    }
    
  }, [deps])

  const onClose = () => {
    setIsActive(false)
  }
  const handleChangeThumb = () => {
    setIsActive(!isActive)
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleListenNear = (item) => {
    setListPlay(item)
    localStorage.setItem('listPlay', JSON.stringify(item))
    setSongListen(prev => {
      if(prev === null || !prev.includes(item)) {
        let songNew = [...(prev || []), item]
        setSongListen(songNew)
        localStorage.setItem('songListen', JSON.stringify(songNew))
        return songNew
      }
      return prev
    })
    
  }
  
  const handleGetInfoMusic = (item, index) => {
    if(item) {
      setInfoMusic(item)
      handleListenNear(item)
      setPath(item.path)
      setGifplay(true)
    }
  }  

  const handleActiveSidebar = () => {
    if(isActiveSidebar === true) {
      setIsActiveSidebar(false)
      console.log('day la dong',isActiveSidebar)
    } else {
      setIsActiveSidebar(true)
      console.log('day la mo',isActiveSidebar)
    }
  }

  const handleBackGround = async (item) => {
    setThumbSetting(item.src)
    setThumb(item.link)
    setThumbName(item.desc)
    switch (item.desc) {
      case "Rose":
        if(searchComponent === 'search') {
          setColorBgSearch('bg-searchRose')
        } 
        if(sidebarComponent === 'sidebar') {
          setColorBgSidebar('bg-sidebarRose')
          setColorText('text-white')
        }
        if(buttonDownLoadComponent === 'buttonDownLoad') {
          setColorBgButton('bg-searchRose')
          setColorTextBtn('text-textRose')
        } 
        setColorIconArrow('text-white')
        setColorPlaceInput('placeholder:text-white')
        setColorBgPopup('bg-bluePrimaryRose')
        setColorTextPopup('text-white')
        setColorIconSetting('text-white')
        setColorBgSidebarItem('bg-searchRose')
        setColorTextActive('text-colo hover:text-white')
        setColorTextHover('hover:text-colo')
        setColorSearchBar('bg-searchBarRose')
        setColorControlAudio('bg-controlAudioRose')
        break;
      case "Jennie":
        if(searchComponent === 'search') {
          setColorBgSearch('bg-sidebarJennie')
        } 
        if(sidebarComponent === 'sidebar') {
          setColorBgSidebar('bg-sidebarJennie')
          setColorText('text-textJennie')
        }
        if(buttonDownLoadComponent === 'buttonDownLoad') {
          setColorBgButton('bg-sidebarJennie')
          setColorTextBtn('text-violet')
        } 
        setColorIconArrow('text-textPlaceHolderJennie')
        setColorPlaceInput('placeholder:text-textPlaceHolderJennie')
        setColorBgPopup('bg-popupJennie')
        setColorTextPopup('text-textJennie')
        setColorIconSetting('text-settingIcon')
        setColorBgSidebarItem('bg-sidebarJennie')
        setColorTextActive('text-textActiveJennie')
        setColorTextHover('hover:text-textActiveJennie')
        setColorTitlePopup('text-textJennie')
        setColorSearchBar('bg-searchBarJennie')
        setColorControlAudio('bg-controlAudioJennie')

        break;
      case "Jisoo":
        if(searchComponent === 'search') {
          setColorBgSearch('bg-sidebarJennie')
        } 
        if(sidebarComponent === 'sidebar') {
          setColorBgSidebar('bg-sidebarJennie')
          setColorText('text-textJennie')
        }
        if(buttonDownLoadComponent === 'buttonDownLoad') {
          setColorBgButton('bg-sidebarJennie')
          setColorTextBtn('text-violet')
        } 
        setColorIconArrow('text-textPlaceHolderJennie')
        setColorPlaceInput('placeholder:text-textPlaceHolderJennie')
        setColorBgPopup('bg-white shadow')
        setColorTextPopup('text-textJennie')
        setColorIconSetting('text-settingIcon')
        setColorBgSidebarItem('bg-sidebarJennie')
        setColorTextActive('text-violet hover:text-violet')
        setColorTextHover('hover:text-violet')
        setColorTitlePopup('text-textJennie')
        setColorSearchBar('bg-white')
        setColorControlAudio('bg-controlAudioEiffel')

        break;
      case "Lisa":
        if(searchComponent === 'search') {
          setColorBgSearch('bg-sidebarLisa')
        } 
        if(sidebarComponent === 'sidebar') {
          setColorBgSidebar('bg-sidebarLisa')
          setColorText('text-textJennie')
        }
        if(buttonDownLoadComponent === 'buttonDownLoad') {
          setColorBgButton('bg-sidebarLisa')
          setColorTextBtn('text-violet')
        } 
        setColorIconArrow('text-textPlaceHolderJennie')
        setColorPlaceInput('placeholder:text-textPlaceHolderJennie')
        setColorBgPopup('bg-popupLisa shadow')
        setColorTextPopup('text-textJennie')
        setColorIconSetting('text-settingIcon')
        setColorBgSidebarItem('bg-sidebarJennie')
        setColorTextActive('text-textLisa hover:text-textLisa')
        setColorTextHover('hover:text-textLisa')
        setColorTitlePopup('text-textJennie')
        setColorSearchBar('bg-searchBarLisa')
        setColorControlAudio('bg-controlAudioLisa')

        break;
      case "IU":
        if(searchComponent === 'search') {
          setColorBgSearch('bg-sidebarJennie')
        } 
        if(sidebarComponent === 'sidebar') {
          setColorBgSidebar('bg-sidebarJennie')
          setColorText('text-textJennie')
        }
        if(buttonDownLoadComponent === 'buttonDownLoad') {
          setColorBgButton('bg-sidebarJennie')
          setColorTextBtn('text-violet')
        } 
        setColorIconArrow('text-textPlaceHolderJennie')
        setColorPlaceInput('placeholder:text-textPlaceHolderJennie')
        setColorBgPopup('bg-popupUI shadow')
        setColorTextPopup('text-textJennie')
        setColorIconSetting('text-settingIcon')
        setColorBgSidebarItem('bg-sidebarJennie')
        setColorTextActive('text-textLisa hover:text-textLisa')
        setColorTextHover('hover:text-textLisa')
        setColorTitlePopup('text-textJennie')
        setColorSearchBar('bg-searchBarIU')
        setColorControlAudio('bg-controlAudioIU')

        break;
      case "Eiffel":
          if(searchComponent === 'search') {
            setColorBgSearch('bg-sidebarRose')
          } 
          if(sidebarComponent === 'sidebar') {
            setColorBgSidebar('bg-sidebarRose')
            setColorText('text-textEiffel')
          }
          if(buttonDownLoadComponent === 'buttonDownLoad') {
            setColorBgButton('bg-sidebarRose')
            setColorTextBtn('text-violet')
          } 
          setColorIconArrow('text-textPlaceHolderJennie')
          setColorPlaceInput('placeholder:text-textPlaceHolderJennie')
          setColorBgPopup('bg-popupEiffel shadow')
          setColorTextPopup('text-textEiffel')
          setColorIconSetting('text-settingIcon')
          setColorBgSidebarItem('bg-sidebarJennie')
          setColorTextActive('text-white hover:text-white')
          setColorTextHover('hover:text-white')
          setColorTitlePopup('text-textEiffel')
          setColorSearchBar('bg-searchBarEiffel')
          setColorControlAudio('bg-controlAudioEiffel')

          break;
          case "London":
            if(searchComponent === 'search') {
              setColorBgSearch('bg-sidebarJennie')
            } 
            if(sidebarComponent === 'sidebar') {
              setColorBgSidebar('bg-sidebarJennie')
              setColorText('text-textJennie')
            }
            if(buttonDownLoadComponent === 'buttonDownLoad') {
              setColorBgButton('bg-sidebarJennie')
              setColorTextBtn('text-violet')
            } 
            setColorIconArrow('text-textPlaceHolderJennie')
            setColorPlaceInput('placeholder:text-textPlaceHolderJennie')
            setColorBgPopup('bg-white shadow')
            setColorTextPopup('text-textJennie')
            setColorIconSetting('text-settingIcon')
            setColorBgSidebarItem('bg-sidebarJennie')
            setColorTextActive('text-violet hover:text-violet')
            setColorTextHover('hover:text-violet')
            setColorTitlePopup('text-textJennie')
            setColorSearchBar('bg-white')
            setColorControlAudio('bg-controlAudioEiffel')
  
            break;
      default:
        console.log('Error')
        break;
    }
  }

  
  const value = {
    theme,
    infoMusic,
    elementContainer,
    buttonRef,
    sidebarRef,
    searchRef,
    sectionRef,
    divRef,
    buttonDownLoadRef,
    thumb,
    thumbSetting,
    thumbName,
    path,
    gifplay,
    isActive,
    isActiveSidebar,
    isOpenSidebarRight,
    activeAudio,
    songInitial,
    listPlay,
    songListen,

    colorBgSearch,
    colorBgSidebar,
    colorBgSidebarItem,
    colorBgPopup,
    colorBgButton,
    colorBgPrimary,
    colorPlaceInput,
    colorIconArrow,
    colorIconSetting,
    colorSearchBar,
    

    colorTextWhite,
    colorText,
    sidebarItemActive,
    colorTextHover,
    colorTextBtn,
    colorTextPopup,
    colorTitlePopup,
    colorControlAudio,
    colorTextViolet,
    colorTextPrimary,

    checkScroll,
    controlAudio,
    sidebarComponent,
    searchComponent,
    buttonDownLoadComponent,
    searchBar,
    sideBar,
    search,
    iconArrow,
    inputPlaceHolder,
    btnDownLoad,
    iconDownLoad,
    iconSetting,
    sidebarItem,
    settingPopup,  
    settingTextPopup,
    titlePopup,
    onClose,
    toggleTheme,
    handleGetInfoMusic,
    handleBackGround,
    handleChangeThumb,
    handleActiveSidebar,

    setIsOpenSidebarRight,
    setActiveAudio,
  }
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export { ContextProvider, Context } 