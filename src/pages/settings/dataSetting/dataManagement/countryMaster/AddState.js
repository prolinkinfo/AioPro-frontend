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
import { apiget, apipost } from '../../../../../service/api';

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];
const AddState = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenState, handleCloseState, fetchStateData } = props;
    const [countryList, setCountryList] = useState([])

    // -----------  validationSchema
    const validationSchema = yup.object({
        countryName: yup.string().required('Country Name is required'),
        stateName: yup.string().required('State Name is required'),
    });

    // -----------   initialValues
    const initialValues = {
        countryName: '',
        stateName: '',
    };

    const addState = async (values) => {
        const pyload = {
            countryName: values.countryName,
            stateName:values.stateName
        }
        const result = await apipost('/api/statemaster', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseState();
            fetchStateData();
        }
    }


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            addState(values)
        },
    });

    const fetchCountryData = async () => {
        const result = await apiget(`/api/countryMaster`);
        if (result && result.status === 200) {
            setCountryList(result?.data?.result);
        }
    };

    useEffect(() => {
        fetchCountryData();
    }, [])

    return (
        <div>
            <Dialog open={isOpenState} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
                <DialogTitle
                    id="scroll-dialog-title"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h6">Add State </Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseState} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Country</FormLabel>
                                <FormControl fullWidth>
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('countryName', newValue.countryName);
                                        }}
                                        options={countryList}
                                        value={countryList.find(country => country.countryName === formik.values.countryName) || null}
                                        getOptionLabel={(country) => country?.countryName}
                                        style={{ textTransform: 'capitalize' }}
                                        clearIcon
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                style={{ textTransform: 'capitalize' }}
                                                placeholder='Select Country'
                                                error={formik.touched.countryName && Boolean(formik.errors.countryName)}
                                                helperText={formik.touched.countryName && formik.errors.countryName}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>State Name</FormLabel>
                                <TextField
                                    id="stateName"
                                    name="stateName"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter State Name'
                                    value={formik.values.stateName}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.stateName && Boolean(formik.errors.stateName)}
                                    helperText={formik.touched.stateName && formik.errors.stateName}
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
                            handleCloseState();
                        }}
                    >
                        Cancle
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddState;
