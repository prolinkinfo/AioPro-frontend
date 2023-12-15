import { useEffect, useState } from 'react';
import { Card, Stack, Button, Container, Typography, Box, TextField, Autocomplete, Grid } from '@mui/material';
import { DataGrid, GridToolbar, GridToolbarContainer, nbNO } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import MapIcon from '@mui/icons-material/Map';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Iconify from '../../../components/iconify';
import TableStyle from '../../../components/TableStyle';
import AddHoliday from './Add'
import Edit from './Edit';
import { apidelete, apiget } from '../../../service/api';
import DeleteModel from '../../../components/Deletemodle'

// ----------------------------------------------------------------------

const Holiday = () => {
    const [holidayList, setHolidayList] = useState([])

    const [holidayData, setHolidayData] = useState('')
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [id, setId] = useState('')
    const [userAction, setUserAction] = useState(null)
  
    const handleOpenAdd = () => setIsOpenAdd(true);
    const handleCloseAdd = () => setIsOpenAdd(false);
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
                    setHolidayData(data);
                    handleOpenEdit();
                };

                const handleClickDeleteBtn = async (data) => {
                    setId(data?._id);
                    handleOpenDeleteModel();
                };
                return (
                    <Box>
                        <Edit isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchHolidayData={fetchHolidayData} data={holidayData} />
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteHolidayData} id={id} />

                        <Stack direction={"row"} spacing={2}>
                            <Button variant='outlined' startIcon={<EditIcon />} size='small' onClick={() => handleClick(params?.row)}> Edit</Button>
                            <Button variant='outlined' color='error' startIcon={<DeleteIcon />} size='small' onClick={() => handleClickDeleteBtn(params?.row)}> Delete</Button>
                        </Stack>
                    </Box>
                );
            },
        },
        {
            field: 'zone',
            headerName: 'Zone',
            cellClassName: 'name-column--cell--capitalize',
            flex: 1
        },
        {
            field: 'holidayDate',
            headerName: 'Date',
            flex: 1,
            valueFormatter: (params) => {
                return moment(params.value).format('MM/DD/YYYY');
            },
        },
        {
            field: 'holidayName',
            headerName: 'Occasion',
            cellClassName: 'name-column--cell--capitalize',
            flex: 1
        },
    ];


    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: '12 Angry Men', year: 1957 },
        { label: "Schindler's List", year: 1993 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
        { label: 'Pulp Fiction', year: 1994 },
    ]

    const deleteHolidayData = async (id) => {
        const result = await apidelete(`/api/holidaycalendar/${id}`);
        setUserAction(result)
      }
    

    const fetchHolidayData = async () => {
        const result = await apiget(`/api/holidaycalendar`);
        if (result && result.status === 200) {
            setHolidayList(result?.data?.result);
        }
    };

    useEffect(() => {
        fetchHolidayData();
    }, [userAction]);

    return (
        <>
            <AddHoliday isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchHolidayData={fetchHolidayData} />

            <Stack direction="row" alignItems="center" justifyContent="end">
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                    Add new
                </Button>
            </Stack>
            <TableStyle>
                <Box width="100%" pt={3}>
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} py={2}>
                        <Grid item xs={12} sm={3} md={3}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={top100Films}
                                size='small'
                                renderInput={(params) => <TextField {...params} style={{ fontSize: "12px" }} placeholder='Select Zone' />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={9} md={9} display={"flex"} justifyContent={"end"}>
                            <TextField
                                type='text'
                                size='small'
                                placeholder='Search'
                            />
                            <Button variant='contained' style={{ marginLeft: "10px" }}>Go</Button>
                        </Grid>
                    </Grid>

                    <Card style={{ height: '72vh' }}>
                        <DataGrid
                            rows={holidayList}
                            columns={columns}
                            getRowId={(row) => row._id}
                        />
                    </Card>
                </Box>
            </TableStyle>
        </>
    );
};

export default Holiday