import { useState, useRef, useEffect, createContext, useCallback } from "react";

const Context = createContext()

function ContextProvider({ children }) {
  const [theme, setTheme] = useState('dark')
  const [songInitial, setSongInitial] = useState([])
  const [infoMusic, setInfoMusic] = useState([])
  const [listPlay, setListPlay] = useState(() => {
    let songPlaying = JSON.parse(localStorage.getItem('listPlay'))
    return songPlaying || songInitial[0]
  })
  const [songListen, setSongListen] = useState(() => {
    let stores = JSON.parse(localStorage.getItem('songListen'))
    if(stores) {
      return stores
    }
    return []
  })
  console.log(songListen)


  

  const [checkScroll, setCheckScroll] = useState()
  const [isActive, setIsActive] = useState(false)
  const [isActiveSidebar, setIsActiveSidebar] = useState(false)
  const [activeAudio, setActiveAudio] = useState(false)



  const elementContainer = useRef()
  const buttonRef = useRef()
  const searchRef = useRef()
  const divRef = useRef()
  const sectionRef = useRef()
  const sidebarRef = useRef()
  const buttonDownLoadRef = useRef()

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
        if(!Array.isArray(prev)) {
          return prev = []
        }
        const prevSong = prev.some(pre => pre.information.path === item.information.path && pre.name.song === item.name.song)
        if(prev === undefined || null || !prevSong) {
          let songNew = [...prev, item]
          localStorage.setItem('songListen', JSON.stringify(songNew))
          return songNew
        }
      return prev
     
    })
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

    isActive,
    isActiveSidebar,
    activeAudio,
    songInitial,
    listPlay,
    songListen,

    checkScroll,

    toggleTheme,
    handleChangeThumb,
    handleActiveSidebar,
    setActiveAudio,
    handleListenNear,
  }

  

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if(window.scrollY > 0) {
        setCheckScroll(window.scrollY)
      } else {
        setCheckScroll('')
      }
    })
  }, [])

  

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export { ContextProvider, Context } 