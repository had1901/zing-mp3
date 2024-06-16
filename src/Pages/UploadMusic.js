import React from 'react'
import ContainerMain from '../components/ContainerMain'

function UploadMusic() {


  return (
    <ContainerMain>
        <div className='text-white'>
            <form>
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
                    type='file' id='audio' name='audio' placeholder=''/>
                </div>
                <div className='flex item-center w-[500px] mt-5'>
                    <label className='basis-1/4 leading-10 text-sm font-medium' htmlFor='thumbnail'>Ảnh đại diện</label>
                    <input 
                    className='flex-1 h-[40px] px-2 text-sm py-2 outline-none border border-[#495057] rounded bg-[#69696966]'
                    type='file' id='thumbnail' name='thumbnail' placeholder=''/>
                </div>
            </form>
        </div>
    </ContainerMain>
  )
}

export default UploadMusic