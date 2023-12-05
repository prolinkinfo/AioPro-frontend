import { Box, Button, Card, Container, Stack, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import AddAdministrator from './Add'
import { apidelete, apiget } from '../../../service/api'
import DeleteModel from '../../../components/Deletemodle'

const Administrator = () => {

    const [administratorList, setAdministratorList] = useState([])
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [id, setId] = useState('')
    const [userAction, setUserAction] = useState(null)

    const handleOpenAdd = () => setIsOpenAdd(true);
    const handleCloseAdd = () => setIsOpenAdd(false);
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
                const handleClickDeleteBtn = async (data) => {
                    setId(data?._id);
                    handleOpenDeleteModel();
                };
                return (
                    <Box>
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteAdministrator} id={id} />
                        <Stack direction={"row"} spacing={2}>
                            <Button variant='outlined' color='error' startIcon={<DeleteIcon />} size='small' onClick={() => handleClickDeleteBtn(params?.row)}> Delete</Button>
                        </Stack>
                    </Box>
                );
            },
        },
        {
            field: 'name', headerName: 'Name', width: 200, cellClassName: 'name-column--cell--capitalize',
        },
        {
            field: 'email', headerName: 'Email', width: 200, cellClassName: 'name-column--cell--capitalize',
        },
        {
            field: 'city',
            headerName: 'City',
            width: 200,
            cellClassName: 'name-column--cell--capitalize',

        },
        {
            field: 'contactNumber',
            headerName: 'Contact',
            width: 200,
        },
        {
            field: 'division',
            headerName: 'Division',
            width: 150,
            cellClassName: 'name-column--cell--capitalize',

        },
        {
            field: 'zone',
            headerName: 'Zone',
            width: 200,
            cellClassName: 'name-column--cell--capitalize',

        },
        {
            field: 'adminType',
            headerName: 'Admin Type',
            width: 200,
            cellClassName: 'name-column--cell--capitalize',

        },
        {
            field: 'status',
            headerName: 'Status',
            width: 100,
            cellClassName: 'name-column--cell--capitalize',
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


    const deleteAdministrator = async (id) => {
        const result = await apidelete(`/api/administrator/${id}`);
        setUserAction(result)
    }


    const fetchAdministratorData = async () => {
        const result = await apiget(`/api/administrator`);
        if (result && result.status === 200) {
            setAdministratorList(result?.data?.result);
        }
    };

    useEffect(() => {
        fetchAdministratorData();
    }, [userAction]);

    return (
        <div>
            {/* Add Administrator */}
            <AddAdministrator isOpen={isOpenAdd} handleClose={handleCloseAdd} fetchAdministratorData={fetchAdministratorData} />
            <Container maxWidth="xl">
                <Typography variant="h4">Administrator's</Typography>
                <TableStyle>
                    <Box width="100%" pt={3}>
                        <Stack direction={"row"} spacing={2} display={"flex"} justifyContent={"space-between"} mb={2}>
                            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                                Add Administrator
                            </Button>
                        </Stack>
                        <Card style={{ height: '72vh', paddingTop: '15px' }}>
                            <DataGrid
                                rows={administratorList}
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

export default Administrator
