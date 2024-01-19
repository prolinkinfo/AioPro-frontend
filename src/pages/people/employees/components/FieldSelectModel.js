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
import { fetchEmployeeData } from '../../../../redux/slice/GetEmployeeSlice';

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
        { Header: "Employees Code", accessor: "employeesCode" },
        { Header: "First Name", accessor: "firstName" },
        { Header: "Surname", accessor: "surname" },
        { Header: "Email", accessor: "email" },
        { Header: "Contact", accessor: "primaryContact" },
        { Header: "City", accessor: "city" },
        { Header: "State", accessor: "state" },
        { Header: "Zone", accessor: "zone" },
        { Header: "EX-STATION", accessor: "exStations" },
        { Header: "OUT-STATION", accessor: "outStations" },
        { Header: "Division", accessor: "division" },
        { Header: "Designation", accessor: "designation" },
        { Header: "Daily Work Hours", accessor: "dailyWorkHours" },
        { Header: "Gender", accessor: "gender" },
        { Header: "Assigned To", accessor: "assignedTo" },
        { Header: "Aadhar Number", accessor: "aadharNumber" },
        { Header: "License Number", accessor: "driverLicenseNumber" },
        { Header: "Marital Status", accessor: "maritalStatus" },
        { Header: "Blood Group", accessor: "bloodGroup" },
        { Header: "Home Location", accessor: "homeLocation" },
        { Header: "DA HEAD QUARTER", accessor: "DA_HO" },
        { Header: "DA EX STATION", accessor: "DA_EX" },
        { Header: "DA OUT STATION", accessor: "DA_OUT" },
        { Header: "DA INTRANSIT", accessor: "DA_TRANSIT" },
        { Header: "DA OTHER", accessor: "DA_OTHER" },
        { Header: "Work type", accessor: "workType" },
        { Header: "Country", accessor: "country" },
        { Header: "Date of birth", accessor: "Dob" },
    ];

    const initialValues = {
        employeesCode: '',
        firstName: '',
        surname: '',
        email: '',
        primaryContact: '',
        city: '',
        state: '',
        contactNumber: '',
        zone: '',
        exStations: '',
        outStations: '',
        division: '',
        designation: '',
        dailyWorkHours: '',
        gender: '',
        aadharNumber: '',
        driverLicenseNumber: '',
        maritalStatus: '',
        bloodGroup: '',
        homeLocation: '',
        DA_HO: '',
        DA_EX: '',
        DA_OUT: '',
        DA_TRANSIT: '',
        DA_OTHER: '',
        workType: '',
        country: '',
        Dob: '',
    };

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: (values, { resetForm }) => {
            const Data = importedFileData?.map((item, ind) => {
                console.log(item)
                const Dob = moment(item[values.Dob || "Dob"]);
                const anniversaryDate = moment(item[values.anniversaryDate || "anniversaryDate"]);
                return {
                    employeesCode: item[values.employeesCode || "employeesCode"] || '',
                    firstName: item[values.firstName || "firstName"] || '',
                    surname: item[values.surname || "surname"] || '',
                    email: item[values.email || "email"] || '',
                    primaryContact: item[values.primaryContact || "primaryContact"] || '',
                    city: item[values.city || "city"] || '',
                    state: item[values.state || "state"] || '',
                    contactNumber: item[values.contactNumber || "contactNumber"] || '',
                    zone: item[values.zone || "zone"] || '',
                    exStations: item[values.exStations || "exStations"] || '',
                    outStations: item[values.outStations || "outStations"] || '',
                    division: item[values.division || "division"] || '',
                    designation: item[values.designation || "designation"] || '',
                    dailyWorkHours: item[values.dailyWorkHours || "dailyWorkHours"] || '',
                    gender: item[values.gender || "gender"] || '',
                    Dob: Dob.isValid() ? item[values.Dob || "Dob"] || '' : '',
                    anniversaryDate: anniversaryDate.isValid() ? item[values.anniversaryDate || "anniversaryDate"] || '' : '',
                    type: item[values.type || "type"] || '',
                    firmName: item[values.firmName || "firmName"] || '',
                    countryName: item[values.countryName || "countryName"] || '',
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
            const response = await apipost('/api/employees/addMany', data)
            if (response.status === 200) {
                toast.success(`File imported successfully`)
                resetForm();
                dispatch(fetchEmployeeData());
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

    console.log(importedFileFields, "importedFileFields")
    console.log(importedFileData, "importedFileData")

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