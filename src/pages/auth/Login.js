import React, { useEffect, useState } from 'react'
import ContainerMain from '../../components/ContainerMain'
import { login, registerUser } from '../../service'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/actions'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"
import { useForm } from "react-hook-form"
import instance from '../../service/config'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const useGetLocalStorage = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
     const data = JSON.parse(localStorage.getItem('user'))
     setUser(data)
  }, [])

  return user
}

function Login() {
  const [user, setUser] = useState({ username: '', password: '' })
  const { register, handleSubmit, formState: { errors }} = useForm()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const historyPathname = location.state?.from?.pathname || '/'
  

 
  const getUserInput = (e) => {
    const { name, value } = e.target
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
}
  

  const handleSubmitLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await instance.post('/auth/login', user)
      console.log('data', res)
      if(res.ec === 0) {
        const userEncoded = jwtDecode(res.dt.access_token)
        localStorage.setItem('user', JSON.stringify(res.dt.access_token))
        dispatch(actions.userLoginAction(userEncoded))
        alert('Login successfully')
        if(res.dt.group.group_name === 'admin'){
          navigate('/auth/admin')
        } else {
          navigate(historyPathname, { replace: true })
        }
      }
    } catch (err) {
      console.log('err-login', err)
      alert('Error login')
    }
  }

  

  return (
    <ContainerMain>
        <div className='text-white'>
            <form onSubmit={handleSubmitLogin}>
                <div className='flex item-center w-[500px] mt-5'>
                    <label className='basis-1/4 leading-10 text-sm font-medium' htmlFor='name'>Username</label>
                    <input 
                      className='flex-1 h-[40px] px-2 text-sm py-2 outline-none border border-[#495057] rounded bg-[#69696966]'
                      type='text' id='name' name='username' placeholder=''
                      required
                      onChange={getUserInput}
                    />
                </div>
                <div className='flex item-center w-[500px] mt-5'>
                    <label className='basis-1/4 leading-10 text-sm font-medium' htmlFor='singer'>Password</label>
                    <input 
                      className='flex-1 h-[40px] px-2 text-sm py-2 outline-none border border-[#495057] rounded bg-[#69696966]'
                      type='text' id='singer' name='password' placeholder=''
                      required
                      onChange={getUserInput}
                    />
                </div>
                {/* <div className='mx-auto flex item-center w-[500px] mt-5'>
                    <button  className='w-[120px] h-10 bg-[#69696966]' onClick={handleSubmitRegister}>Đăng ký</button>
                </div> */}
                <span className='text-sm'>
                  Bạn chưa có tài khoản?, 
                  <Link to='/register' className='text-blue-400'> đăng ký ngay</Link>
                </span>
                <div className='mx-auto flex item-center w-[500px] mt-5'>
                    <button type='submit' className='w-[120px] h-10 bg-[#69696966]' >Đăng nhập</button>
                </div>
                
            </form>
        </div>
    </ContainerMain>
  )
}

export default Login