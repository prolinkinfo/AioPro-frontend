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
import { apiput } from '../../../service/api';
import { fetchProductData } from '../../../redux/slice/GetProductSlice';

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
]
const EditProductIndication = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenEdit, handleCloseEdit, fetchProductIndicationData, data } = props;
    const dispatch = useDispatch();
    const productList = useSelector((state) => state?.getProduct?.data);

    // -----------  validationSchema
    const validationSchema = yup.object({
        productName: yup.string().required('Product Name is required'),
        indication: yup.string().required('Indication is required'),
    });

    // -----------   initialValues
    const initialValues = {
        productName: data?.productName,
        indication: data?.indication,
    };
    const editProductIndication = async (values) => {
        const pyload = {
            _id: data?._id,
            productName: values.productName,
            indication: values.indication,
            modifiedOn: new Date()
        }
        const result = await apiput('/api/productindication', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseEdit();
            dispatch(fetchProductIndicationData());
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            editProductIndication(values)
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
                    <Typography variant="h6">Edit Product Indication</Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseEdit} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Product Name</FormLabel>
                                <Autocomplete
                                    size="small"
                                    onChange={(event, newValue) => {
                                        formik.setFieldValue('productName', newValue ? newValue.productName : "");
                                    }}
                                    options={productList}
                                    value={productList.find(product => product.productName === formik.values.productName)}
                                    getOptionLabel={(product) => product?.productName}
                                    style={{ textTransform: 'capitalize' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            style={{ textTransform: 'capitalize' }}
                                            placeholder='Select Product Name'
                                            error={formik.touched.productName && Boolean(formik.errors.productName)}
                                            helperText={formik.touched.productName && formik.errors.productName}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Indication</FormLabel>
                                <TextField
                                    id="indication"
                                    name="indication"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Indication'
                                    value={formik.values.indication}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.indication && Boolean(formik.errors.indication)}
                                    helperText={formik.touched.indication && formik.errors.indication}
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

export default EditProductIndication;
