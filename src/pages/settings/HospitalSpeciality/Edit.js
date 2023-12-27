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
import { apiget, apiput } from '../../../service/api';
import { fetchDivisionData } from '../../../redux/slice/GetDivisionSlice';

const EditHospitalSpeciality = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenEdit, handleCloseEdit, fetchHospitalSpecialityData, data } = props;
    const dispatch = useDispatch();

    const divisionList = useSelector((state)=>state?.getDivision?.data)

    // -----------  validationSchema
    const validationSchema = yup.object({
        hospitalSpeciality: yup.string().required('Hospital Class is required'),
        divisionName: yup.string().required('Division is required'),
    });
    // -----------   initialValues
    const initialValues = {
        hospitalSpeciality: data?.hospitalSpeciality,
        divisionName: data?.divisionName,
    };

    const editSpeciality = async (values) => {
        const pyload = {
            _id: data?._id,
            hospitalSpeciality: values.hospitalSpeciality,
            divisionName: values.divisionName,
            modifiedOn: new Date()
        }
        const result = await apiput('/api/hospitalspeciality', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseEdit();
            dispatch(fetchHospitalSpecialityData());
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            editSpeciality(values)
        },
    });

    useEffect(() => {
        dispatch(fetchDivisionData());
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
                    <Typography variant="h6">Edit Hospital Speciality</Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseEdit} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Hospital Speciality</FormLabel>
                                <TextField
                                    id="hospitalSpeciality"
                                    name="hospitalSpeciality"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Hospital Speciality'
                                    value={formik.values.hospitalSpeciality}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.hospitalSpeciality && Boolean(formik.errors.hospitalSpeciality)}
                                    helperText={formik.touched.hospitalSpeciality && formik.errors.hospitalSpeciality}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Division</FormLabel>
                                <FormControl fullWidth>
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('divisionName', newValue ? newValue.divisionName : "");
                                        }}
                                        options={divisionList}
                                        value={divisionList.find(division => division.divisionName === formik.values.divisionName) || null}
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

export default EditHospitalSpeciality;
