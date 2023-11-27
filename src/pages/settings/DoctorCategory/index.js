import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddCategory from './Add'
import { apidelete, apiget } from '../../../service/api'
import DeleteModel from '../../../components/Deletemodle'

const DoctorCategory = () => {

    const [categoryList, setCategoryList] = useState([])
    const [userAction,setUserAction] = useState('')
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [id,setId] = useState('')

    const handleOpenAdd = () => setIsOpenAdd(true)
    const handleCloseAdd = () => setIsOpenAdd(false)

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
                    console.log(data, 'data')
                    setId(data?._id)
                };
                return (
                    <Box onClick={() => handleClick(params?.row)}>
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteCategory} id={id} fetchData={fetchCategoryData}/>
                        <Button variant='outlined' color='error' onClick={handleOpenDeleteModel}><DeleteIcon /> Delete</Button>
                    </Box>
                );
            },
        },
        { field: 'categoryName', headerName: 'Category Name', flex: 1 },
        { field: 'minimumPreference', headerName: 'Minimum Preference', flex: 1 },
        { field: 'maximumPreference', headerName: 'Maximum Preference', flex: 1 },
    ];

    const deleteCategory = async(id) => {
        const result = await apidelete(`/api/doctorcategory/${id}`);
        setUserAction(result)
    }

    const fetchCategoryData = async () => {
        const result = await apiget(`/api/doctorcategory`);
        if (result && result.status === 200) {
            setCategoryList(result?.data?.result);
        }
    };

    useEffect(() => {
        fetchCategoryData();
    }, [userAction])

    return (
        <div>
            {/* Add Category */}
            <AddCategory isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchCategoryData={fetchCategoryData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Doctor Category</Typography>

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
                                rows={categoryList}
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

export default DoctorCategory
