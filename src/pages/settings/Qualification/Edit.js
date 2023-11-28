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

const EditQualification = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenEdit, handleCloseEdit, fetchQualificationData, data } = props;

    // -----------  validationSchema
    const validationSchema = yup.object({
        qualification: yup.string().required('Qualification is required'),
    });

    // -----------   initialValues
    const initialValues = {
        qualification: data?.qualification,
        fullName: data?.fullName,
    };

    const editQualification = async (values) => {
        const pyload = {
            _id: data?._id,
            qualification: values.qualification,
            fullName: values.fullName,
            modifiedOn: new Date()
        }
        const result = await apiput('/api/qualification', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseEdit();
            fetchQualificationData();
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            editQualification(values)
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
                    <Typography variant="h6">Edit Qualification</Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseEdit} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Qualification</FormLabel>
                                <TextField
                                    id="qualification"
                                    name="qualification"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Qualification'
                                    value={formik.values.qualification}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.qualification && Boolean(formik.errors.qualification)}
                                    helperText={formik.touched.qualification && formik.errors.qualification}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Full Name</FormLabel>
                                <TextField
                                    id="fullName"
                                    name="fullName"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Full Name'
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                    helperText={formik.touched.fullName && formik.errors.fullName}
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

export default EditQualification;
