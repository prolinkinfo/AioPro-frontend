/* eslint-disable prefer-const */
import * as React from 'react';
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
import { FormLabel, Dialog, Button } from '@mui/material';
import { apipost } from '../../../../../service/api';

const AddCountry = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenCountry, handleCloseCountry,fetchCountryData } = props;

    // -----------  validationSchema
    const validationSchema = yup.object({
        countryName: yup.string().required('Country Name is required'),
    });

    // -----------   initialValues
    const initialValues = {
        countryName: '',
    };

    const addCountry = async (values) => {
        const pyload = {
            countryName: values.countryName
        }
        const result = await apipost('/api/countrymaster', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseCountry();
            fetchCountryData();
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            addCountry(values)
        },
    });

    return (
        <div>
            <Dialog open={isOpenCountry} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
                <DialogTitle
                    id="scroll-dialog-title"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h6">Add Country </Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseCountry} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Country Name</FormLabel>
                                <TextField
                                    id="countryName"
                                    name="countryName"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Country Name'
                                    value={formik.values.countryName}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.countryName && Boolean(formik.errors.countryName)}
                                    helperText={formik.touched.countryName && formik.errors.countryName}
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
                            handleCloseCountry();
                        }}
                    >
                        Cancle
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddCountry;
