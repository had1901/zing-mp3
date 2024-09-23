import React, { useEffect, useState } from 'react'
import { useForm ,Controller } from "react-hook-form"
import instance from '../../service/config'
import { Button, Form, Input, Select, Space, Spin } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

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

function UserFormController({openModelForm, setOpenModelForm, onSubmit, isUpdate, dataForm, loadingBtn}) {
  const { control, handleSubmit, getValues, setValue, formState: { errors } } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  })
  const dataValue = getValues()
  // console.log('getValue',dataValue)

  useEffect(() => {
    if(isUpdate){
      setValue('username', dataForm.username || '')
      setValue('password', dataForm.password || '')
      setValue('role', dataForm.permission || '')
    } else {
      setValue('username', '')
      setValue('password', '')
      setValue('role', '1')
    }

  }, [isUpdate, dataForm, setValue])


  return (
    <div className={`${openModelForm ? 'fixed inset-0 bg-[#00000080] transition-all duration-300' : 'hidden'}`}>
      <dic className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[500px] h-auto p-8 shadow-lg rounded-md'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-3 flex-col'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold'>{isUpdate ? 'Edit User' : 'Create new User'}</h2>
            <CloseOutlined onClick={() => setOpenModelForm(false)} className='p-1' />
          </div>
         
          <div className='flex flex-col gap-3'>
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