import { actions } from "../redux/actions"
import { handleLogout, refreshNewToken } from "../service"
import instance from "../service/config"


const verifyUser = async (protectedRoute, ...rest) => {
      try {
          const res = await instance.post(`${protectedRoute}`, {})
          console.log('verify: ', res)

          
          return res
      } catch(err) {
          console.log('libraries-error: ', err)
          if(err.data.isHasExpired) {
            const refreshToken = await instance.post('/auth/refreshToken', {})
            console.log('verify-isHasExpired: ', refreshToken)
            const res = await instance.post(`${protectedRoute}`, {})
            console.log('verify-data-protected: ', res)

            if(res.isValid === false || res.isToken === false) {
              handleLogout(actions, ...rest)
              return
            }
          }
      }
      
    }

export {
    verifyUser,
}