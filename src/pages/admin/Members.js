import React, { useEffect, useState } from 'react'
import { Space, Table, Modal, Button  } from 'antd';
import instance from '../../service/config';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import UserFormController from '../../components/admin/UserFormController';
import { Pagination } from 'antd'



function Members() {
  const [user, setUser] = useState([])

  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const [isLoadingCreate, setIsLoadingCreate] = useState(false)
  const [isLoadingEdit, setIsLoadingEdit] = useState(false)
  const [isLoadingTable, setIsLoadingTable] = useState(true)

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
  const [openModelFormCreate, setOpenModelFormCreate] = useState(false)
  const [openModelFormEdit, setOpenModelFormEdit] = useState(false)

  const [userId, setUserId] = useState(null)
  const [dataForm, setDataForm] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // delete user
  const handleDeleteUser = async (userId) => {
    if(userId) {
      setIsLoadingTable(true)
      setIsLoadingDelete(true)
      try{
        const deletedUser = await instance.delete(`/auth/admin/delete-user/${userId}`)
        console.log('deletedUser', deletedUser)
        if(deletedUser.ec === 0) {
          toast.info('Deleted successfully')
          fetchUsers()
          setOpenConfirmDelete(false)
          setIsLoadingTable(false)
          setIsLoadingDelete(false)
        }
      } catch(e){
        console.error(e)
        setOpenConfirmDelete(false)
      }
    }
  }

  // update user
  const onSubmitEdit = async (data, userId) => {
    console.log('userId', userId)
    if(userId) {
      try{
        const updateUser = await instance.put(`/auth/admin/update-user/${userId}`, data)
        console.log('updateUser', updateUser)
        if(updateUser.ec === 0) {
          fetchUsers()
          toast.success('Update successfully')
          setIsLoadingTable(false)
          setOpenModelFormEdit(false)
        }
      } catch(e){
        console.error(e)
      }
    }
  }
  const handleEditUser = async (data) => {
    await onSubmitEdit(data,userId)
  }

  // create user
  const handleCreateUser = async (data) => {
    setIsLoadingCreate(true)
    try{
      const createUser = await instance.post(`/auth/admin/create-user/`, data)
      console.log('create-user', user)
      if(createUser.ec === 0) {
        toast.success('Created successfully')
        fetchUsers()
        setIsLoadingTable(false)
        setIsLoadingCreate(false)
        setOpenModelFormCreate(false)
      }
    } catch(e){
      console.log(e)
      if(e.data.ec === 1) {
        toast.warning('User exist')
        setIsLoadingTable(false)
        setIsLoadingCreate(false)
      }
    }
  }

  // get all user
  const fetchUsers = async () => {
    setIsLoadingTable(true)
    try{
      const res = await instance.get('/auth/admin/get-users')
      if(res.ec === 0){
        setUser(res.dt)
        setIsLoadingTable(false)
      }
    } catch(e){
      console.log(e)
    }
  }

  // render columns table and data table
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (_, record) => (
        <Space size="middle">
          {record.permission && record.permission === 'admin' 
            ? <span className=' font-semibold'>{record.key}</span>
            : <span className=''>{record.key}</span>
          }
        </Space>
      ),
      width: 30,
      className: 'bg-gray-300'
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (_, record) => (
        <Space size="middle">
          {record.permission && record.permission === 'admin' 
            ? <span className='font-bold'>{record.username}</span>
            : <span className=''>{record.username}</span>
          }
        </Space>
      ),
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Permission',
      dataIndex: 'permission',
      key: 'permission',
      render: (_, record) => (
        <Space size="middle">
          {record.permission && record.permission === 'admin' 
            ? <span className=' text-white bg-red-500 px-2 py-1 rounded-[4px] font-semibold uppercase'>{record.permission}</span>
            : <span className=''>{record.permission}</span>
          }
        </Space>
      ),
      width: 80,
    },
    {
      title: 'Actions',      
      key: 'actions',
      render: (_, record) => {
        return <Space key={record.key} size="middle">
          {record.permission === 'admin' 
            ? null 
            : record.actions.length > 0 && record.actions.map(btn => (
                btn === 'Delete'
                ? <button 
                  onClick={() => {
                    setOpenConfirmDelete(true)
                    setUserId(record.id)
                  }} 
                  className={`${btn === 'Delete' ? 'border-red-500 text-red-500 hover:bg-red-500' : 'border-purple-500 text-purple-500 hover:bg-purple-500'} border py-1 px-3 rounded-md hover:text-white`}>{btn}</button>
                : <button 
                  onClick={() => {
                    setOpenModelFormEdit(true)
                    setUserId(record.id)
                    setDataForm(record)
                  }} 
                  className={`${btn === 'Delete' ? 'border-red-500 text-red-500 hover:bg-red-500' : 'border-purple-500 text-purple-500 hover:bg-purple-500'} border py-1 px-3 rounded-md hover:text-white`}>{btn}</button>
              ))
          }
        </Space>
      },
      width: 80
    },
  ]
  const renderData = (listUser) => {
    const data =  listUser.map((item, index )=> {
      return {
          key: index,
          id: item.id,
          username: item.username,
          password: item.password && '*'.repeat(16),
          permission: item.Group.group_name,
          actions: ['Edit', 'Delete'],
        }
    })
    return data
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
      <>
        <Modal
          title="Confirm"
          open={openConfirmDelete}
          onOk={() => handleDeleteUser(userId)}
          confirmLoading={isLoadingDelete}
          onCancel={() => setOpenConfirmDelete(false)}
        >
          <p>Xác nhận xóa người dùng này?</p>
        </Modal>

        <Button type="primary" onClick={() => setOpenModelFormCreate(true)}>Create New Account +</Button>
        <Table 
          sortDirections
          className='border border-gray-200 mt-4'
          bordered={true} 
          loading={isLoadingTable} 
          columns={columns && columns} 
          dataSource={user && renderData(user)} 
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            onChange: (page, size) => {
              setCurrentPage(page)
              setPageSize(size)
            },
          }}
        />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        
        
        <UserFormController 
            isForm='User' 
            title="Create"
            openModelForm={openModelFormCreate} 
            setOpenModelForm={setOpenModelFormCreate} 
            dataForm={dataForm} 
            setDataForm={setDataForm}
            handle={handleCreateUser} 
            loadingBtn={isLoadingCreate}
        /> 
        <UserFormController 
            isForm='User' 
            title="Update"
            openModelForm={openModelFormEdit} 
            setOpenModelForm={setOpenModelFormEdit} 
            handle={handleEditUser} 
            dataForm={dataForm} 
            setDataForm={setDataForm}
            loadingBtn={isLoadingEdit}
        />
      </>
      
   
  )
}

export default Members