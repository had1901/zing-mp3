import React, { useEffect, useState } from 'react'
import { useForm ,Controller } from "react-hook-form"
import instance from '../../service/config'
import { Button, Form, Input, Select, Space } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

const optionItem = [
  {
    value: 'customer',
    label: 'Customer',
  },
  {
    value: 'tester',
    label: 'Tester',
  },
  {
    value: 'dev',
    label: 'Dev',
  },
  {
    value: 'admin',
    label: 'Admin',
    disabled: true,
  },
]

function UserFormController({openModelCreate, setOpenModelCreate}) {
  const [dataForm, setDataForm] = useState({})
  const [err, setErr] = useState({})
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: "",
      email: "",
      age: "",
    },
  })
  
  const handleChange = (e) => {
    console.log('option',e)
  }

  const onSubmit = (data) => {
    console.log('data',data)
    setDataForm(data)
  }
  console.log('errors',errors)

  useEffect(() => {
    if(dataForm) {
      const createUser = async () => {
        try{
          const user = await instance.post(`/auth/admin/create-user/`, dataForm)
          console.log('create-user', user)
        } catch(e){
          console.log(e)
        }
      }
      createUser()
    }
  }, [dataForm])

  return (
    <div className={`${openModelCreate ? 'fixed inset-0 bg-[#00000080] transition-all duration-300 opacity-1' : 'opacity-0'}`}>
      <dic className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[500px] h-[300px] p-8 shadow-lg rounded-md'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-3 flex-col'>
          <CloseOutlined onClick={() => setOpenModelCreate(false)} className='absolute right-3 top-3' />
          <div className='flex flex-col gap-3 pt-5'>
            <div>
              <label>Username</label>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: "Username is required", 
                  minLength: { value: 3, message: "Username must be at least 3 characters" },
                  maxLength: { value: 20, message: "Username not over 20 characters" }
                }}
                render={({ field }) => <Input placeholder="Username" {...field} style={{height: 40, }}/>}
              />
              <span className={`${errors.username ? 'block text-red-500' : 'hidden'}`}>{errors.username && errors.username.message}</span>
            </div>
            
            <dic>
              <label>Password</label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required", 
                  minLength: { value: 3, message: "Password must be at least 3 characters" },
                  maxLength: { value: 20, message: "Password not over 20 characters" }
                }}
                render={({ field }) => <Input placeholder="Password" {...field} style={{height: 40, }}/>}
              />
              <span className={`${errors.password ? 'block text-red-500' : 'hidden'}`}>{errors.password && errors.password.message}</span>
            </dic>
            
            <dic>
              <label>Group</label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => <Select {...field} defaultValue="customer" style={{width: 120, }} onChange={handleChange} options={optionItem} />}
              />
              <span className={`${errors.role ? 'block text-red-500' : 'hidden'}`}>{errors.role && errors.role.message}</span>
              <input type="submit" placeholder='Tạo' />
            </dic>
          </div>
        </form>
      </dic>
    </div>
  )
}

export default UserFormController