import { useState, useRef, useEffect, createContext, useCallback } from "react";

const Context = createContext()

function ContextProvider({ children }) {
  const [songInitial, setSongInitial] = useState([])
  const [infoMusic, setInfoMusic] = useState([])
  const [isActive, setIsActive] = useState(false)
  const [isActiveSidebar, setIsActiveSidebar] = useState(false)
  const [activeAudio, setActiveAudio] = useState(false)
  const [isFocus, setIsFocus] = useState(false)
  const [isLoading, setIsLoading] = useState(true)


  const [listPlay, setListPlay] = useState(() => {
    let songPlaying = JSON.parse(localStorage.getItem('listPlaying'))
    return songPlaying || songInitial[0]
  })

  const [songListen, setSongListen] = useState(() => {
    let stores = JSON.parse(localStorage.getItem('songListenNear'))
    if(stores) {
      return stores
    }
    return []
  })



  const handleChangeThumb = () => {
    setIsActive(!isActive)
  }

  const handleListenNear = (song) => {
    console.log('song-context', song)
    setListPlay(song) 
    localStorage.setItem('listPlaying', JSON.stringify(song))
    setSongListen(prev => {
        if(!Array.isArray(prev)) {
          return prev = []
        }
        const prevSong = prev.some(pre => pre.url === song.url && pre.title === song.title)
        if(prev === undefined || null || !prevSong) {
          let songNew = [...prev, song]
          localStorage.setItem('songListenNear', JSON.stringify(songNew))
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
    isLoading,

    handleChangeThumb,
    handleActiveSidebar,
    handleListenNear,
    handleInputSearch,
    setActiveAudio,
    setIsLoading
  }

  

  

  

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export { ContextProvider, Context } 