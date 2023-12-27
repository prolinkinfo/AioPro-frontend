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
import { useDispatch } from 'react-redux';
import { apipost } from '../../../service/api';

const AddHospitalCategory = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenAdd, handleCloseAdd,fetchHospitalCategoryData } = props;
    const dispatch = useDispatch();


    // -----------  validationSchema
    const validationSchema = yup.object({
        hospitalCategory: yup.string().required('Hospital Category is required'),
    });

    // -----------   initialValues
    const initialValues = {
        hospitalCategory: '',
    };

    const addCategory = async (values) => {
        const pyload = {
            hospitalCategory: values.hospitalCategory,
        }
        const result = await apipost('/api/hospitalcategory', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseAdd();
            dispatch(fetchHospitalCategoryData());
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            addCategory(values)
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
                    <Typography variant="h6">Add Category </Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Hospital Category</FormLabel>
                                <TextField
                                    id="hospitalCategory"
                                    name="hospitalCategory"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Hospital Category'
                                    value={formik.values.hospitalCategory}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.hospitalCategory && Boolean(formik.errors.hospitalCategory)}
                                    helperText={formik.touched.hospitalCategory && formik.errors.hospitalCategory}
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

export default AddHospitalCategory;
