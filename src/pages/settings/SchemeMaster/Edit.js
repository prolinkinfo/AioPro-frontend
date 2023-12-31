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
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { apiget, apiput } from '../../../service/api';
import { fetchProductData } from '../../../redux/slice/GetProductSlice';

const EditSchemeMaster = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenEdit, handleCloseEdit, fetchSchemeMasterData, data } = props;
    const dispatch = useDispatch();
    const productList = useSelector((state) => state?.getProduct?.data)

    // -----------  validationSchema
    const validationSchema = yup.object({
        schemeName: yup.string().required('Scheme Name is required'),
        startDate: yup.string().required('Start Date is required'),
        endDate: yup.string().required('End Date is required'),
        schemeQuatity: yup.string().required('Scheme Quatity is required'),
        numberOfFreeItems: yup.string().required('Number Of Free Items is required'),
        productName: yup.string().required('Product is required'),
    });

    // -----------   initialValues
    const initialValues = {
        schemeName: data?.schemeName,
        startDate: data?.startDate,
        endDate: data?.endDate,
        schemeQuatity: data?.schemeQuatity,
        numberOfFreeItems: data?.numberOfFreeItems,
        productName: data?.productName,
    };
    const editSchemeMaster = async (values) => {
        const pyload = {
            _id: data?._id,
            schemeName: values.schemeName,
            startDate: values.startDate,
            endDate: values.endDate,
            schemeQuatity: values.schemeQuatity,
            numberOfFreeItems: values.numberOfFreeItems,
            productName: values.productName,
            modifiedOn: new Date()
        }
        const result = await apiput('/api/schememaster', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseEdit();
            dispatch(fetchSchemeMasterData());
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            editSchemeMaster(values)
        },
    });


    useEffect(() => {
        dispatch(fetchProductData());
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
                    <Typography variant="h6">Edit Scheme</Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseEdit} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Scheme Name</FormLabel>
                                <TextField
                                    id="schemeName"
                                    name="schemeName"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Scheme Name'
                                    value={formik.values.schemeName}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.schemeName && Boolean(formik.errors.schemeName)}
                                    helperText={formik.touched.schemeName && formik.errors.schemeName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Start Date</FormLabel>
                                <TextField
                                    id="startDate"
                                    name="startDate"
                                    type='date'
                                    size="small"
                                    maxRows={10}
                                    value={dayjs(formik.values.startDate).format('YYYY-MM-DD')}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                                    helperText={formik.touched.startDate && formik.errors.startDate}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>End Date</FormLabel>
                                <TextField
                                    id="endDate"
                                    name="endDate"
                                    type='date'
                                    size="small"
                                    maxRows={10}
                                    inputProps={{
                                        min: dayjs(formik.values.startDate).format('YYYY-MM-DD')
                                    }}
                                    value={dayjs(formik.values.endDate).format('YYYY-MM-DD')}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                                    helperText={formik.touched.endDate && formik.errors.endDate}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Scheme Quatity</FormLabel>
                                <TextField
                                    id="schemeQuatity"
                                    name="schemeQuatity"
                                    type='number'
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Scheme Quatity'
                                    value={formik.values.schemeQuatity}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.schemeQuatity && Boolean(formik.errors.schemeQuatity)}
                                    helperText={formik.touched.schemeQuatity && formik.errors.schemeQuatity}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Number Of Free Items</FormLabel>
                                <TextField
                                    id="numberOfFreeItems"
                                    name="numberOfFreeItems"
                                    type='number'
                                    size="small"
                                    placeholder='Enter Number Of Free Items'
                                    maxRows={10}
                                    value={formik.values.numberOfFreeItems}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.numberOfFreeItems && Boolean(formik.errors.numberOfFreeItems)}
                                    helperText={formik.touched.numberOfFreeItems && formik.errors.numberOfFreeItems}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Product Name</FormLabel>
                                <Autocomplete
                                    size="small"
                                    onChange={(event, newValue) => {
                                        formik.setFieldValue('productName', newValue ? newValue.productName : "");
                                    }}
                                    options={productList}
                                    value={productList.find(product => product.productName === formik.values.productName) || null}
                                    getOptionLabel={(product) => product?.productName}
                                    style={{ textTransform: 'capitalize' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            style={{ textTransform: 'capitalize' }}
                                            placeholder='Select Product Group'
                                            error={formik.touched.productName && Boolean(formik.errors.productName)}
                                            helperText={formik.touched.productName && formik.errors.productName}
                                        />
                                    )}
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

export default EditSchemeMaster;
