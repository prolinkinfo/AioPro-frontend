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
import { FormLabel, Dialog, Button, Autocomplete, FormControl, Select, MenuItem, FormHelperText } from '@mui/material';
import { useDispatch } from 'react-redux';
import { apiget, apipost } from '../../../service/api';

const AddProductGroup = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenAdd, handleCloseAdd, fetchProductGroupData } = props;
    const dispatch = useDispatch();

    // -----------  validationSchema
    const validationSchema = yup.object({
        groupName: yup.string().required('Group Name is required'),
        groupCategory: yup.string().required('Group Category is required')
    });

    // -----------   initialValues
    const initialValues = {
        groupName: '',
        groupCategory: '',
        orderBy: '',
    };

    const addProductGroup = async (values) => {
        const pyload = {
            groupName: values.groupName,
            groupCategory: values.groupCategory,
            orderBy: values.orderBy,
        }
        const result = await apipost('/api/productgroup', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseAdd();
            dispatch(fetchProductGroupData());
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            addProductGroup(values)
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
                    <Typography variant="h6">Add Product Group</Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Group Name</FormLabel>
                                <TextField
                                    id="groupName"
                                    name="groupName"
                                    size="small"
                                    placeholder='Enter Group Name'
                                    maxRows={10}
                                    value={formik.values.groupName}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.groupName && Boolean(formik.errors.groupName)}
                                    helperText={formik.touched.groupName && formik.errors.groupName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Group Category</FormLabel>
                                <TextField
                                    id="groupCategory"
                                    name="groupCategory"
                                    size="small"
                                    placeholder='Enter Group Category'
                                    maxRows={10}
                                    value={formik.values.groupCategory}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.groupCategory && Boolean(formik.errors.groupCategory)}
                                    helperText={formik.touched.groupCategory && formik.errors.groupCategory}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Order By</FormLabel>
                                <TextField
                                    id="orderBy"
                                    name="orderBy"
                                    type='number'
                                    size="small"
                                    placeholder='Enter Order By'
                                    maxRows={10}
                                    value={formik.values.orderBy}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.orderBy && Boolean(formik.errors.orderBy)}
                                    helperText={formik.touched.orderBy && formik.errors.orderBy}
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

export default AddProductGroup;
