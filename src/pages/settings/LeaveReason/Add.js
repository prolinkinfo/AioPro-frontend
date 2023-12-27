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
import { FormLabel, Dialog, Button, Autocomplete, FormControl, MenuItem, Select, FormHelperText } from '@mui/material';
import { useDispatch } from 'react-redux';
import { apipost } from '../../../service/api';

const AddLeaveReason = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenAdd, handleCloseAdd, fetchLeaveReasonData } = props;
    const dispatch = useDispatch();

    // -----------  validationSchema
    const validationSchema = yup.object({
        leaveReason: yup.string().required('Leave Reason is required'),
        leaveEntitlement: yup.string().required('Leave Entitlement is required'),
    });

    // -----------   initialValues
    const initialValues = {
        leaveReason: '',
        leaveEntitlement: ''
    };

    const addLeaveReason = async (values) => {
        const pyload = {
            leaveReason: values.leaveReason,
            leaveEntitlement: values.leaveEntitlement
        }
        const result = await apipost('/api/leavereason', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseAdd();
           dispatch(fetchLeaveReasonData());
        }
    }


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            addLeaveReason(values)
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
                    <Typography variant="h6">Add Leave Reason </Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Leave Reason</FormLabel>
                                <TextField
                                    id="leaveReason"
                                    name="leaveReason"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Leave Reason'
                                    value={formik.values.leaveReason}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.leaveReason && Boolean(formik.errors.leaveReason)}
                                    helperText={formik.touched.leaveReason && formik.errors.leaveReason}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormControl fullWidth>
                                    <FormLabel>Leave Entitlement</FormLabel>
                                    <Select
                                        id="leaveEntitlement"
                                        size='small'
                                        name='leaveEntitlement'
                                        placeholder='Select Leave Entitlement'
                                        value={formik.values.leaveEntitlement}
                                        onChange={formik.handleChange}
                                        error={formik.touched.leaveEntitlement && Boolean(formik.errors.leaveEntitlement)}
                                        helperText={formik.touched.leaveEntitlement && formik.errors.leaveEntitlement}
                                    >
                                        <MenuItem value={'Casual Leave'}>Casual Leave</MenuItem>
                                        <MenuItem value={'Privilege Leave'}>Privilege Leave</MenuItem>
                                        <MenuItem value={'Leave Without Pay'}>Leave Without Pay</MenuItem>
                                    </Select>
                                    <FormHelperText error={formik.touched.leaveEntitlement && Boolean(formik.errors.leaveEntitlement)}>{formik.touched.leaveEntitlement && formik.errors.leaveEntitlement}</FormHelperText>
                                </FormControl>
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

export default AddLeaveReason;
