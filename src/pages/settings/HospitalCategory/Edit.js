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
import { apiput } from '../../../service/api';

const EditHospitalCategory = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenEdit, handleCloseEdit, fetchCategoryData, data } = props;

    // -----------  validationSchema
    const validationSchema = yup.object({
        hospitalCategory: yup.string().required('Hospital Category is required'),
    });

    // -----------   initialValues
    const initialValues = {
        hospitalCategory: data?.hospitalCategory,
    };

    const editCategory = async (values) => {
        const pyload = {
            _id: data?._id,
            hospitalCategory: values.hospitalCategory,
            modifiedOn: new Date()
        }
        const result = await apiput('/api/hospitalcategory', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseEdit();
            fetchCategoryData();
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize:true,
        onSubmit: async (values) => {
            editCategory(values)
        },
    });


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
                    <Typography variant="h6">Edit Category</Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseEdit} style={{ cursor: 'pointer' }} />
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

export default EditHospitalCategory;
