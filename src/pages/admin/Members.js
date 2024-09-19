import React, { useEffect, useState } from 'react'
import { Space, Table, Tag, Modal, Button  } from 'antd';
import instance from '../../service/config';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useLocation, useParams } from 'react-router-dom';
import { Alert, Flex, Spin, Switch, Skeleton } from 'antd';
import UserFormController from '../../components/admin/UserFormController';




function Members() {
  const [user, setUser] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
  const [openModelCreate, setOpenModelCreate] = useState(false)
  const [openFormUpdate, setOpenFormUpdate] = useState(false)
  const [userId, setUserId] = useState(null)
  
  const handleOk = async (userId) => {
    if(userId) {
      setIsLoading(true)
      try{
        const deletedUser = await instance.delete(`/auth/admin/delete-user/${userId}`)
        console.log('deletedUser', deletedUser)
        if(deletedUser.ec === 0) {
          fetchUsers()
          toast.info('Deleted successfully')
          setOpenConfirmDelete(false)
          setIsLoading(false)
        }
      } catch(e){
        console.error(e)
        setOpenConfirmDelete(false)
      }
    }
  }
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (_, record) => (
        <Space size="middle">
          {record.permission && record.permission === 'admin' 
            ? <span className=' font-semibold'>{record.id}</span>
            : <span className=''>{record.id}</span>
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
    },
    {
      title: 'Actions',      
      key: 'actions',
      render: (_, record) => {
        return <Space key={record.id} size="middle">
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
                    setOpenFormUpdate(true)
                    setUserId(record.id)
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
    const data =  listUser.map(item => {
      return {
          key: item.id,
          id: item.id,
          username: item.username,
          password: item.password && '*'.repeat(10),
          permission: item.Group.group_name,
          actions: ['Edit', 'Delete'],
        }
    })
    return data
  }

  // const renderSkeleton = (num) => {
  //   console.log(num)
  //   const skeletons = num.map((_, index) => {
  //     return <Skeleton.Button className='mt-2' active block={true} loading={isLoading} size={'large'} />
  //   })
  //   return skeletons
  // }
  const fetchUsers = async () => {
    setIsLoading(true)
    try{
      const res = await instance.get('/auth/admin/get-users')
      if(res.ec === 0){
        setUser(res.dt)
        setIsLoading(false)
      }
    } catch(e){
      console.log(e)
    }
  }
  
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
      // isLoading 
      // ? <>
      //     {renderSkeleton(Array(10).fill(14))}
      //   </>
      // // <div className='flex items-center justify-center h-[400px] w-ful'>
      // //     <Flex align='center' justify='center'>
      // //       <Spin tip="Loading" />
      // //     </Flex>
      // //   </div>
      // : 
      <>
        <Modal
          title="Confirm"
          open={openConfirmDelete}
          onOk={() => handleOk(userId)}
          confirmLoading={isLoading}
          onCancel={() => setOpenConfirmDelete(false)}
        >
          <p>Xác nhận xóa người dùng này?</p>
        </Modal>
        <Modal
          title="Confirm"
          open={openFormUpdate}
          // onOk={() => handleOk(userId)}
          // confirmLoading={isLoading}
          onCancel={() => setOpenFormUpdate(false)}
        >
          <p>Xác nhận update người dùng này?</p>
        </Modal>
        <Button type="primary" onClick={() => setOpenModelCreate(true)}>Create New Account +</Button>
        <Table 
          className='border border-gray-200 mt-4'
          bordered={true} 
          loading={isLoading} 
          columns={columns && columns} 
          dataSource={user && renderData(user)} 
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
        <UserFormController openModelCreate={openModelCreate} setOpenModelCreate={setOpenModelCreate}/>
      </>
   
  )
}

export default Members