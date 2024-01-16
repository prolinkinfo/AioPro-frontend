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
import { fetchDoctorData } from '../../../../redux/slice/GetDoctorSlice';

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
        { Header: 'Doctor Id', accessor: 'doctorId', width: 20 },
        { Header: 'Doctor Code', accessor: 'doctorCode', width: 20 },
        { Header: "Registration Number", accessor: "registrationNumber" },
        { Header: "Doctor Name", accessor: "doctorName" },
        { Header: "City", accessor: "city" },
        { Header: "Hospital Name", accessor: "hospitalName" },
        { Header: "Employee Name", accessor: "employeeName" },
        { Header: "Immediate Senior", accessor: "immediateSenior" },
        { Header: "Contact Number", accessor: "contactNumber" },
        { Header: "Speciality", accessor: "speciality" },
        { Header: "Qualification", accessor: "qualification" },
        { Header: "Division", accessor: "division" },
        { Header: "Category", accessor: "category" },
        { Header: "Zone", accessor: "zone" },
        { Header: "Email", accessor: "email" },
        { Header: "Gender", accessor: "gender" },
        { Header: "Date Of Birth", accessor: "dateOfBirth" },
        { Header: "Anniversary Date", accessor: "anniversaryDate" },
        { Header: "Type", accessor: "type" },
        { Header: "Firm Name", accessor: "firmName" },
        { Header: "Country Name", accessor: "countryName" },
        { Header: "Status", accessor: "status" },
    ];

    const initialValues = {
        doctorId: '',
        doctorCode: '',
        registrationNumber: '',
        doctorName: '',
        city: '',
        hospitalName: '',
        employeeName: '',
        immediateSenior: '',
        contactNumber: '',
        speciality: '',
        qualification: '',
        division: '',
        category: '',
        zone: '',
        email: '',
        gender: '',
        dateOfBirth: '',
        anniversaryDate: '',
        type: '',
        firmName: '',
        countryName: '',
        status: '',
    };

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: (values, { resetForm }) => {
            const Data = importedFileData?.map((item, ind) => {
                console.log(item)
                const dateOfBirth = moment(item[values.dateOfBirth || "dateOfBirth"]);
                const anniversaryDate = moment(item[values.anniversaryDate || "anniversaryDate"]);
                return {
                    doctorId: item[values.doctorId || "doctorId"] || '',
                    registrationNumber: item[values.registrationNumber || "registrationNumber"] || '',
                    doctorName: item[values.doctorName || "doctorName"] || '',
                    city: item[values.city || "city"] || '',
                    hospitalName: item[values.hospitalName || "hospitalName"] || '',
                    employeeName: item[values.employeeName || "employeeName"] || '',
                    immediateSenior: item[values.immediateSenior || "immediateSenior"] || '',
                    contactNumber: item[values.contactNumber || "contactNumber"] || '',
                    speciality: item[values.speciality || "speciality"] || '',
                    qualification: item[values.qualification || "qualification"] || '',
                    division: item[values.division || "division"] || '',
                    category: item[values.category || "category"] || '',
                    zone: item[values.zone || "zone"] || '',
                    email: item[values.email || "email"] || '',
                    gender: item[values.gender || "gender"] || '',
                    dateOfBirth: dateOfBirth.isValid() ? item[values.dateOfBirth || "dateOfBirth"] || '' : '',
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
            const response = await apipost('/api/doctor/addMany', data)
            if (response.status === 200) {
                toast.success(`Doctors imported successfully`)
                resetForm();
                dispatch(fetchDoctorData());
                close();
            }
        } catch (e) {
            console.error(e);
            toast.error(`Doctors import failed`)
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
                console.log(parsedData,"parsedData")

                const fileHeadingFields = Object.keys(parsedData[0]);
                setImportedFileFields(fileHeadingFields);

            } else if (extension === 'xlsx') {
                const data = new Uint8Array(target.result);
                const workbook = new ExcelJS.Workbook();
                await workbook.xlsx.load(data);

                const worksheet = workbook.getWorksheet(1);
                const jsonData = [];

                // Iterate over rows and cells
                worksheet.eachRow({ includeEmpty: true,skipHeader: true }, (row, rowNumber) => {
                    const rowData = {};
                    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                        rowData[worksheet.getCell(1, colNumber).value] = cell.value;
                    });
                    jsonData.push(rowData);
                });
                
                setImportedFileData(jsonData);
                jsonData?.splice(0, 1);
                const fileHeadingFields = Object.keys(jsonData[0]);
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

    console.log(importedFileFields,"importedFileFields")
    console.log(importedFileData,"importedFileData")

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