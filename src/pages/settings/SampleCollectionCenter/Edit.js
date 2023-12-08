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

const EditCollectionCenter = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenEdit, handleCloseEdit, fetchCollectionCenterData, data } = props;

    const [cityList, setCityList] = useState([])
    const [zoneList, setZoneList] = useState([])

    // -----------  validationSchema
    const validationSchema = yup.object({
        centerName: yup.string().required('Center Name is required'),
        centerCode: yup.string().required('Center Code is required'),
        type: yup.string().required('Type is required'),
        zoneName: yup.string().required('Zone Name is required'),
        cityName: yup.string().required('City Name is required'),
        category: yup.string().required('Category is required'),
        assignTo: yup.string().required('Assign To is required'),
        centerAddress: yup.string().required('Center Address is required'),
    });

    // -----------   initialValues
    const initialValues = {
        centerName: data?.centerName,
        centerCode: data?.centerCode,
        type: data?.type,
        zoneName: data?.zoneName,
        cityName: data?.cityName,
        category: data?.category,
        assignTo: data?.assignTo,
        centerAddress: data?.centerAddress,
    };

    const editCollectionCenter = async (values) => {
        const pyload = {
            _id: data?._id,
            centerName: values.centerName,
            centerCode: values.centerCode,
            type: values.type,
            zoneName: values.zoneName,
            cityName: values.cityName,
            category: values.category,
            assignTo: values.assignTo,
            centerAddress: values.centerAddress,
            modifiedOn: new Date()
        }
        const result = await apiput('/api/sampleCollectionCenter', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseEdit();
            fetchCollectionCenterData();
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
    
    useEffect(() => {
        fetchCityData();
        fetchZoneData();
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
                    <Typography variant="h6">Edit Sample Collection Center</Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseEdit} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Center Name</FormLabel>
                                <TextField
                                    id="centerName"
                                    name="centerName"
                                    size="small"
                                    placeholder='Enter Center Name'
                                    maxRows={10}
                                    value={formik.values.centerName}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.centerName && Boolean(formik.errors.centerName)}
                                    helperText={formik.touched.centerName && formik.errors.centerName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Center Code</FormLabel>
                                <TextField
                                    id="centerCode"
                                    name="centerCode"
                                    size="small"
                                    placeholder='Enter Center Code'
                                    maxRows={10}
                                    value={formik.values.centerCode}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.centerCode && Boolean(formik.errors.centerCode)}
                                    helperText={formik.touched.centerCode && formik.errors.centerCode}
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
                                        error={formik.touched.type && Boolean(formik.errors.type)}
                                        helperText={formik.touched.type && formik.errors.type}
                                    >
                                        <MenuItem value={'Pick Up'}>Pick Up</MenuItem>
                                        <MenuItem value={'Drop'}>Drop</MenuItem>
                                    </Select>
                                    <FormHelperText error={formik.touched.type && Boolean(formik.errors.type)}>{formik.touched.type && formik.errors.type}</FormHelperText>
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
                                                placeholder='Select Zone'
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
                                        placeholder='Select Category'
                                        value={formik.values.category}
                                        onChange={formik.handleChange}
                                        error={formik.touched.category && Boolean(formik.errors.category)}
                                        helperText={formik.touched.category && formik.errors.category}
                                    >
                                        <MenuItem value={'other'}>OTHER</MenuItem>
                                    </Select>
                                    <FormHelperText error={formik.touched.category && Boolean(formik.errors.category)}>{formik.touched.category && formik.errors.category}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Assign To</FormLabel>
                                <FormControl fullWidth>
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('assignTo', newValue.cityName);
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
                                                placeholder='Select Assign To'
                                                error={formik.touched.assignTo && Boolean(formik.errors.assignTo)}
                                                helperText={formik.touched.assignTo && formik.errors.assignTo}
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
