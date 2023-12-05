import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddPromotionalGift from './Add';
import EditCollectionCenter from './Edit'
import DeleteModel from '../../../components/Deletemodle'
import { apidelete, apiget } from '../../../service/api'

const PromotionalGifts = () => {

    const [promotionalGiftList, setPromotionalGiftList] = useState([])
    const [promotionalGiftData, setpromotionalGiftData] = useState({})
    const [userAction, setUserAction] = useState(null)
    const [id, setId] = useState('')
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)

    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)

    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)

    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

    const columns = [
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            width: 200,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClick = async (data) => {
                    setpromotionalGiftData(data);
                    handleOpenEdit();
                };
                const handleClickDeleteBtn = async (data) => {
                    setId(data?._id);
                    handleOpenDeleteModel();
                };
                return (
                    <Box>
                        <EditCollectionCenter isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchPromotionalGiftsData={fetchPromotionalGiftsData} data={promotionalGiftData} />
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteGroup} id={id} />
                        <Stack direction={"row"} spacing={2}>
                            <Button variant='outlined' startIcon={<EditIcon />} size='small' onClick={() => handleClick(params?.row)}> Edit</Button>
                            <Button variant='outlined' color='error' startIcon={<DeleteIcon />} size='small' onClick={() => handleClickDeleteBtn(params?.row)}> Delete</Button>
                        </Stack>
                    </Box>
                );
            },
        },
        { field: 'divisionName', headerName: 'Division Name', width: 200 },
        { field: 'employeeName', headerName: 'Employee Name', width: 200 },
        { field: 'giftName', headerName: 'Gift Name', width: 200 },
        { field: 'quantity', headerName: 'Quantity', width: 200 },
        { field: 'remaining', headerName: 'Remaining', width: 200 },
        {
            field: 'status',
            headerName: 'Status',
            width: 200,
            renderCell: (params) => 
                // const chengStatus = async(data) => {
                //   const pyload = {
                //     _id: data?._id,
                //     status: data?.status === "active" ? "deactive" : data?.status === "deactive" ? "active" : "",
                //   }
                //   const result = await apiput(`/api/users/changeStatus`, pyload);
                //   if (result && result.status === 200) {
                //     fetchdata();
                //   }
                // };
                 (
                  <Box>
                    <Button
                      variant="outlined"
                      style={{
                        color: params.value === 'active' ? '#22C55E' : '#B61D18',
                        background: params.value === 'active' ? '#22c55e29' : '#ff563029',
                        border: 'none',
                      }}
                      
                    >
                      {params.value}
                    </Button>
                  </Box>
                )
              ,
        },
    ];

    const deleteGroup = async (id) => {
        const result = await apidelete(`/api/promotionalGift/${id}`);
        setUserAction(result)
    }

    const fetchPromotionalGiftsData = async () => {
        const result = await apiget(`/api/promotionalGift`);
        if (result && result.status === 200) {
            setPromotionalGiftList(result?.data?.result);
        }
    };

    useEffect(() => {
        fetchPromotionalGiftsData();
    }, [userAction])

    return (
        <div>
            {/* Add Promotional Gift */}
            <AddPromotionalGift isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchPromotionalGiftsData={fetchPromotionalGiftsData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Promotional Gifts</Typography>

                </Stack>
                <TableStyle>
                    <Box width="100%" pt={3}>
                        <Stack direction={"row"} spacing={2} display={"flex"} justifyContent={"space-between"} mb={2}>
                            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                                Add New
                            </Button>
                            <TextField
                                type='text'
                                size='small'
                                placeholder='Search'
                            />
                        </Stack>
                        <Card style={{ height: '72vh' }}>
                            <DataGrid
                                rows={promotionalGiftList}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                getRowId={row => row._id}
                            />
                        </Card>
                    </Box>
                </TableStyle>
            </Container>
        </div>
    )
}

export default PromotionalGifts
