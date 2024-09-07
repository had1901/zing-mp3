import React, { useState } from 'react'
import { registerUser } from '../../service'
import { useNavigate } from 'react-router-dom'
import ContainerMain from '../../components/ContainerMain'

function Register() {
    const [user, setUser] = useState({ username: '', password: '' })
    const navigate = useNavigate()

    const getUserInput = (e) => {
        const { name, value } = e.target
        setUser(prev => ({
          ...prev,
          [name]: value
        }))
    }

    const handleSubmitRegister = async (e) => {
        e.preventDefault()
        try {
          await registerUser('https://be-zmp3.onrender.com/auth/register', user)
          alert('Register successfully')
          navigate('/login')
        } catch (err) {
          alert('Error registering')
        }
    }

    
  return (
    <ContainerMain>
        <div className='text-white'>
            <form onSubmit={handleSubmitRegister}>
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
                <div className='mx-auto flex item-center w-[500px] mt-5'>
                    <button type='submit' className='w-[120px] h-10 bg-[#69696966]'>Đăng ký</button>
                </div>
                
            </form>
        </div>
    </ContainerMain>
  )
}

export default Register