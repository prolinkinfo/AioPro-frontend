/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { ClearIcon } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Papa from 'papaparse';
import ExcelJS from 'exceljs';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { apipost } from '../../../../service/api';
import { fetchfirmData } from '../../../../redux/slice/GetFirmSlice';

// eslint-disable-next-line arrow-body-style
const FieldSelectModel = ({ open, close, fileData }) => {
    const [importedFileFields, setImportedFileFields] = useState([]);
    const [importedFileData, setImportedFileData] = useState([]);
    const dispatch = useDispatch();

    const columns = [
        { Header: 'Fields In Crm', accessor: 'crmFields' },
        { Header: 'Fields In File', accessor: 'fileFields' },
    ];

    const fieldsInCrm = [
        { Header: 'Firm Id', accessor: 'firmId', width: 20 },
        { Header: 'Date', accessor: 'date', width: 20 },
        { Header: "Firm Code", accessor: "firmCode" },
        { Header: "Firm Name", accessor: "firmName" },
        { Header: "Firm Type", accessor: "firmType" },
        { Header: "Contact Number", accessor: "contactNumber" },
        { Header: "Contact Person Name", accessor: "contactPersonName" },
        { Header: "City", accessor: "city" },
        { Header: "Zone", accessor: "zone" },
        { Header: "Division", accessor: "division" },
        { Header: "Assigned Employee", accessor: "assignedEmployee" },
        { Header: "Assigned Firm", accessor: "assignedFirm" },
        { Header: "Email", accessor: "email" },
        { Header: "Address", accessor: "address" },
        { Header: "First Level Manager", accessor: "firstLevelManager" },
        { Header: "Second Level Manager", accessor: "secondLevelManager" },
        { Header: "Third Level Manager", accessor: "thirdLevelManager" },
        { Header: "Date of Birth", accessor: "dateofBirth" },
        { Header: "Pan Number", accessor: "panNumber" },
        { Header: "Drug License Number", accessor: "drugLicenseNumber" },
        { Header: "Food License Number", accessor: "foodLicenseNumber" },
        { Header: "Status", accessor: "status" },
    ];

    const initialValues = {
        firmId: '',
        date: '',
        firmCode: '',
        firmName: '',
        firmType: '',
        contactNumber: '',
        contactPersonName: '',
        city: '',
        zone: '',
        division: '',
        assignedEmployee: '',
        assignedFirm: '',
        email: '',
        address: '',
        firstLevelManager: '',
        secondLevelManager: '',
        thirdLevelManager: '',
        dateofBirth: '',
        panNumber: '',
        drugLicenseNumber: '',
        foodLicenseNumber: '',
        status: '',
    };

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: (values, { resetForm }) => {
            const Data = importedFileData?.map((item, ind) => {
                console.log(item)
                const date = moment(item[values.date || "date"]);
                const dateofBirth = moment(item[values.dateofBirth || "dateofBirth"]);
                return {
                    firmId: item[values.firmId || "firmId"] || '',
                    date: date.isValid() ? item[values.date || "date"] || '' : '',
                    firmCode: item[values.firmCode || "firmCode"] || '',
                    firmName: item[values.firmName || "firmName"] || '',
                    firmType: item[values.firmType || "firmType"] || '',
                    contactNumber: item[values.contactNumber || "contactNumber"] || '',
                    contactPersonName: item[values.contactPersonName || "contactPersonName"] || '',
                    city: item[values.city || "city"] || '',
                    zone: item[values.zone || "zone"] || '',
                    division: item[values.division || "division"] || '',
                    assignedEmployee: item[values.assignedEmployee || "assignedEmployee"] || '',
                    assignedFirm: item[values.assignedFirm || "assignedFirm"] || '',
                    email: item[values.email || "email"] || '',
                    address: item[values.address || "address"] || '',
                    firstLevelManager: item[values.firstLevelManager || "firstLevelManager"] || '',
                    secondLevelManager: item[values.secondLevelManager || "secondLevelManager"] || '',
                    thirdLevelManager: item[values.thirdLevelManager || "thirdLevelManager"] || '',
                    dateofBirth: dateofBirth.isValid() ? item[values.dateofBirth || "dateofBirth"] || '' : '',
                    panNumber: item[values.panNumber || "panNumber"] || '',
                    drugLicenseNumber: item[values.drugLicenseNumber || "drugLicenseNumber"] || '',
                    foodLicenseNumber: item[values.foodLicenseNumber || "foodLicenseNumber"] || '',
                    status: item[values.status || "status"] || '',
                    createdDate: new Date()
                }
            });
            AddData(Data);
        }
    })
    const { errors, touched, values, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm } = formik


    const AddData = async (data) => {
        try {
            const response = await apipost('/api/firm/addMany', data)
            if (response.status === 200) {
                toast.success(`File imported successfully`)
                resetForm();
                dispatch(fetchfirmData());
                close();
            }
        } catch (e) {
            console.error(e);
            toast.error(`File import failed`)
            resetForm();
        }

    };

    const parseFileData = async (file) => {
        const reader = new FileReader();
        const extension = file.name.split('.').pop().toLowerCase();
        reader.onload = async ({ target }) => {

            if (extension === 'csv') {
                const csv = Papa.parse(target.result, {
                    header: true,
                });
                const parsedData = csv?.data;
                setImportedFileData(parsedData);    
                const fileHeadingFields = parsedData.length > 0 ? Object.keys(parsedData[0]) : [];
                setImportedFileFields(fileHeadingFields);
    
            } else if (extension === 'xlsx') {
                const data = new Uint8Array(target.result);
                const workbook = new ExcelJS.Workbook();
                await workbook.xlsx.load(data);
    
                const worksheet = workbook.getWorksheet(1);
                const jsonData = [];
    
                // Iterate over rows and cells
                worksheet?.eachRow({ includeEmpty: true, skipHeader: true }, (row, rowNumber) => {
                    const rowData = {};
                    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                        rowData[worksheet.getCell(1, colNumber).value] = cell.value;
                    });
                    jsonData.push(rowData);
                });
    
                setImportedFileData(jsonData);
                jsonData?.splice(0, 1);
                const fileHeadingFields = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];
                setImportedFileFields(fileHeadingFields);
            }
        };

        if (extension === 'csv') {
            reader.readAsText(file);
        } else if (extension === 'xlsx') {
            const blob = new Blob([file]);
            reader.readAsArrayBuffer(blob);
        }
    };


    useEffect(() => {
        if (fileData) {
            parseFileData(fileData);
        }
    }, [fileData]);

    return (
        <div>
            <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description" className='select-dialog'>
                <DialogTitle
                    id="scroll-dialog-title"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h6">Select Match Fields</Typography>
                    <Typography>
                        <ClearIcon onClick={close} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers style={{ maxWidth: "700px" }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {
                                        columns.map((column, index) => (
                                            <TableCell key={index} >
                                                <Box
                                                    justify="space-between"
                                                    align="center"
                                                    fontSize={{ sm: "14px", lg: "16px" }}
                                                    color=" secondaryGray.900"
                                                >
                                                    <span style={{ textTransform: "uppercase" }}>
                                                        {column.Header}
                                                    </span>
                                                </Box>
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    fieldsInCrm?.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.Header}</TableCell>
                                            <TableCell>
                                                <FormControl fullWidth>
                                                    <Autocomplete
                                                        size="small"
                                                        name=""
                                                        onChange={(event, newValue) => {
                                                            formik.setFieldValue(`${item.accessor}`, newValue || '');
                                                        }}
                                                        fullWidth
                                                        options={importedFileFields}
                                                        getOptionSelected={(option, value) => option === values[item.accessor]}
                                                        getOptionLabel={(field) => field}
                                                        value={values[item.accessor] || null}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                style={{ textTransform: 'capitalize' }}
                                                                placeholder="Select Field"
                                                            />
                                                        )}
                                                    />
                                                </FormControl>
                                            </TableCell>

                                        </TableRow>
                                    ))
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        variant="contained"
                        style={{ textTransform: 'capitalize' }}
                        color="secondary"
                        onClick={handleSubmit}
                    >
                        Save
                    </Button>
                    <Button
                        type="reset"
                        variant="outlined"
                        style={{ textTransform: 'capitalize' }}
                        color="error"
                        onClick={() => {
                            close();
                            resetForm();
                        }
                        }
                    >
                        Cancle
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

export default FieldSelectModel