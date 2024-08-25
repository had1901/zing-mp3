import { actions } from "../redux/actions"
import { handleLogout, refreshNewToken } from "../service"


const verifyUser = async (protectedRoute, ...rest) => {
      try {

          const res = await fetch(`${protectedRoute}`, {
            method: 'POST'
          })
          let data = await res.json()
          if(data.isHasExpired) {
            const refreshToken = await refreshNewToken('/auth/refreshToken')
            console.log('refresh-isHasExpired: ', refreshToken)
            const res = await fetch(`${protectedRoute}`, {
              method: 'POST',
            })
            data = await res.json()
          }
          if(data.isValid === false || data.isToken === false) {
            handleLogout(actions, ...rest)
            return
          }
          console.log('libraries-isValid-isToken: ', data)
          return data
      } catch(e) {
          console.log('libraries-error: ', e.response)
  
      }
      
    }

export {
    verifyUser,
}