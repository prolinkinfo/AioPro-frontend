/* eslint-disable camelcase */
/* eslint-disable prefer-template */
/* eslint-disable no-plusplus */
import { Autocomplete, Box, Button, Card, Container, Grid, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { DataGrid, nbNO } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx'
import TableStyle from '../../../components/TableStyle'
import Iconify from '../../../components/iconify'
import ActionBtn from '../../../components/actionbtn/ActionBtn'
import AddSpeciality from './Add'
import { apidelete, apiget } from '../../../service/api'
import DeleteModel from '../../../components/Deletemodle'
import EditDoctorSpeciality from './Edit'
import { fetchDivisionData } from '../../../redux/slice/GetDivisionSlice';
import { fetchDoctorSpecialityData } from '../../../redux/slice/GetDoctorSpecialitySlice';
import CustomMenu from '../../../components/CustomMenu';
import ImportFileModel from './components/ImportFileModel';
import Doctor_Speciality_SamFile from '../../../assets/files/doctor_speciality_samFile.xlsx'

const DoctorSpeciality = () => {

    const [specialityList, setSpecialityList] = useState([])

    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)
    const [isOpenImport, setisOpenImport] = useState(false);

    const [specialityData, setSpecialityData] = useState('')
    const [id, setId] = useState('')
    const [userAction, setUserAction] = useState(null)
    const dispatch = useDispatch();
    const handleOpenAdd = () => setIsOpenAdd(true);
    const handleCloseAdd = () => setIsOpenAdd(false);
    const handleOpenEdit = () => setIsOpenEdit(true)
    const handleCloseEdit = () => setIsOpenEdit(false)
    const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
    const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);

    const doctorspeciality = useSelector((state) => state?.getDoctorSpeciality?.data)
    const divisionList = useSelector((state) => state?.getDivision?.data)

    const columns = [
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            width: 100,
            // eslint-disable-next-line arrow-body-style
            renderCell: (params) => {
                const handleClick = async (data, e) => {
                    setAnchorEl(e.currentTarget);
                    setSpecialityData(data)
                    setId(data?._id)
                };
                return (
                    <Box>
                        <EditDoctorSpeciality isOpenEdit={isOpenEdit} handleCloseEdit={handleCloseEdit} fetchDoctorSpecialityData={fetchDoctorSpecialityData} data={specialityData} />
                        <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} deleteData={deleteSpeciality} id={id} />

                        <CustomMenu
                            open={open}
                            handleClick={handleClick}
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                            handleOpenEdit={handleOpenEdit}
                            params={params}
                            handleOpenDeleteModel={handleOpenDeleteModel}
                        />
                    </Box>
                );
            },
        },
        { field: 'divisionName', headerName: 'Division Name', flex: 1, cellClassName: 'name-column--cell--capitalize' },
        { field: 'specialityName', headerName: 'Speciality Name', flex: 1, cellClassName: 'name-column--cell--capitalize' },
        { field: 'group', headerName: 'Group', flex: 1, cellClassName: 'name-column--cell--capitalize' }, 0
    ];

    const csvColumns = [
        { Header: "Division Name", accessor: "divisionName" },
        { Header: "Speciality Name", accessor: "specialityName" },
        { Header: "Group", accessor: "group" }
    ];


    const downloadExcel = () => {
        const AllRecords = specialityList?.map((rec) => {
            const selectedFieldsData = {};
            csvColumns.forEach((item) => {
                const accessor = item.accessor;
                // Check if the accessor has nested properties
                if (accessor.includes('.')) {
                    const nestedProperties = accessor.split('.');
                    let nestedValue = rec;
                    nestedProperties.forEach((prop) => {
                        nestedValue = nestedValue?.[prop];
                    });
                    selectedFieldsData[accessor] = nestedValue;
                } else {
                    selectedFieldsData[accessor] = rec[accessor];
                }
            });
            return selectedFieldsData;
        });
        convertJsonToExcel(AllRecords, csvColumns, 'doctor_speciality');
    };

    const convertJsonToExcel = (jsonArray, csvColumns, fileName) => {
        const csvHeader = csvColumns.map((col) => col.Header);
        const csvContent = [
            csvHeader,
            ...jsonArray.map((row) => csvColumns.map((col) => row[col.accessor])),
        ];

        const ws = XLSX.utils.aoa_to_sheet(csvContent);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

        // Auto-size columns
        const colWidths = csvContent[0].map((col, i) => {
            return {
                wch: Math.max(...csvContent.map((row) => row[i].toString().length)),
            };
        });
        ws['!cols'] = colWidths;

        XLSX.writeFile(wb, `${fileName}.xlsx`);
    };

    const downloadSamFile = () => {
        window.open(Doctor_Speciality_SamFile)
    }


    const deleteSpeciality = async (id) => {
        const result = await apidelete(`/api/doctorspeciality/${id}`);
        setUserAction(result)
    }

    const fetchData = async (e) => {
        const searchText = e?.target?.value;
        const filtered = doctorspeciality?.filter(({ specialityName, divisionName, group }) =>
            specialityName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            divisionName?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            group?.toLowerCase()?.includes(searchText?.toLowerCase())
        )
        setSpecialityList(searchText?.length > 0 ? (filtered?.length > 0 ? filtered : []) : doctorspeciality)
    };

    const filterByDivision = (dName) => {
        const filtered = doctorspeciality?.filter(({ divisionName }) =>
            divisionName?.toLowerCase()?.includes(dName?.toLowerCase())
        );
        setSpecialityList(dName?.length > 0 ? (filtered?.length > 0 ? filtered : []) : doctorspeciality)
    }


    useEffect(() => {
        dispatch(fetchDoctorSpecialityData());
        dispatch(fetchDivisionData());
    }, [userAction])


    useEffect(() => {
        fetchData();
    }, [doctorspeciality])

    return (
        <div>

            {/* import File */}
            <ImportFileModel isOpenImport={isOpenImport} close={() => setisOpenImport(false)} />

            {/* Add Speciality */}
            <AddSpeciality isOpenAdd={isOpenAdd} handleCloseAdd={handleCloseAdd} fetchDoctorSpecialityData={fetchDoctorSpecialityData} />

            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Doctor Speciality</Typography>
                </Stack>
                <TableStyle>
                    <Box width="100%" pt={3}>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} mb={2}>
                            <Grid item xs={12} sm={12} md={12}>
                                <Box display={"flex"} justifyContent={"space-between"}>
                                    <Box>
                                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
                                            Add New
                                        </Button>
                                        <Button variant="contained" startIcon={<Iconify icon="bxs:file-export" />} style={{ marginLeft: '10px' }} onClick={downloadExcel}>
                                            Export
                                        </Button>
                                    </Box>
                                    <Stack direction={"row"} spacing={2}>
                                        <Tooltip title="Upload File" arrow>
                                            <Button variant='contained' startIcon={<Iconify icon="clarity:import-solid" />} onClick={() => setisOpenImport(true)}>
                                                Import
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="Download Sample File" arrow>
                                            <Button variant='contained' startIcon={<Iconify icon="lucide:download" />} onClick={downloadSamFile}>
                                                Download
                                            </Button>
                                        </Tooltip>
                                    </Stack>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Stack direction={"row"} spacing={2} display={"flex"} justifyContent={"space-between"}>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={divisionList}
                                        size='small'
                                        sx={{ width: 300 }}
                                        onChange={(event, newValue) => {
                                            filterByDivision(newValue ? newValue.divisionName : "")
                                        }}
                                        getOptionLabel={(division) => division?.divisionName}
                                        renderInput={(params) => <TextField {...params} placeholder='Filter By Division' style={{ fontSize: "12px" }} />}
                                    />
                                    <TextField
                                        type='text'
                                        size='small'
                                        placeholder='Search'
                                        // style={{ width: "300px" }}
                                        onChange={fetchData}
                                    />
                                </Stack>
                            </Grid>
                        </Grid>
                        <Card style={{ height: '72vh' }}>
                            <DataGrid
                                rows={specialityList}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 10 },
                                    },
                                }}
                                pageSizeOptions={[5, 10, 25, 50]}
                                getRowId={row => row._id}
                            />
                        </Card>
                    </Box>
                </TableStyle>
            </Container>
        </div>
    )
}

export default DoctorSpeciality
