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
import { apipost } from '../../../service/api';

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
]
const AddTax = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenAdd, handleCloseAdd,fetchTaxData } = props;

    // -----------  validationSchema
    const validationSchema = yup.object({
        taxType: yup.string().required('Tax Type is required'),
        percent: yup.string().required('Percent is required'),
    });

    // -----------   initialValues
    const initialValues = {
        taxType: '',
        percent: ''
    };

    const addTax = async (values) => {
        const pyload = {
            taxType: values.taxType,
            percent: values.percent
        }
        const result = await apipost('/api/taxmaster', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseAdd();
            fetchTaxData();
        }
    }


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            addTax(values)
        },
    });


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
                    <Typography variant="h6">Add Tax </Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            {/* <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Tax Type</FormLabel>
                                <Autocomplete
                                    disablePortal
                                    name="taxType"
                                    options={top100Films}
                                    fullWidth
                                    size='small'
                                    value={formik.values.taxType}
                                    onChange={formik.handleChange}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            placeholder='Select Tax Type'
                                            error={formik.touched.taxType && Boolean(formik.errors.taxType)}
                                            helperText={formik.touched.taxType && formik.errors.taxType}
                                        />}
                                />
                            </Grid> */}
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Tax Type</FormLabel>
                                <TextField
                                    id="taxType"
                                    name="taxType"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Tax Type'
                                    value={formik.values.taxType}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.taxType && Boolean(formik.errors.taxType)}
                                    helperText={formik.touched.taxType && formik.errors.taxType}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Percent</FormLabel>
                                <TextField
                                    id="percent"
                                    name="percent"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Percent'
                                    value={formik.values.percent}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.percent && Boolean(formik.errors.percent)}
                                    helperText={formik.touched.percent && formik.errors.percent}
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

export default AddTax;
