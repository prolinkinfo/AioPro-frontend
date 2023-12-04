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
import { apiget, apiput } from '../../../service/api';

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
]
const EditProduct = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenEdit, handleCloseEdit, fetchProductData, data } = props;

    const [divisionList, setDivisionList] = useState([])
    const [productGroupList, setProductGroupList] = useState([])
    const [taxList, setTaxList] = useState([])

    // -----------  validationSchema
    const validationSchema = yup.object({
        division: yup.string().required('Division is required'),
        // productGroup: yup.string().required('Product Group is required'),
        productName: yup.string().required('Product Name is required'),
        // compositionName: yup.string().required('Composition Name is required'),
        mrp: yup.string().required('MRP is required'),
        // baseUnit: yup.string().required('Base Unit is required'),
        // baseUnitConversion: yup.string().required('Base Unit Conversion is required'),
        outPrice: yup.string().required('Out Price is required'),
        packaging: yup.string().required('Packaging is required'),
        tax: yup.string().required('Tax Slab is required'),
        // hsn: yup.string().required('HSN is required'),
        // grade: yup.string().required('Grade is required'),
        // size: yup.string().required('Size is required'),
    });

    // -----------   initialValues
    const initialValues = {
        division: data?.division,
        productGroup: data?.productGroup,
        productName: data?.productName,
        compositionName: data?.compositionName,
        mrp: data?.mrp,
        baseUnit: data?.baseUnit,
        baseUnitConversion: data?.baseUnitConversion,
        outPrice: data?.outPrice,
        packaging: data?.packaging,
        taxType: data?.taxType,
        taxPercent: data?.taxPercent,
        hsn: data?.hsn,
        grade: data?.grade,
        size: data?.size
    };

    const editProduct = async (values) => {
        const pyload = {
            _id: data?._id,
            division: values.division,
            productGroup: values.productGroup,
            productName: values.productName,
            compositionName: values.compositionName,
            mrp: values.mrp,
            baseUnit: values.baseUnit,
            baseUnitConversion: values.baseUnitConversion,
            outPrice: values.outPrice,
            packaging: values.packaging,
            taxType: values.taxType,
            taxPercent: values.taxPercent,
            hsn: values.hsn,
            grade: values.grade,
            size: values.size,
            modifiedOn: new Date()
        }
        const result = await apiput('/api/products', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseEdit();
            fetchProductData();
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            editProduct(values)
        },
    });

    const fetchDivisionData = async () => {
        const result = await apiget(`/api/division`);
        if (result && result.status === 200) {
            setDivisionList(result?.data?.result);
        }
    };

    const fetchProductGroupData = async () => {
        const result = await apiget(`/api/productgroup`);
        if (result && result.status === 200) {
            setProductGroupList(result?.data?.result);
        }
    };

    const fetchTaxData = async () => {
        const result = await apiget(`/api/taxmaster`);
        if (result && result.status === 200) {
            setTaxList(result?.data?.result);
        }
    };


    useEffect(() => {
        fetchDivisionData();
        fetchProductGroupData();
        fetchTaxData();
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
                    <Typography variant="h6">Edit Product</Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseEdit} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Division</FormLabel>
                                <FormControl fullWidth>
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('division', newValue.divisionName);
                                        }}
                                        options={divisionList}
                                        value={divisionList.find(division => division.divisionName === formik.values.division) || null}
                                        getOptionLabel={(division) => division?.divisionName}
                                        style={{ textTransform: 'capitalize' }}
                                        clearIcon
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
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Product Group</FormLabel>
                                <FormControl fullWidth>
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('productGroup', newValue.groupName);
                                        }}
                                        options={productGroupList}
                                        value={productGroupList.find(group => group.groupName === formik.values.productGroup) || null}
                                        getOptionLabel={(group) => group?.groupName}
                                        style={{ textTransform: 'capitalize' }}
                                        clearIcon
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                style={{ textTransform: 'capitalize' }}
                                                placeholder='Select Product Group'
                                                error={formik.touched.productGroup && Boolean(formik.errors.productGroup)}
                                                helperText={formik.touched.productGroup && formik.errors.productGroup}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Product Name</FormLabel>
                                <TextField
                                    id="productName"
                                    name="productName"
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Product Name'
                                    value={formik.values.productName}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.productName && Boolean(formik.errors.productName)}
                                    helperText={formik.touched.productName && formik.errors.productName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Composition Name</FormLabel>
                                <TextField
                                    id="compositionName"
                                    name="compositionName"
                                    size="small"
                                    placeholder='Enter Composition Name'
                                    maxRows={10}
                                    value={formik.values.compositionName}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.compositionName && Boolean(formik.errors.compositionName)}
                                    helperText={formik.touched.compositionName && formik.errors.compositionName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>MRP</FormLabel>
                                <TextField
                                    id="mrp"
                                    name="mrp"
                                    size="small"
                                    placeholder='Enter MRP'
                                    maxRows={10}
                                    value={formik.values.mrp}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.mrp && Boolean(formik.errors.mrp)}
                                    helperText={formik.touched.mrp && formik.errors.mrp}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Base Unit</FormLabel>
                                <FormControl fullWidth>
                                    <Select
                                        id="baseUnit"
                                        name='baseUnit'
                                        size='small'
                                        value={formik.values.baseUnit || null}
                                        onChange={formik.handleChange}
                                        error={formik.touched.baseUnit && Boolean(formik.errors.baseUnit)}
                                        helperText={formik.touched.baseUnit && formik.errors.baseUnit}
                                    >
                                        <MenuItem value={'bag'}>BAG</MenuItem>
                                        <MenuItem value={'gm'}>GM</MenuItem>
                                        <MenuItem value={'kg'}>KG</MenuItem>
                                        <MenuItem value={'litre'}>LITRE</MenuItem>
                                        <MenuItem value={'piece'}>PIECE</MenuItem>
                                    </Select>
                                    <FormHelperText error={formik.touched.baseUnit && Boolean(formik.errors.baseUnit)}>{formik.touched.baseUnit && formik.errors.baseUnit}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Base Unit Conversion</FormLabel>
                                <TextField
                                    id="baseUnitConversion"
                                    name="baseUnitConversion"
                                    size="small"
                                    placeholder='Enter Base Unit Conversion'
                                    maxRows={10}
                                    value={formik.values.baseUnitConversion}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.baseUnitConversion && Boolean(formik.errors.baseUnitConversion)}
                                    helperText={formik.touched.baseUnitConversion && formik.errors.baseUnitConversion}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Out Price</FormLabel>
                                <TextField
                                    id="outPrice"
                                    name="outPrice"
                                    size="small"
                                    placeholder='Enter Out Price'
                                    maxRows={10}
                                    value={formik.values.outPrice}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.outPrice && Boolean(formik.errors.outPrice)}
                                    helperText={formik.touched.outPrice && formik.errors.outPrice}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Packaging</FormLabel>
                                <TextField
                                    id="packaging"
                                    name="packaging"
                                    size="small"
                                    placeholder='Enter Packaging'
                                    maxRows={10}
                                    value={formik.values.packaging}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.packaging && Boolean(formik.errors.packaging)}
                                    helperText={formik.touched.packaging && formik.errors.packaging}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Tax Slab</FormLabel>
                                <FormControl fullWidth>
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('taxType', newValue?.taxType);
                                            formik.setFieldValue('taxPercent', newValue?.percent);
                                        }}
                                        options={taxList}
                                        value={taxList.find(tax => tax?.taxType === formik.values.taxType) || null}
                                        getOptionLabel={(tax) => `${tax?.taxType}(${tax?.percent}%)`}
                                        style={{ textTransform: 'capitalize' }}
                                        clearIcon
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                style={{ textTransform: 'capitalize' }}
                                                placeholder='Select Tax Slab'
                                                error={formik.touched.taxType && Boolean(formik.errors.taxType)}
                                                helperText={formik.touched.taxType && formik.errors.taxType}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>HSN</FormLabel>
                                <TextField
                                    id="hsn"
                                    name="hsn"
                                    size="small"
                                    placeholder='Enter HSN'
                                    maxRows={10}
                                    value={formik.values.hsn}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.hsn && Boolean(formik.errors.hsn)}
                                    helperText={formik.touched.hsn && formik.errors.hsn}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Grade</FormLabel>
                                <TextField
                                    id="grade"
                                    name="grade"
                                    size="small"
                                    placeholder='Enter Grade'
                                    maxRows={10}
                                    value={formik.values.grade}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.grade && Boolean(formik.errors.grade)}
                                    helperText={formik.touched.grade && formik.errors.grade}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Size</FormLabel>
                                <TextField
                                    id="size"
                                    name="size"
                                    size="small"
                                    placeholder='Enter Size'
                                    maxRows={10}
                                    value={formik.values.size}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.size && Boolean(formik.errors.size)}
                                    helperText={formik.touched.size && formik.errors.size}
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

export default EditProduct;
