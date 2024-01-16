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
import { fetchBackDateVisitData } from '../../../../redux/slice/GetBackDateVisitSlice';

// eslint-disable-next-line arrow-body-style
const BackDateVisitModel = ({ open, close, fileData }) => {
    const [importedFileFields, setImportedFileFields] = useState([]);
    const [importedFileData, setImportedFileData] = useState([]);
    const dispatch = useDispatch();

    const columns = [
        { Header: 'Fields In Crm', accessor: 'crmFields' },
        { Header: 'Fields In File', accessor: 'fileFields' },
    ];

    const fieldsInCrm = [
        { Header: 'Employee Name', accessor: 'employeeName', width: 20 },
        { Header: "From Date", accessor: "fromDate" },
        { Header: "To Date", accessor: "toDate" },
        { Header: "Deadline", accessor: "deadline" },
    ];

    const initialValues = {
        employeeName: '',
        fromDate: '',
        toDate: '',
        deadline: '',
        createdDate: ''
    };

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: (values, { resetForm }) => {
            const Data = importedFileData?.map((item, ind) => {

                const fromDate = moment(item[values.fromDate || "fromDate"]);
                const toDate = moment(item[values.toDate || "toDate"]);
                const deadline = moment(item[values.deadline || "deadline"]);
                return {
                    employeeName: item[values.employeeName || "employeeName"] || '',
                    fromDate: fromDate.isValid() ? item[values.fromDate || "fromDate"] || '' : '',
                    toDate: toDate.isValid() ? item[values.toDate || "toDate"] || '' : '',
                    deadline: deadline.isValid() ? item[values.deadline || "deadline"] || '' : '',
                    createdDate: new Date()
                }
            });
            AddData(Data);
        }
    })
    const { errors, touched, values, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm } = formik


    const AddData = async (visit) => {
        try {
            const response = await apipost('/api/backDateVisit/addMany', visit)
            if (response.status === 200) {
                toast.success(`BackDate Visit imported successfully`)
                resetForm();
                dispatch(fetchBackDateVisitData());
                close();
            }
        } catch (e) {
            console.error(e);
            toast.error(`BackDate Visit import failed`)
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

                const fileHeadingFields = Object.keys(parsedData[0]);
                setImportedFileFields(fileHeadingFields);

            } else if (extension === 'xlsx') {
                const data = new Uint8Array(target.result);
                const workbook = new ExcelJS.Workbook();

                console.log(workbook,"workbook")

                await workbook.xlsx.load(data);

                const worksheet = workbook.getWorksheet(1);
                const jsonData = [];

                // Iterate over rows and cells
                worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
                    const rowData = {};
                    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                        rowData[worksheet.getCell(1, colNumber).value] = cell.value;
                    });
                    jsonData.push(rowData);
                });


                setImportedFileData(jsonData);

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

export default BackDateVisitModel