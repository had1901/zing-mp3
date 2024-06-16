import { useState, useRef, useEffect, createContext, useCallback } from "react";

const Context = createContext()

function ContextProvider({ children }) {
  const [songInitial, setSongInitial] = useState([])
  const [infoMusic, setInfoMusic] = useState([])
  const [checkScroll, setCheckScroll] = useState()
  const [isActive, setIsActive] = useState(false)
  const [isActiveSidebar, setIsActiveSidebar] = useState(false)
  const [activeAudio, setActiveAudio] = useState(false)
  const [isFocus, setIsFocus] = useState(false)


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



  const handleChangeThumb = () => {
    setIsActive(!isActive)
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
    } else {
      setIsActiveSidebar(true)
    }
  }

  const handleInputSearch = (boo) => {
    setIsFocus(boo)
  }
  

  const value = {
    infoMusic,
    isActive,
    isActiveSidebar,
    activeAudio,
    songInitial,
    listPlay,
    songListen,
    isFocus,
    checkScroll,

    handleChangeThumb,
    handleActiveSidebar,
    setActiveAudio,
    handleListenNear,
    handleInputSearch,
  }

  

  // useEffect(() => {
  //   window.addEventListener('scroll', () => {
  //     if(window.scrollY > 0) {
  //       setCheckScroll(window.scrollY)
  //     } else {
  //       setCheckScroll('')
  //     }
  //   })
  // }, [])

  

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export { ContextProvider, Context } 