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
import { FormLabel, Dialog, Button, Autocomplete, FormControl } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { apipost } from '../../../service/api';
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';
import { fetchDoctorData } from '../../../redux/slice/GetDoctorSlice';
import { fetchProductData } from '../../../redux/slice/GetProductSlice';
import { fetchDoctorSpecialityData } from '../../../redux/slice/GetDoctorSpecialitySlice';
import { fetchDivisionData } from '../../../redux/slice/GetDivisionSlice';

const assigedType = [
    "All",
    "Doctor",
    "Speciality",
    "Product",
    "Eployee",
]

const AddPresentation = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenAdd, handleCloseAdd,fetchData } = props;

    const dispatch = useDispatch();
    const employeeList = useSelector((state) => state?.getEmployee?.data)
    const doctorList = useSelector((state) => state?.getDoctor?.data)
    const productList = useSelector((state) => state?.getProduct?.data)
    const specialityList = useSelector((state) => state?.getDoctorSpeciality?.data)
    const divisionList = useSelector((state) => state?.getDivision?.data)



    // -----------  validationSchema
    const validationSchema = yup.object({
        presentationName: yup.string().required('Presentation Name is required'),
    });

    // -----------   initialValues
    const initialValues = {
        presentationName: '',
        assigedType: '',
        assigedTo: '',
        division: '',
        description: '',
    };

    const addPresentation = async (values) => {
        const pyload = {
            presentationName: values.presentationName,
            assigedType: values.assigedType,
            assigedTo: values.assigedTo,
            division: values.division,
            description: values.description,
        };
        const result = await apipost('/api/presentation', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseAdd();
            fetchData();
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            addPresentation(values);
        },
    });

    useEffect(() => {
        dispatch(fetchEmployeeData());
        dispatch(fetchDoctorData());
        dispatch(fetchProductData());
        dispatch(fetchDoctorSpecialityData());
        dispatch(fetchDivisionData());

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
                    <Typography variant="h6">Add Presentation</Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Presentation Name</FormLabel>
                                <TextField
                                    id="presentationName"
                                    name="presentationName"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder="Enter Presentation Name"
                                    value={formik.values.presentationName}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.presentationName && Boolean(formik.errors.presentationName)}
                                    helperText={formik.touched.presentationName && formik.errors.presentationName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Assiged Type</FormLabel>
                                <Autocomplete
                                    size="small"
                                    onChange={(event, newValue) => {
                                        formik.setFieldValue('assigedType', newValue || "");
                                    }}
                                    fullWidth
                                    options={assigedType}
                                    value={assigedType.find(type => type === formik.values.assigedType) || null}
                                    getOptionLabel={(type) => type}
                                    style={{ textTransform: 'capitalize' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            style={{ textTransform: 'capitalize' }}
                                            placeholder='Select Assiged Type'
                                            error={formik.touched.assigedType && Boolean(formik.errors.assigedType)}
                                            helperText={formik.touched.assigedType && formik.errors.assigedType}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Assiged To</FormLabel>
                                {
                                    formik.values.assigedType === "Doctor" &&
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('assigedTo', newValue ? newValue?.doctorName : '');
                                        }}
                                        fullWidth
                                        options={doctorList}
                                        value={doctorList.find(doctor => doctor?.doctorName === formik.values.assigedTo) || null}
                                        getOptionLabel={(doctor) => doctor?.doctorName}
                                        style={{ textTransform: 'capitalize' }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                style={{ textTransform: 'capitalize' }}
                                                placeholder='Select Doctor'
                                                error={formik.touched.assigedTo && Boolean(formik.errors.assigedTo)}
                                                helperText={formik.touched.assigedTo && formik.errors.assigedTo}
                                            />
                                        )}
                                    />
                                }
                                {
                                    formik.values.assigedType === "Speciality" &&

                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('assigedTo', newValue ? newValue?.specialityName : '');
                                        }}
                                        fullWidth
                                        options={specialityList}
                                        value={specialityList.find(speciality => speciality?.specialityName === formik.values.assigedTo) || null}
                                        getOptionLabel={(speciality) => speciality?.specialityName}
                                        style={{ textTransform: 'capitalize' }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                style={{ textTransform: 'capitalize' }}
                                                placeholder='Select Speciality'
                                                error={formik.touched.assigedTo && Boolean(formik.errors.assigedTo)}
                                                helperText={formik.touched.assigedTo && formik.errors.assigedTo}
                                            />
                                        )}
                                    />
                                }
                                {
                                    formik.values.assigedType === "Product" &&
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('assigedTo', newValue ? newValue?.productName : '');
                                        }}
                                        fullWidth
                                        options={productList}
                                        value={productList.find(product => product?.productName === formik.values.assigedTo) || null}
                                        getOptionLabel={(product) => product?.productName}
                                        style={{ textTransform: 'capitalize' }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                style={{ textTransform: 'capitalize' }}
                                                placeholder='Select Product'
                                                error={formik.touched.assigedTo && Boolean(formik.errors.assigedTo)}
                                                helperText={formik.touched.assigedTo && formik.errors.assigedTo}
                                            />
                                        )}
                                    />
                                }
                                {
                                    formik.values.assigedType === "Eployee" &&
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('assigedTo', newValue ? `${newValue.basicInformation?.firstName}${newValue.basicInformation?.surname}` : '');
                                        }}
                                        fullWidth
                                        options={employeeList}
                                        value={employeeList.find(employee => employee?.basicInformation?.firstName + employee?.basicInformation?.surname === formik.values.assigedTo) || null}
                                        getOptionLabel={(employee) => `${employee?.basicInformation?.firstName} ${employee?.basicInformation?.surname}`}
                                        style={{ textTransform: 'capitalize' }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                style={{ textTransform: 'capitalize' }}
                                                placeholder='Select Employee'
                                                error={formik.touched.assigedTo && Boolean(formik.errors.assigedTo)}
                                                helperText={formik.touched.assigedTo && formik.errors.assigedTo}
                                            />
                                        )}
                                    />
                                }

                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Division</FormLabel>
                                <Autocomplete
                                    size="small"
                                    onChange={(event, newValue) => {
                                        formik.setFieldValue('division', newValue ? newValue.divisionName : "");
                                    }}
                                    fullWidth
                                    options={divisionList}
                                    value={divisionList.find(division => division.divisionName === formik.values.division) || null}
                                    getOptionLabel={(division) => division?.divisionName}
                                    style={{ textTransform: 'capitalize' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            style={{ textTransform: 'capitalize' }}
                                            placeholder='Select Division'
                                            error={formik.touched.division && Boolean(formik.errors.division)}
                                            helperText={formik.touched.division && formik.errors.division}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Description</FormLabel>
                                <TextField
                                    id="description"
                                    name="description"
                                    label=""
                                    size="small"
                                    multiline
                                    rows={4}
                                    placeholder="Enter Description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
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
        </div>
    );
};

export default AddPresentation;
