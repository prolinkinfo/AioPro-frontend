/* eslint-disable prefer-const */
import * as React from 'react';
import { useEffect, useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { FormLabel, Dialog, Button, Autocomplete, FormControl, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { apipost } from '../../../service/api';
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';
import { fetchDoctorSpecialityData } from '../../../redux/slice/GetDoctorSpecialitySlice';
import { fetchCategoryData } from '../../../redux/slice/GetDoctorCategorySlice';

const AddVisit = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenAdd, handleCloseAdd, fetchVisitCounterData } = props;
    const dispatch = useDispatch()
    const employeeList = useSelector((state) => state?.getEmployee?.data)
    const doctorSpeciality = useSelector((state) => state?.getDoctorSpeciality?.data)
    const doctorCategoryList = useSelector((state) => state?.getDoctorCategory?.data)

    // -----------  validationSchema
    const validationSchema = yup.object({
        visitCounter: yup.string().required('Visit Counter is required'),
    });

    // -----------   initialValues
    const initialValues = {
        type: '',
        clientId: '',
        employeeCode: '',
        visitCounter: '',
        employeeName: '',
        speciality: '',
        category: '',
        clientName: '',
    };

    const addCounter = async (values) => {
        const pyload = {
            type: values.type,
            clientId: values.clientId,
            employeeCode: values.employeeCode,
            visitCounter: values.visitCounter,
            employeeName: values.employeeName,
            speciality: values.speciality,
            category: values.category,
            clientName: values.clientName,
        }
        const result = await apipost('/api/visitCounter', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseAdd();
            dispatch(fetchVisitCounterData());
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            addCounter(values)
        },
    });

    useEffect(() => {
        dispatch(fetchEmployeeData());
        dispatch(fetchDoctorSpecialityData());
        dispatch(fetchCategoryData());
    }, [])
    return (
        <div>
            <Dialog open={isOpenAdd} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
                <DialogTitle
                    id="scroll-dialog-title"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h6">Add Visit Counter</Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormControl fullWidth>
                                    <FormLabel>Type</FormLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        size='small'
                                        name='type'
                                        defaultValue='manual'
                                        value={formik.values.type}
                                        onChange={formik.handleChange}
                                        error={formik.touched.type && Boolean(formik.errors.type)}
                                        helperText={formik.touched.type && formik.errors.type}
                                    >
                                        <MenuItem value={"manual"} selected>Manual</MenuItem>
                                        <MenuItem value={"speciality"}>Speciality</MenuItem>
                                        <MenuItem value={"category"}>Category</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {
                                formik.values.type === "manual" &&
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Client Id</FormLabel>
                                    <TextField
                                        id="clientId"
                                        name="clientId"
                                        label=""
                                        size="small"
                                        maxRows={10}
                                        placeholder='Enter Client Id'
                                        value={formik.values.clientId}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        error={formik.touched.clientId && Boolean(formik.errors.clientId)}
                                        helperText={formik.touched.clientId && formik.errors.clientId}
                                    />
                                </Grid>
                            }
                            {
                                formik.values.type === "manual" &&
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Employee Code</FormLabel>
                                    <TextField
                                        id="employeeCode"
                                        name="employeeCode"
                                        label=""
                                        size="small"
                                        maxRows={10}
                                        placeholder='Enter Employee Code'
                                        value={formik.values.employeeCode}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        error={formik.touched.employeeCode && Boolean(formik.errors.employeeCode)}
                                        helperText={formik.touched.employeeCode && formik.errors.employeeCode}
                                    />
                                </Grid>
                            }
                            {(formik.values.type === "speciality" || formik.values.type === "category") && (
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Employee Name</FormLabel>
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('employeeName', newValue ? `${newValue.basicInformation?.firstName}${newValue.basicInformation?.surname}` : '');
                                        }}
                                        fullWidth
                                        options={employeeList}
                                        value={employeeList.find(employee => employee?.basicInformation?.firstName + employee?.basicInformation?.surname === formik.values.employeeName) || null}
                                        getOptionLabel={(employee) => `${employee?.basicInformation?.firstName} ${employee?.basicInformation?.surname}`}
                                        style={{ textTransform: 'capitalize' }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                style={{ textTransform: 'capitalize' }}
                                                placeholder='Select Employee Name'
                                                error={formik.touched.employeeName && Boolean(formik.errors.employeeName)}
                                                helperText={formik.touched.employeeName && formik.errors.employeeName}
                                            />
                                        )}
                                    />
                                    
                                </Grid>
                            )}
                            {(formik.values.type === "speciality") && (
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Speciality</FormLabel>
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            // Ensure newValue is not null before accessing properties
                                            formik.setFieldValue('speciality', newValue ? newValue?.specialityName : "");
                                        }}
                                        fullWidth
                                        options={doctorSpeciality}
                                        value={doctorSpeciality.find(speciality => speciality?.specialityName === formik.values.speciality) || null}
                                        getOptionLabel={(speciality) => speciality?.specialityName}
                                        style={{ textTransform: 'capitalize' }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                style={{ textTransform: 'capitalize' }}
                                                placeholder='Select Speciality'
                                                error={formik.touched.speciality && Boolean(formik.errors.speciality)}
                                                helperText={formik.touched.speciality && formik.errors.speciality}
                                            />
                                        )}
                                    />
                                </Grid>

                            )}

                            {(formik.values.type === "category") && (
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Category</FormLabel>
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('category', newValue ? newValue.categoryName
                                                : "");
                                        }}
                                        fullWidth
                                        options={doctorCategoryList}
                                        value={doctorCategoryList.find(categoryType => categoryType.categoryName === formik.values.category) || null}
                                        getOptionLabel={(categoryType) => categoryType?.categoryName}
                                        style={{ textTransform: 'capitalize' }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                style={{ textTransform: 'capitalize' }}
                                                placeholder='Select Category'
                                                error={formik.touched.category && Boolean(formik.errors.category)}
                                                helperText={formik.touched.category && formik.errors.category}
                                            />
                                        )}
                                    />
                                </Grid>
                            )}

                            {(formik.values.type === "speciality" || formik.values.type === "category") && (
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Client Name</FormLabel>
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('clientName', newValue ? `${newValue.basicInformation?.firstName}${newValue.basicInformation?.surname}` : '');
                                        }}
                                        fullWidth
                                        options={employeeList}
                                        value={employeeList.find(employee => employee?.basicInformation?.firstName + employee?.basicInformation?.surname === formik.values.clientName) || null}
                                        getOptionLabel={(employee) => `${employee?.basicInformation?.firstName} ${employee?.basicInformation?.surname}`}
                                        style={{ textTransform: 'capitalize' }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                style={{ textTransform: 'capitalize' }}
                                                placeholder='Select Client Name'
                                                error={formik.touched.clientName && Boolean(formik.errors.clientName)}
                                                helperText={formik.touched.clientName && formik.errors.clientName}
                                            />
                                        )}
                                    />
                                </Grid>
                            )}


                            <Grid Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Visit Counter</FormLabel>
                                <TextField
                                    id="visitCounter"
                                    name="visitCounter"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Visit Counter'
                                    value={formik.values.visitCounter}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.visitCounter && Boolean(formik.errors.visitCounter)}
                                    helperText={formik.touched.visitCounter && formik.errors.visitCounter}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={formik.handleSubmit}
                        style={{ textTransform: 'capitalize' }}
                    >
                        Save
                    </Button>
                    <Button
                        type="reset"
                        variant="outlined"
                        color="error"
                        style={{ textTransform: 'capitalize' }}
                        onClick={() => {
                            formik.resetForm();
                            handleCloseAdd();
                        }}
                    >
                        Cancle
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
};

export default AddVisit;
