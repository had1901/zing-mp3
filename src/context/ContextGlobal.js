import { useState, useRef, useEffect, createContext, useCallback, useContext } from "react";

const Context = createContext()

function ContextProvider({ children }) {
  const audio = useRef(null)
  
  const [songInitial, setSongInitial] = useState([])
  const [infoMusic, setInfoMusic] = useState([])
  const [isActive, setIsActive] = useState(false)
  const [isActiveSidebar, setIsActiveSidebar] = useState(false)
  const [activeAudio, setActiveAudio] = useState(false)
  const [isFocus, setIsFocus] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadMetaAudio, setIsLoadMetaAudio] = useState(true)
  const [play, setPlay] = useState(false)
  const [player, setPlayer] = useState(false)


  const [listPlay, setListPlay] = useState(() => {
    const songPlaying = localStorage.getItem('playing');
    
    if (songPlaying) {
        try {
            const parseSongPlaying = JSON.parse(songPlaying);
            return parseSongPlaying || songInitial[0];
        } catch (error) {
            console.error('Error parsing JSON from localStorage:', error);
            return songInitial[0] // Trả về giá trị mặc định nếu có lỗi
        }
    } else {
        return songInitial[0] // Trả về giá trị mặc định nếu `songPlaying` là `null`
    }
});

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
    localStorage.setItem('playing', JSON.stringify(song))
    setSongListen(prev => {
        if(!Array.isArray(prev)) {
          return prev = []
        }
        const prevSong = prev.some(pre => pre?.url === song?.url && pre?.title === song?.title)
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
    audio,
    isLoadMetaAudio,
    play,
    player,
    
    handleChangeThumb,
    handleActiveSidebar,
    handleListenNear,
    handleInputSearch,
    setActiveAudio,
    setIsLoading,
    setIsLoadMetaAudio,
    setPlay,
    setPlayer
  }

  

  

  

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export const useGlobalRef = () => {
  return useContext(Context)
}
export { ContextProvider, Context } 