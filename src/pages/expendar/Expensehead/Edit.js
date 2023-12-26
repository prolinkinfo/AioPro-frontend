/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/prop-types */
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
import { FormLabel, Dialog, Button, Autocomplete, FormControl, FormControlLabel, Checkbox } from '@mui/material';
import { useDispatch } from 'react-redux';
import { apiput } from '../../../service/api';

const EditExpenseHead = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenEdit, handleCloseEdit, data, fetchExpenseHeadData } = props;
    const dispatch = useDispatch();

// -----------  validationSchema
const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
  });

  // -----------   initialValues
  const initialValues = {
    title: data?.title,
    monthlyCap: data?.monthlyCap,
    isEditable: data?.isEditable === "Yes" ? true : false,
  };

    const editHead = async (values) => {
        const pyload = {
            _id: data?._id,
            title: values.title,
            monthlyCap: values.monthlyCap,
            isEditable: values.isEditable === true ? "Yes" : "No", 
            modifiedOn: new Date()
        }
        const result = await apiput('/api/expenseHead', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseEdit();
            dispatch(fetchExpenseHeadData());
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            editHead(values)
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
                                <FormLabel>Title</FormLabel>
                                <TextField
                                    id="title"
                                    name="title"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    disabled
                                    placeholder="Enter Title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.title && Boolean(formik.errors.title)}
                                    helperText={formik.touched.title && formik.errors.title}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Monthly Cap</FormLabel>
                                <TextField
                                    id="monthlyCap"
                                    name="monthlyCap"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder="Enter Monthly Cap"
                                    value={formik.values.monthlyCap}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.monthlyCap && Boolean(formik.errors.monthlyCap)}
                                    helperText={formik.touched.monthlyCap && formik.errors.monthlyCap}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormControlLabel control={<Checkbox checked={formik.values.isEditable || null}
                                    onChange={(e) => formik.setFieldValue('isEditable', e.target.checked)} />} name='isEditable' labelPlacement="start" label="Is Editable" />
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

export default EditExpenseHead;
