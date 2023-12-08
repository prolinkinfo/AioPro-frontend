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
import { apiget, apipost } from '../../../service/api';

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
]
const AddSchemeMaster = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenAdd, handleCloseAdd, fetchSchemeMasterData } = props;
    const [productList, setProductList] = useState([])

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
        schemeName: '',
        startDate: '',
        endDate: '',
        schemeQuatity: '',
        numberOfFreeItems: '',
        productName: '',
        status: "active"
    };

    const addSchemeMaster = async (values) => {
        const pyload = {
            schemeName: values.schemeName,
            startDate: values.startDate,
            endDate: values.endDate,
            schemeQuatity: values.schemeQuatity,
            numberOfFreeItems: values.numberOfFreeItems,
            productName: values.productName,
            status: values.status,
        }
        const result = await apipost('/api/schememaster', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseAdd();
            fetchSchemeMasterData();
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            addSchemeMaster(values)
        },
    });

    const fetchProductData = async () => {
        const result = await apiget(`/api/products`);
        if (result && result.status === 200) {
            setProductList(result?.data?.result);
        }
    };

    useEffect(() => {
        fetchProductData();
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
                    <Typography variant="h6">Add Scheme </Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />
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
                                    value={formik.values.startDate}
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
                                    value={formik.values.endDate}
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
                                    value={productList.find(product => product.productName === formik.values.productName)}
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

export default AddSchemeMaster;
