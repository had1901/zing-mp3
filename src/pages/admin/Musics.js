import React, { useEffect, useState } from 'react'
import { Space, Table, Modal, Button  } from 'antd';
import instance from '../../service/config';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import UserFormController from '../../components/admin/UserFormController';
import { Pagination } from 'antd'



function Music() {
  const [listMusic, setListMusic] = useState([])

  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const [isLoadingCreate, setIsLoadingCreate] = useState(false)
  const [isLoadingEdit, setIsLoadingEdit] = useState(false)
  const [isLoadingTable, setIsLoadingTable] = useState(true)

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
  const [openModelFormCreate, setOpenModelFormCreate] = useState(false)
  const [openModelFormEdit, setOpenModelFormEdit] = useState(false)

  const [musicId, setMusicId] = useState(null)
  const [dataForm, setDataForm] = useState({})

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // delete 
  const handleDelete = async (musicId) => {
    if(musicId) {
      setIsLoadingTable(true)
      setIsLoadingDelete(true)
      try{
        const deletedMusic = await instance.delete(`/music/delete/${musicId}`)
        console.log('deletedMusic', deletedMusic)
        if(deletedMusic.ec === 0) {
          toast.info('Deleted successfully')
          fetchList()
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

  // update 
  const onSubmitEdit = async (data, musicId) => {
    console.log('musicId', musicId)
    if(musicId) {
      try{
        const updateMusic = await instance.put(`/music/update/${musicId}`, data)
        console.log('updateMusic', updateMusic)
        if(updateMusic.ec === 0) {
          fetchList()
          toast.success('Update successfully')
          setIsLoadingTable(false)
          setOpenModelFormEdit(false)
        }
      } catch(e){
        console.error(e)
      }
    }
  }
  const handleEdit = async (data) => {
    await onSubmitEdit(data,musicId)
  }

  // create new 
  const handleCreate = async (data) => {
    setIsLoadingCreate(true)
    try{
      const createMusic = await instance.post(`/music/create/`, data)
      console.log('create-music', createMusic)
      if(createMusic.ec === 0) {
        toast.success('Created successfully')
        fetchList()
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

  // get all 
  const fetchList = async () => {
    setIsLoadingTable(true)
    try{
      const res = await instance.get('/music/list')
      if(res.ec === 0){
        setListMusic(res.dt)
        setIsLoadingTable(false)
      }
    } catch(e){
      console.log(e)
    }
  }


  // render column table and list 
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => (
        <Space size="middle">
          <span className='font-semibold'>{record.title}</span>
        </Space>
      ),
    },
    {
      title: 'Artist',
      dataIndex: 'artist',
      key: 'artist',
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
      render: (_, record) => (
        <Space size="middle">
           <span className=''>{record.genre}</span>
        </Space>
      ),
      width: 80,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (_, record) => (
        <Space size="middle">
           <span className=''>{record.duration}</span>
        </Space>
      ),
      width: 80,
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (_, record) => (
        <Space size="middle">
           <span className=''>{record.thumbnail}</span>
        </Space>
      ),
    },
    {
      title: 'ReleaseDate',
      dataIndex: 'releaseDate',
      key: 'releaseDate',
      render: (_, record) => (
        <Space size="middle">
           <span className=''>{record.releaseDate}</span>
        </Space>
      ),
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      render: (_, record) => (
        <Space size="middle">
           <span className=''>{record.url}</span>
        </Space>
      ),
    },
    {
      title: 'Actions',      
      key: 'actions',
      render: (_, record) => {
        console.log('record-music', record)
        return <Space key={record.key} size="middle">
          {record.permission === 'admin' 
            ? null 
            : record.actions.length > 0 && record.actions.map(btn => (
                btn === 'Delete'
                ? <button 
                  onClick={() => {
                    setOpenConfirmDelete(true)
                    setMusicId(record.id)
                  }} 
                  className={`${btn === 'Delete' ? 'border-red-500 text-red-500 hover:bg-red-500' : 'border-purple-500 text-purple-500 hover:bg-purple-500'} border py-1 px-3 rounded-md hover:text-white`}>{btn}</button>
                : <button 
                  onClick={() => {
                    setOpenModelFormEdit(true)
                    setMusicId(record.id)
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
  const renderData = (listMusic) => {
    const data =  listMusic.map((item, index )=> {
      return {
          key: index,
          id: item.id,
          album: item.album,
          albumId: item.albumId,
          artist: item.artist,
          artistId: item.artistId,
          composer: item.composer,
          duration: item.duration,
          genre: item.genre,
          genreId: item.genreId,
          releaseDate: item.releaseDate,
          thumbnail: item.thumbnail,
          title: item.title,
          url: item.url,
          url_mp4: item.url_mp4,
          actions: ['Edit', 'Delete'],
        }
    })
    return data
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
      <>
        <Modal
          title="Confirm"
          open={openConfirmDelete}
          onOk={() => handleDelete(musicId)}
          confirmLoading={isLoadingDelete}
          onCancel={() => setOpenConfirmDelete(false)}
        >
          <p>Xác nhận xóa bài hát này?</p>
        </Modal>

        <Button type="primary" onClick={() => setOpenModelFormCreate(true)}>Create New</Button>
        <Table 
          sortDirections
          className='border border-gray-200 mt-4'
          bordered={true} 
          loading={isLoadingTable} 
          columns={columns && columns} 
          dataSource={listMusic && renderData(listMusic)} 
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
            isForm='Music'
            title='Update'
            openModelForm={openModelFormEdit} 
            setOpenModelForm={setOpenModelFormEdit} 
            handle={handleEdit} 
            dataForm={dataForm} 
            setDataForm={setDataForm}
            loadingBtn={isLoadingEdit}
        />
        <UserFormController 
            isForm='Music'
            title='Create'
            openModelForm={openModelFormCreate} 
            setOpenModelForm={setOpenModelFormCreate} 
            dataForm={dataForm} 
            handle={handleCreate} 
            loadingBtn={isLoadingCreate}
        /> 
      </>
      
   
  )
}

export default Music