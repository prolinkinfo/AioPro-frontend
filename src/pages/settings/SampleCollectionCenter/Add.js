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
import { apiget, apipost } from '../../../service/api';

const AddProductGroup = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenAdd, handleCloseAdd, fetchProductGroupData } = props;
    const [cityList, setCityList] = useState([])
    const [zoneList, setZoneList] = useState([])


    // -----------  validationSchema
    const validationSchema = yup.object({
        groupName: yup.string().required('Division is required'),
        groupCategory: yup.string().required('Product Name is required'),
    });

    // -----------   initialValues
    const initialValues = {
        groupName: '',
        groupCategory: '',
        orderBy: '',
    };

    const addProductGroup = async (values) => {
        const pyload = {
            groupName: values.groupName,
            groupCategory: values.groupCategory,
            orderBy: values.orderBy,
        }
        const result = await apipost('/api/productgroup', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseAdd();
            fetchProductGroupData();
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            addProductGroup(values)
        },
    });

    const fetchCityData = async () => {
        const result = await apiget(`/api/cityMaster`);
        if (result && result.status === 200) {
            setCityList(result?.data?.result);
        }
    };

    const fetchZoneData = async () => {
        const result = await apiget(`/api/zone`);
        if (result && result.status === 200) {
            setZoneList(result?.data?.result);
        }
    };
    console.log(zoneList, "zoneList")
    useEffect(() => {
        fetchCityData();
        fetchZoneData();
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
                    <Typography variant="h6">Add Product Group</Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Center Name</FormLabel>
                                <TextField
                                    id="groupName"
                                    name="groupName"
                                    size="small"
                                    placeholder='Enter Group Name'
                                    maxRows={10}
                                    value={formik.values.groupName}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.groupName && Boolean(formik.errors.groupName)}
                                    helperText={formik.touched.groupName && formik.errors.groupName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Center Code</FormLabel>
                                <TextField
                                    id="groupCategory"
                                    name="groupCategory"
                                    size="small"
                                    placeholder='Enter Group Category'
                                    maxRows={10}
                                    value={formik.values.groupCategory}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.groupCategory && Boolean(formik.errors.groupCategory)}
                                    helperText={formik.touched.groupCategory && formik.errors.groupCategory}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Type</FormLabel>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        size='small'
                                        name='type'
                                        value={formik.values.type}
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value={'Pick Up'}>Pick Up</MenuItem>
                                        <MenuItem value={'Drop'}>Drop</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Zone</FormLabel>
                                <FormControl fullWidth>
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('zoneName', newValue.zoneName);
                                        }}
                                        options={zoneList}
                                        value={zoneList.find(city => city.zoneName === formik.values.zoneName) || null}
                                        getOptionLabel={(city) => city?.zoneName}
                                        style={{ textTransform: 'capitalize' }}
                                        clearIcon
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                style={{ textTransform: 'capitalize' }}
                                                placeholder='Select City'
                                                error={formik.touched.zoneName && Boolean(formik.errors.zoneName)}
                                                helperText={formik.touched.zoneName && formik.errors.zoneName}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>City</FormLabel>
                                <FormControl fullWidth>
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('cityName', newValue.cityName);
                                        }}
                                        options={cityList}
                                        value={cityList.find(city => city.cityName === formik.values.cityName) || null}
                                        getOptionLabel={(city) => city?.cityName}
                                        style={{ textTransform: 'capitalize' }}
                                        clearIcon
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                style={{ textTransform: 'capitalize' }}
                                                placeholder='Select City'
                                                error={formik.touched.cityName && Boolean(formik.errors.cityName)}
                                                helperText={formik.touched.cityName && formik.errors.cityName}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Category</FormLabel>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        size='small'
                                        name='category'
                                        value={formik.values.category}
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value={'other'}>OTHER</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Assign To</FormLabel>
                                <FormControl fullWidth>
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('cityName', newValue.cityName);
                                        }}
                                        options={cityList}
                                        value={cityList.find(city => city.cityName === formik.values.cityName) || null}
                                        getOptionLabel={(city) => city?.cityName}
                                        style={{ textTransform: 'capitalize' }}
                                        clearIcon
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                style={{ textTransform: 'capitalize' }}
                                                placeholder='Select City'
                                                error={formik.touched.cityName && Boolean(formik.errors.cityName)}
                                                helperText={formik.touched.cityName && formik.errors.cityName}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Center Address</FormLabel>
                                <TextField
                                    id="centerAddress"
                                    name="centerAddress"
                                    size="small"
                                    placeholder='Enter Center Address'
                                    maxRows={10}
                                    value={formik.values.centerAddress}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.centerAddress && Boolean(formik.errors.centerAddress)}
                                    helperText={formik.touched.centerAddress && formik.errors.centerAddress}
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

export default AddProductGroup;
