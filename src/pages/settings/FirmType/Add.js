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

const AddType = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenAdd, handleCloseAdd, fetchTypeData } = props;

    // -----------  validationSchema
    const validationSchema = yup.object({
        firmType: yup.string().required('Firm Type is required'),
        level: yup.string().required('Level is required'),
    });

    // -----------   initialValues
    const initialValues = {
        firmType: '',
        level: '',
    };

    const addType = async (values) => {
        const pyload = {
            firmType: values.firmType,
            level: values.level,
        }
        const result = await apipost('/api/firmtype', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseAdd();
            fetchTypeData();
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            addType(values)
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
                    <Typography variant="h6">Add Firm Type </Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Firm Type</FormLabel>
                                <TextField
                                    id="firmType"
                                    name="firmType"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Firm Type'
                                    value={formik.values.firmType}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.firmType && Boolean(formik.errors.firmType)}
                                    helperText={formik.touched.firmType && formik.errors.firmType}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Level</FormLabel>
                                <TextField
                                    id="level"
                                    name="level"
                                    type='number' 
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Level'
                                    value={formik.values.level}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.level && Boolean(formik.errors.level)}
                                    helperText={formik.touched.level && formik.errors.level}
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

export default AddType;
