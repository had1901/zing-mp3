import React, { useEffect, useState } from 'react'
import ContainerMain from '../components/ContainerMain'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { verifyUser } from '../api/verifyToken'
import Content from './../components/Content';
import { getFile, uploadFile } from '../service'
import img1 from '../images/avatar-jisoo.jpg'

function User() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [file, setFile] = useState(null)
    const [image, setImage] = useState(null)
    const [listFile, setListFile] = useState(null)

    console.log('image', image)

    const handleChange = async (e) => {
        setFile(e.target.files[0])
    }

    const handleSubmitUpload = async (e) => {
        e.preventDefault()
        if(!file) {
            alert('Please enter file')
            return
        }

        const formData = new FormData()
        formData.append('audio', file)
        try {
            const res = await uploadFile('/auth/upload-file', formData )
            setImage(res.data.data.uploadResult.secure_url)
        } catch(e) {
            console.log('upload-file-error', e)
        }
    }
    
    const getListFile = async (e) => {
        try {
            const res = await getFile('/auth/get-file')
            console.log('get-file: ', res)
            
            setListFile(res.data.dt)
        } catch(e) {
            console.log('get-file-error', e)
        }
    }

    useEffect(() => {
        verifyUser('/auth/upload', dispatch, navigate)
    }, [dispatch, navigate])

  return (
    <ContainerMain>
        <div className='text-white'>
            {/* <form method='post' enctype="multipart/form-data" onSubmit={handleSubmitUpload}>
                <div className='flex item-center w-[500px] mt-5'>
                    <label className='basis-1/4 leading-10 text-sm font-medium' htmlFor='name'>Name</label>
                    <input 
                    className='flex-1 h-[40px] px-2 text-sm py-2 outline-none border border-[#495057] rounded bg-[#69696966]'
                    type='text' id='name' name='name' placeholder=''/>
                </div>
                <div className='flex item-center w-[500px] mt-5'>
                    <label className='basis-1/4 leading-10 text-sm font-medium' htmlFor='singer'>Singer</label>
                    <input 
                    className='flex-1 h-[40px] px-2 text-sm py-2 outline-none border border-[#495057] rounded bg-[#69696966]'
                    type='text' id='singer' name='singer' placeholder=''/>
                </div>
                <div className='flex item-center w-[500px] mt-5'>
                    <label className='basis-1/4 leading-10 text-sm font-medium' htmlFor='album'>Album</label>
                    <input 
                    className='flex-1 h-[40px] px-2 text-sm py-2 outline-none border border-[#495057] rounded bg-[#69696966]'
                    type='text' id='album' name='album' placeholder=''/>
                </div>
                <div className='flex item-center w-[500px] mt-5'>
                    <label className='basis-1/4 leading-10 text-sm font-medium' htmlFor='audio'>File auio MP3</label>
                    <input 
                    className='flex-1 h-[40px] px-2 text-sm py-2 outline-none border border-[#495057] rounded bg-[#69696966]'
                    type='file' id='audio' name='audio' placeholder='' onChange={handleChange}/>
                </div>
                <div className='flex item-center w-[500px] mt-5'>
                    <label className='basis-1/4 leading-10 text-sm font-medium' htmlFor='thumbnail'>Ảnh đại diện</label>
                    <input 
                    className='flex-1 h-[40px] px-2 text-sm py-2 outline-none border border-[#495057] rounded bg-[#69696966]'
                    type='file' id='thumbnail' name='thumbnail' placeholder=''/>
                </div>
                <div className='flex item-center w-[500px] mt-5'>
                    
                    <button 
                    className='flex-1 h-[40px] px-2 text-sm py-2 outline-none border border-[#495057] rounded bg-[#69696966]'
                    type='submit' placeholder='' >Submit</button>
                </div>
            </form> */}
            <form method='post' enctype="multipart/form-data" onSubmit={handleSubmitUpload}>
                <div className='flex item-center w-[500px] mt-5'>
                    <label className='basis-1/4 leading-10 text-sm font-medium' htmlFor='audio'>File auio MP3</label>
                    <input 
                    className='flex-1 h-[40px] px-2 text-sm py-2 outline-none border border-[#495057] rounded bg-[#69696966]'
                    type='file' id='audio' name='audio' placeholder='' onChange={handleChange}/>
                </div>
                <div className='flex item-center w-[500px] mt-5'>

                    <button 
                    className='flex-1 h-[40px] px-2 text-sm py-2 outline-none border border-[#495057] rounded bg-[#69696966]'
                    type='submit' placeholder='' >Submit</button>
                </div>
            </form>
        { image && <img src={image} alt='img' className='w-[300px] h-full object-cover' />}
        <label htmlFor='123'>123</label>

        </div>
        <div className='flex item-center w-[500px] mt-5'>
            <button 
                className='flex-1 h-[40px] px-2 text-sm py-2 outline-none border border-[#495057] rounded bg-[#69696966]'
                type='submit' placeholder='' onClick={getListFile}>Submit</button>
        </div>        
    </ContainerMain>
  )
}

export default User