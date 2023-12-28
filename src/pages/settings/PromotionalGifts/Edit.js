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
import { FormLabel, Dialog, Button, Autocomplete, FormControl, Select, MenuItem, FormHelperText } from '@mui/material';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { apiget, apiput } from '../../../service/api';
import { fetchDivisionData } from '../../../redux/slice/GetDivisionSlice';
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';

const EditCollectionCenter = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenEdit, handleCloseEdit, fetchPromotionalGiftData, data } = props;
    const dispatch = useDispatch();
    const divisionList = useSelector((state) => state?.getDivision?.data)
    const employeeList = useSelector((state) => state?.getEmployee?.data)

    // -----------  validationSchema
    const validationSchema = yup.object({
        divisionName: yup.string().required('Division Name is required'),
        employeeName: yup.string().required('Employee Name is required'),
        giftName: yup.string().required('Gift Name is required'),
        quantity: yup.string().required('Quantity is required'),
    });

    // -----------   initialValues
    const initialValues = {
        divisionName: data?.divisionName,
        employeeName: data?.employeeName,
        giftName: data?.giftName,
        quantity: data?.quantity,
    };

    const editCollectionCenter = async (values) => {
        const pyload = {
            _id: data?._id,
            divisionName: values.divisionName,
            employeeName: values.employeeName,
            giftName: values.giftName,
            quantity: values.quantity,
            modifiedOn: new Date()
        }
        const result = await apiput('/api/promotionalGift', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseEdit();
            dispatch(fetchPromotionalGiftData());

        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            editCollectionCenter(values)
        },
    });

    useEffect(() => {
        dispatch(fetchDivisionData());
        dispatch(fetchEmployeeData());
    }, [])
    return (
        <div>
            <Dialog open={isOpenEdit} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
                <DialogTitle
                    id="scroll-dialog-title"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h6">Edit Promotional Gifts</Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseEdit} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Division Name</FormLabel>
                                <FormControl fullWidth>
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('divisionName', newValue ? newValue.divisionName : "");
                                        }}
                                        options={divisionList}
                                        value={divisionList.find(division => division.divisionName === formik.values.divisionName || null)}
                                        getOptionLabel={(division) => division?.divisionName}
                                        style={{ textTransform: 'capitalize' }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                style={{ textTransform: 'capitalize' }}
                                                placeholder='Select Division'
                                                error={formik.touched.divisionName && Boolean(formik.errors.divisionName)}
                                                helperText={formik.touched.divisionName && formik.errors.divisionName}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Employee</FormLabel>
                                <FormControl fullWidth>
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
                                                placeholder='Select Employee'
                                                error={formik.touched.employeeName && Boolean(formik.errors.employeeName)}
                                                helperText={formik.touched.employeeName && formik.errors.employeeName}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Gift Name</FormLabel>
                                <TextField
                                    id="giftName"
                                    name="giftName"
                                    size="small"
                                    placeholder='Enter Gift Name'
                                    maxRows={10}
                                    value={formik.values.giftName}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.giftName && Boolean(formik.errors.giftName)}
                                    helperText={formik.touched.giftName && formik.errors.giftName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Quantity</FormLabel>
                                <TextField
                                    id="quantity"
                                    name="quantity"
                                    size="small"
                                    placeholder='Enter Quantity'
                                    maxRows={10}
                                    value={formik.values.quantity}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                                    helperText={formik.touched.quantity && formik.errors.quantity}
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
                            handleCloseEdit();
                        }}
                    >
                        Cancle
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditCollectionCenter;
