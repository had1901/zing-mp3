import React, { Fragment, useEffect, useState } from 'react'
import { useForm ,Controller } from "react-hook-form"
import instance from '../../service/config'
import { Button, Form, Input, Select, Space, Spin } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { inputMusicFormControl, inputThemeFormControl, inputUserFormControl } from './Form'
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
    if(isForm === 'Theme') {
      if(title === 'Update'){
        setValue('name', dataForm.name)
        setValue('genre', dataForm.genre)
        setValue('url', dataForm.url)
      } else {
        setValue('name', '')
        setValue('genre', '')
        setValue('url', '')
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
            {isForm === 'User' && 
              inputUserFormControl.length > 0 && inputUserFormControl.map((inputItem) => (
                <div key={inputItem.name}>
                  <label className='block font-semibold mb-1'>{inputItem.label}</label>
                  <Controller
                    name={inputItem.name}
                    control={control}
                    rules={
                      inputItem.componentType === 'Select'
                      ? null
                      : {
                          required: `${inputItem.label} is required`, 
                          minLength: { value: 3, message: `${inputItem.label} must be at least 3 characters` },
                        }
                    }
                    render={({ field }) => {
                      if(inputItem.componentType === 'Select') {
                        return <Select 
                                  placeholder={inputItem.label}
                                  value={field.value}
                                  options={inputItem.options}
                                  style={{height: 40, }} 
                                  onChange={(e) => {
                                    field.onChange(e)
                                }}/>
                      } else {
                        return <Input 
                                  placeholder={inputItem.label}
                                  value={field.value}
                                  style={{height: 40, }} 
                                  onChange={(e) => {
                                    field.onChange(e)
                                }}/>
                      }
                    }}
                  />
                  <span className={`${errors[inputItem.name] ? 'block text-red-500' : 'hidden'}`}>{errors[inputItem.name] && errors[inputItem.name].message}</span>
                </div>
              ))
            }

            {isForm === 'Music' &&
              inputMusicFormControl.length > 0 && inputMusicFormControl.map((inputItem) => (
                <div key={inputItem.name}>
                    <label className='block font-semibold mb-1'>{inputItem.label}</label>
                    <Controller
                      name={inputItem.name}
                      control={control}
                      rules={{
                        required: `${inputItem.label} is required`, 
                        minLength: { value: 3, message: `${inputItem.label} must be at least 3 characters` },
                      }}
                      render={({ field }) => {
                        return <Input 
                                  placeholder={inputItem.label}
                                  value={field.value}
                                  style={{height: 40, }} 
                                  onChange={(e) => {
                                    field.onChange(e)
                                  }}/>
                      }}
                    />
                    <span className={`${errors[inputItem.name] ? 'block text-red-500' : 'hidden'}`}>{errors[inputItem.name] && errors[inputItem.name].message}</span>
                </div>
            ))}

            {isForm === 'Theme' &&
              inputThemeFormControl.length > 0 && inputThemeFormControl.map((inputItem) => (
                <div key={inputItem.name}>
                    <label className='block font-semibold mb-1'>{inputItem.label}</label>
                    <Controller
                      name={inputItem.name}
                      control={control}
                      rules={{
                        required: `${inputItem.label} is required`, 
                        minLength: { value: 3, message: `${inputItem.label} must be at least 3 characters` },
                      }}
                      render={({ field }) => {
                        return <Input 
                                  placeholder={inputItem.label}
                                  value={field.value}
                                  style={{height: 40, }} 
                                  onChange={(e) => {
                                    field.onChange(e)
                                  }}/>
                      }}
                    />
                    <span className={`${errors[inputItem.name] ? 'block text-red-500' : 'hidden'}`}>{errors[inputItem.name] && errors[inputItem.name].message}</span>
                </div>
            ))}
            
            <div className='flex items-center justify-center'>
              {loadingBtn
                ? (<div className='text-center w-full h-10 px3 py-1 rounded bg-green-200 hover:cursor-progress '><Spin /></div>)
                : (<input type="submit" placeholder='Tạo aaa' className='bg-green-400 text-white font-semibold w-full h-10  px-3 py-1 mt-auto rounded hover:bg-green-500 cursor-pointer'  />)
              }
            </div>
          </div>
        </form>
      </dic>
    </div>
  )
}

export default UserFormController