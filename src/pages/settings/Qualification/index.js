import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddQualification from './Add';
import EditQualification from './Edit'
import DeleteModel from '../../../components/Deletemodle'
import { apidelete, apiget } from '../../../service/api'

const Qualification = () => {

    const [qualificationList, setQualificationList] = useState([])
    const [qualificationData, setQualificationData] = useState({})
    const [userAction, setUserAction] = useState(null)
    const [id,setId] = useState('')
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
            flex: 1,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClick = async (data) => {
                    setQualificationData(data);
                    handleOpenEdit();
                };
                const handleClickDeleteBtn = async (data) => {
                    setId(data?._id);
                    handleOpenDeleteModel();
                };
                return (
                    <Box>
                        <EditQualification isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchQualificationData={fetchQualificationData} data={qualificationData} />
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteQualification} id={id}/>
                        <Stack direction={"row"} spacing={2}>
                            <Button variant='outlined' startIcon={<EditIcon />} size='small' onClick={() => handleClick(params?.row)}> Edit</Button>
                            <Button variant='outlined' color='error' startIcon={<DeleteIcon />} size='small' onClick={() => handleClickDeleteBtn(params?.row)}> Delete</Button>
                        </Stack>
                    </Box>
                );
            },
        },
        { field: 'qualification', headerName: 'Qualification', flex: 1, cellClassName: 'name-column--cell--capitalize', },
        { field: 'fullName', headerName: 'Full Name', flex: 1, cellClassName: 'name-column--cell--capitalize', },
    ];

    const deleteQualification = async (id) => {
        const result = await apidelete(`/api/qualification/${id}`);
        setUserAction(result)
    }

    const fetchQualificationData = async () => {
        const result = await apiget(`/api/qualification`);
        if (result && result.status === 200) {
            setQualificationList(result?.data?.result);
        }
    };

    useEffect(() => {
        fetchQualificationData();
    }, [userAction])

    return (
        <div>
            {/* Add Qualification */}
            <AddQualification isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchQualificationData={fetchQualificationData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Qualification</Typography>

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
                                rows={qualificationList}
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

export default Qualification
