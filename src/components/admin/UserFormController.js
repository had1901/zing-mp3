import React, { Fragment, useEffect, useState } from 'react'
import { useForm ,Controller } from "react-hook-form"
import instance from '../../service/config'
import { Button, Form, Input, Select, Space, Spin } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { jwtDecode } from 'jwt-decode'
import { inputMusicFormControl, inputUserFormControl } from './Form'
import { Option } from 'antd/es/mentions'

const optionItem = [
  {
    value: '1',
    label: 'Customer',
  },
  {
    value: '3',
    label: 'Tester',
  },
  {
    value: '4',
    label: 'Dev',
  },
  {
    value: '2',
    label: 'Admin',
    disabled: true,
  },
]

function UserFormController({openModelForm, setOpenModelForm, handle, title, isForm, dataForm, setDataForm, loadingBtn}) {
  
  const { control, handleSubmit, getValues, setValue, formState: { errors } } = useForm(() => {
    if(isForm === 'User') {
      return {
        defaultValues: {
          username: "",
          password: "",
          role: "1"
        }
      }
    } else if(isForm === 'Music') {
      return {
        defaultValues: {
          title: "",
          album: "",
          artist: "",
          duration: "",
          genre: "",
          thumbnail: "",
          url: "",
          url_mp4: "",
        }
      }
    }
  })
  const [disable, setDisable] = useState(false)

  // const renderForm = (itemFormControl) => {
  //   let element = null
  //   let valueInput = dataForm[itemFormControl.name]
  //   console.log('valueInput', valueInput)
  //   switch(isForm) {
  //     case 'User':
  //       element= <Controller
  //                   name={itemFormControl.name}
  //                   control={control}
  //                   rules={{
  //                     required: `${itemFormControl.label} is required`, 
  //                     minLength: { value: 3, message: `${itemFormControl.label} must be at least 3 characters` },
  //                     maxLength: { value: 20, message: `${itemFormControl.label} not over 20 characters` }
  //                   }}
  //                   render={({ field }) => {
  //                     return (
  //                       itemFormControl.componentType === 'Select'
  //                       ? <Select     
  //                               defaultValue='1'  
  //                               placeholder={itemFormControl.placeHolder}
  //                               value={field.value}
  //                               options={itemFormControl.options && itemFormControl.options.length > 0 && itemFormControl.options} 
  //                               style={{height: 40, }} 
  //                               onChange={(e) => {
  //                                 field.onChange(e)
  //                               }}
  //                             /> 
  //                       : <Input       
  //                               disabled={itemFormControl.name === 'username' && disable}
  //                               placeholder={itemFormControl.placeHolder}
  //                               value={field.value}
  //                               style={{height: 40, }} 
  //                               onChange={(e) => {
  //                                 field.onChange(e)
  //                               }}
  //                             /> 
  //                     ) 
  //                   }}
  //                 />
  //       break
  //     case 'Music':
  //       element= <Controller
  //                 name={itemFormControl.name}
  //                 control={control}
  //                 rules={{
  //                   required: `${itemFormControl.label} is required`, 
  //                   minLength: { value: 3, message: `${itemFormControl.label} must be at least 3 characters` },
  //                   maxLength: { value: 20, message: `${itemFormControl.label} not over 20 characters` }
  //                 }}
  //                 render={({ field }) => {
  //                   return <Input       
  //                             disabled={disable}
  //                             placeholder={itemFormControl.placeHolder}
  //                             value={field.value}
  //                             style={{height: 40, }} 
  //                             onChange={(e) => {
  //                               field.onChange(e)
  //                             }}

  //                           />  
  //                 }}
  //               />
  //     break
  //     default:
  //       return element
  //   }
  //   return element
  // }

  useEffect(() => {
    if(isForm === 'User') {
      if(title === 'Update'){
        setDisable(true)
        setValue('username', dataForm.username || '')
        setValue('password', '')
        setValue('role', dataForm.permission)
      } else {
        setValue('username', '')
        setValue('password', '')
        setValue('role', '1')
      }
    }
    if(isForm === 'Music') {
      if(title === 'Update'){
        setValue('title', dataForm.title || '')
        setValue('album', dataForm.album || '')
        setValue('artist', dataForm.artist || '')
        setValue('duration', dataForm.duration || '')
        setValue('genre', dataForm.genre || '')
        setValue('releaseDate', dataForm.releaseDate || '')
        setValue('thumbnail', dataForm.thumbnail || '')
        setValue('url', dataForm.url || '')
        setValue('url_mp4', dataForm.url_mp4 || '')
      } else {
        setValue('title',  '')
        setValue('album',  '')
        setValue('artist',  '')
        setValue('duration',  '')
        setValue('genre',  '')
        setValue('releaseDate', '')
        setValue('thumbnail',  '')
        setValue('url',  '')
        setValue('url_mp4',  '')
      }
    }
  }, [title, isForm, dataForm, setValue])


  return (
    <div className={`${openModelForm ? 'fixed inset-0 bg-[#00000080] transition-all duration-300' : 'hidden'}`}>
      <dic className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[500px] h-auto p-8 shadow-lg rounded-md'>
        <form onSubmit={handleSubmit(handle)} className='flex gap-3 flex-col'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold'>{title}</h2>
            <CloseOutlined onClick={() => setOpenModelForm(false)} className='p-1' />
          </div>
         
          <div className='flex flex-col gap-3'>
          {isForm === 'User'
            ? <Fragment>
               <div>
                <label className='block font-semibold mb-1'>Username</label>
                <Controller
                  name="username"
                  control={control}
                  rules={{
                    required: "Username is required", 
                    minLength: { value: 3, message: "Username must be at least 3 characters" },
                    maxLength: { value: 20, message: "Username not over 20 characters" }
                  }}
                  render={({ field }) => {
                    return <Input       
                             disabled={disable}
                             placeholder="Username"
                             value={field.value}
                             style={{height: 40, }} 
                             onChange={(e) => {
                              field.onChange(e)
                             }}
  
                            />  
                  }}
                />
                <span className={`${errors.username ? 'block text-red-500' : 'hidden'}`}>{errors.username && errors.username.message}</span>
                </div>
  
                <dic>
                  <label className='block font-semibold mb-1'>Password</label>
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: "Password is required", 
                      minLength: { value: 3, message: "Password must be at least 3 characters" },
                      maxLength: { value: 20, message: "Password not over 20 characters" }
                    }}
                    render={({ field }) => {
                      return <Input 
                                placeholder="Password" 
                                value={field.value}
                                style={{height: 40, }} 
                                onChange={(e) => {
                                  field.onChange(e)
                                }}/>
                    }}
                  />
                  <span className={`${errors.password ? 'block text-red-500' : 'hidden'}`}>{errors.password && errors.password.message}</span>
                </dic>
                
                <dic className='flex flex-col'>
                  <label className='block font-semibold mb-1'>Group</label>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => {
                      return <Select 
                                defaultValue="1"
                                value={field.value}
                                style={{width: 120, }} 
                                options={optionItem} 
                                onChange={(e) => {
                                  field.onChange(e)
                                }} 
  
                              />
                    }}
                  />
                  <span className={`${errors.role ? 'block text-red-500' : 'hidden'}`}>{errors.role && errors.role.message}</span>
                </dic>
              </Fragment>
            : <Fragment>
               <div>
                <label className='block font-semibold mb-1'>Title</label>
                <Controller
                  name="title"
                  control={control}
                  rules={{
                    required: "Title is required", 
                    minLength: { value: 3, message: "Title must be at least 3 characters" },
                    maxLength: { value: 20, message: "Title not over 20 characters" }
                  }}
                  render={({ field }) => {
                    return <Input       
                             placeholder="Title"
                             value={field.value}
                             style={{height: 40, }} 
                             onChange={(e) => {
                              field.onChange(e)
                             }}
  
                            />  
                  }}
                />
                <span className={`${errors.title ? 'block text-red-500' : 'hidden'}`}>{errors.title && errors.title.message}</span>
                </div>
  
                <dic>
                  <label className='block font-semibold mb-1'>Artist</label>
                  <Controller
                    name="artist"
                    control={control}
                    rules={{
                      required: "Artist is required", 
                      minLength: { value: 3, message: "Artist must be at least 3 characters" },
                      maxLength: { value: 20, message: "Artist not over 20 characters" }
                    }}
                    render={({ field }) => {
                      return <Input 
                                placeholder="Artist" 
                                value={field.value}
                                style={{height: 40, }} 
                                onChange={(e) => {
                                  field.onChange(e)
                                }}/>
                    }}
                  />
                  <span className={`${errors.artist ? 'block text-red-500' : 'hidden'}`}>{errors.artist && errors.artist.message}</span>
                </dic>

                <dic>
                  <label className='block font-semibold mb-1'>Genre</label>
                  <Controller
                    name="genre"
                    control={control}
                    rules={{
                      required: "Genre is required", 
                      minLength: { value: 3, message: "Genre must be at least 3 characters" },
                      maxLength: { value: 20, message: "Genre not over 20 characters" }
                    }}
                    render={({ field }) => {
                      return <Input 
                                placeholder="Genre" 
                                value={field.value}
                                style={{height: 40, }} 
                                onChange={(e) => {
                                  field.onChange(e)
                                }}/>
                    }}
                  />
                  <span className={`${errors.genre ? 'block text-red-500' : 'hidden'}`}>{errors.genre && errors.genre.message}</span>
                </dic>

                <dic>
                  <label className='block font-semibold mb-1'>Duration</label>
                  <Controller
                    name="duration"
                    control={control}
                    rules={{
                      required: "Duration is required", 
                      minLength: { value: 3, message: "Duration must be at least 3 characters" },
                      maxLength: { value: 20, message: "Duration not over 20 characters" }
                    }}
                    render={({ field }) => {
                      return <Input 
                                placeholder="Duration" 
                                value={field.value}
                                style={{height: 40, }} 
                                onChange={(e) => {
                                  field.onChange(e)
                                }}/>
                    }}
                  />
                  <span className={`${errors.duration ? 'block text-red-500' : 'hidden'}`}>{errors.duration && errors.duration.message}</span>
                </dic>

                <dic>
                  <label className='block font-semibold mb-1'>Thumbnail</label>
                  <Controller
                    name="thumbnail"
                    control={control}
                    rules={{
                      required: "Thumbnail is required", 
                      minLength: { value: 3, message: "Thumbnail must be at least 3 characters" },
                    }}
                    render={({ field }) => {
                      return <Input 
                                placeholder="Thumbnail" 
                                value={field.value}
                                style={{height: 40, }} 
                                onChange={(e) => {
                                  field.onChange(e)
                                }}/>
                    }}
                  />
                  <span className={`${errors.thumbnail ? 'block text-red-500' : 'hidden'}`}>{errors.thumbnail && errors.thumbnail.message}</span>
                </dic>

                <dic>
                  <label className='block font-semibold mb-1'>Release Date</label>
                  <Controller
                    name="releaseDate"
                    control={control}
                    rules={{
                      required: "ReleaseDate is required", 
                      minLength: { value: 3, message: "ReleaseDate must be at least 3 characters" },
                    }}
                    render={({ field }) => {
                      return <Input 
                                placeholder="ReleaseDate" 
                                value={field.value}
                                style={{height: 40, }} 
                                onChange={(e) => {
                                  field.onChange(e)
                                }}/>
                    }}
                  />
                  <span className={`${errors.releaseDate ? 'block text-red-500' : 'hidden'}`}>{errors.releaseDate && errors.releaseDate.message}</span>
                </dic>
                
                <dic>
                  <label className='block font-semibold mb-1'>URL</label>
                  <Controller
                    name="url"
                    control={control}
                    rules={{
                      required: "Url is required", 
                      minLength: { value: 3, message: "Url must be at least 3 characters" },
                    }}
                    render={({ field }) => {
                      return <Input 
                                placeholder="URL" 
                                value={field.value}
                                style={{height: 40, }} 
                                onChange={(e) => {
                                  field.onChange(e)
                                }}/>
                    }}
                  />
                  <span className={`${errors.url ? 'block text-red-500' : 'hidden'}`}>{errors.url && errors.url.message}</span>
                </dic>

                <dic>
                  <label className='block font-semibold mb-1'>URL MP4</label>
                  <Controller
                    name="url_mp4"
                    control={control}
                    rules={{
                      required: "Url mp4 is required", 
                      minLength: { value: 3, message: "Url mp4 must be at least 3 characters" },
                    }}
                    render={({ field }) => {
                      return <Input 
                                placeholder="URL mp4" 
                                value={field.value}
                                style={{height: 40, }} 
                                onChange={(e) => {
                                  field.onChange(e)
                                }}/>
                    }}
                  />
                  <span className={`${errors.url_mp4 ? 'block text-red-500' : 'hidden'}`}>{errors.url_mp4 && errors.url_mp4.message}</span>
                </dic>
              </Fragment>
          }
            


            {/* {isForm === 'User' 
              ? inputUserFormControl.length > 0 && inputUserFormControl.map(itemFormControl => (
                  <div key={itemFormControl.name}>
                    <label className='block font-semibold mb-1'>{itemFormControl.label}</label>
                    {renderForm(itemFormControl)}
                  </div>
                ))
              : inputMusicFormControl.length > 0 && inputMusicFormControl.map(itemFormControl => (
                <div key={itemFormControl.name}>
                  <label className='block font-semibold mb-1'>{itemFormControl.label}</label>
                  {renderForm(itemFormControl)}
                  {console.log(itemFormControl)}
                </div>
              ))
            } */}

            <div className='flex items-center justify-center'>
              {loadingBtn
              ? <div className='text-center w-full h-10 px3 py-1 rounded bg-green-200 hover:cursor-progress '><Spin /></div>
              : <input type="submit" placeholder='Tạo aaa' className='bg-green-400 text-white font-semibold w-full h-10  px-3 py-1 mt-auto rounded hover:bg-green-500 cursor-pointer'  />}
            </div>
          </div>
        </form>
      </dic>
    </div>
  )
}

export default UserFormController