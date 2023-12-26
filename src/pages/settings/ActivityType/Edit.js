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
import { apiput } from '../../../service/api';

const EditActivityType = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenEdit, handleCloseEdit, data, fetchActivityTypeData } = props;
    const dispatch = useDispatch();

    // -----------  validationSchema
    const validationSchema = yup.object({
        activityName: yup.string().required('Activity Name is required'),
    });

    // -----------   initialValues
    const initialValues = {
        activityName: data?.activityName,
    };

    const editActivityType = async (values) => {
        const pyload = {
            _id: data?._id,
            activityName: values.activityName,
            modifiedOn: new Date()
        }
        const result = await apiput('/api/activityType', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseEdit();
            dispatch(fetchActivityTypeData());
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize:true,
        onSubmit: async (values) => {
            editActivityType(values)
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
                    <Typography variant="h6">Edit Activity Type </Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseEdit} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Activity Type Name</FormLabel>
                                <TextField
                                    id="typeName"
                                    name="activityName"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder="Enter Type Name"
                                    value={formik.values.activityName}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.activityName && Boolean(formik.errors.activityName)}
                                    helperText={formik.touched.activityName && formik.errors.activityName}
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

export default EditActivityType;
