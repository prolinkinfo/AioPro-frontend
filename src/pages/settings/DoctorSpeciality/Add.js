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
import { FormLabel, Dialog, Button, Autocomplete, FormControl, MenuItem, Select, FormHelperText } from '@mui/material';
import { apiget, apipost } from '../../../service/api';

const AddSpeciality = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenAdd, handleCloseAdd, fetchSpecialityData } = props;
    const [divisionList, setDivisionList] = useState([])

    // -----------  validationSchema
    const validationSchema = yup.object({
        divisionName: yup.string().required('Division Name is required'),
        group: yup.string().required('Group is required'),
        specialityName: yup.string().required('Speciality Name is required'),
    });

    // -----------   initialValues
    const initialValues = {
        divisionName: '',
        group: '',
        specialityName: '',
    };

    const addSpeciality = async (values) => {
        const pyload = {
            divisionName: values.divisionName,
            group: values.group,
            specialityName: values.specialityName,
        }
        const result = await apipost('/api/doctorspeciality', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseAdd();
            fetchSpecialityData();
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            addSpeciality(values)
        },
    });

    const fetchDivisionData = async () => {
        const result = await apiget(`/api/division`);
        if (result && result.status === 200) {
            setDivisionList(result?.data?.result);
        }
    };

    useEffect(() => {
        fetchDivisionData();
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
                    <Typography variant="h6">Add Speciality </Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />
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
                                            formik.setFieldValue('divisionName', newValue.divisionName);
                                        }}
                                        options={divisionList}
                                        value={divisionList.find(division => division.divisionName === formik.values.divisionName)}
                                        getOptionLabel={(division) => division?.divisionName}
                                        style={{ textTransform: 'capitalize' }}
                                        clearIcon
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
                                <FormLabel>Group</FormLabel>
                                <FormControl fullWidth>
                                    <Select
                                        id="group"
                                        name='group'
                                        size='small'
                                        value={formik.values.group}
                                        onChange={formik.handleChange}
                                        error={formik.touched.group && Boolean(formik.errors.group)}
                                    >
                                        <MenuItem value={"All"}>All</MenuItem>
                                        <MenuItem value={"NEURO"}>NEURO</MenuItem>
                                        <MenuItem value={"NON-NEURO"}>NON-NEURO</MenuItem>
                                    </Select>
                                    <FormHelperText error={formik.touched.group && Boolean(formik.errors.group)}>{formik.touched.group && formik.errors.group}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Speciality Name</FormLabel>
                                <TextField
                                    id="specialityName"
                                    name="specialityName"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Speciality Name'
                                    value={formik.values.specialityName}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.specialityName && Boolean(formik.errors.specialityName)}
                                    helperText={formik.touched.specialityName && formik.errors.specialityName}
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

export default AddSpeciality;
