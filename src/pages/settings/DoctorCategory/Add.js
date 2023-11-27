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

const AddCategory = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenAdd, handleCloseAdd,fetchCategoryData } = props;

    // -----------  validationSchema
    const validationSchema = yup.object({
        categoryName: yup.string().required('Category Name is required'),
        minimumPreference: yup.string().required('Minimum Preference is required'),
        maximumPreference: yup.string().required('Maximum Preference is required'),
    });

    // -----------   initialValues
    const initialValues = {
        categoryName: '',
        minimumPreference: '',
        maximumPreference: '',
    };

    const addCategory = async (values) => {
        const pyload = {
            categoryName: values.categoryName,
            minimumPreference: values.minimumPreference,
            maximumPreference: values.maximumPreference,
        }
        const result = await apipost('/api/doctorcategory', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseAdd();
            fetchCategoryData();
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
                                <FormLabel>Category Name</FormLabel>
                                <TextField
                                    id="categoryName"
                                    name="categoryName"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Category Name'
                                    value={formik.values.categoryName}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.categoryName && Boolean(formik.errors.categoryName)}
                                    helperText={formik.touched.categoryName && formik.errors.categoryName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Minimum Preference</FormLabel>
                                <TextField
                                    id="minimumPreference"
                                    name="minimumPreference"
                                    type='number'
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Minimum Preference'
                                    value={formik.values.minimumPreference}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.minimumPreference && Boolean(formik.errors.minimumPreference)}
                                    helperText={formik.touched.minimumPreference && formik.errors.minimumPreference}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Maximum Preference</FormLabel>
                                <TextField
                                    id="maximumPreference"
                                    name="maximumPreference"
                                    type='number'
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Maximum Preference'
                                    value={formik.values.maximumPreference}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.maximumPreference && Boolean(formik.errors.maximumPreference)}
                                    helperText={formik.touched.maximumPreference && formik.errors.maximumPreference}
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

export default AddCategory;
