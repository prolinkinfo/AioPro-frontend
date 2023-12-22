/* eslint-disable no-unneeded-ternary */
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
import { FormLabel, Dialog, Button, Autocomplete, FormControl, FormControlLabel, Checkbox, Select, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { apipost } from '../../../service/api';

const calculationBaseList = [
    "Calendar Days",
    "Working Days"
]

const periodList = [
    "Monthly",
    "Yearly"
]

const Add = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenAdd, handleCloseAdd, fetchLeaveEntitlementData } = props;

    const dispatch = useDispatch();

    // -----------  validationSchema
    const validationSchema = yup.object({
        entitlementName: yup.string().required('Entitlement Name is required'),
    });

    // -----------   initialValues
    const initialValues = {
        entitlementName: '',
        daysPerYear: '',
        maximumPerMonth: '',
        maximumDaysAdvance: '',
        maximumDaysBackDate: '',
        minimumDaysRestriction: '',
        abbreviation: '',
        canCarryForward: '',
        sandwiched: '',
        paid: '',
        minimumLeavePeriod: '',
        balanceVisible: '',
        encachable: '',
        isEarned: '',
        noOfDays: '',
        period: '',
        calculationBase: '',
        designation: ''
    };

    const add = async (values) => {
        const pyload = {
            entitlementName: values.entitlementName,
            daysPerYear: values.daysPerYear,
            maximumPerMonth: values.maximumPerMonth,
            maximumDaysAdvance: values.maximumDaysAdvance,
            maximumDaysBackDate: values.maximumDaysBackDate,
            minimumDaysRestriction: values.minimumDaysRestriction,
            abbreviation: values.abbreviation,
            canCarryForward: values.canCarryForward === true ? true : false,
            sandwiched: values.sandwiched === true ? true : false,
            paid: values.paid === true ? true : false,
            minimumLeavePeriod: values.minimumLeavePeriod === true ? true : false,
            balanceVisible: values.balanceVisible === true ? true : false,
            encachable: values.encachable === true ? true : false,
            isEarned: values.isEarned === true ? true : false,
            noOfDays: values.noOfDays,
            period: values.period,
            calculationBase: values.calculationBase,
            designation: values.designation,
        }
        const result = await apipost('/api/leaveEntitlement', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseAdd();
            dispatch(fetchLeaveEntitlementData());
        }
    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            add(values)
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
                    <Typography variant="h6">Manage Leave Entitlement </Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Entitlement Name </FormLabel>
                                <TextField
                                    id="entitlementName"
                                    name="entitlementName"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    value={formik.values.entitlementName}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.entitlementName && Boolean(formik.errors.entitlementName)}
                                    helperText={formik.touched.entitlementName && formik.errors.entitlementName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Days per Year</FormLabel>
                                <TextField
                                    id="daysPerYear"
                                    name="daysPerYear"
                                    type='number'
                                    size="small"
                                    maxRows={10}
                                    value={formik.values.daysPerYear}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.daysPerYear && Boolean(formik.errors.daysPerYear)}
                                    helperText={formik.touched.daysPerYear && formik.errors.daysPerYear}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Maximum per Month</FormLabel>
                                <TextField
                                    id="maximumPerMonth"
                                    name="maximumPerMonth"
                                    type='number'
                                    size="small"
                                    maxRows={10}
                                    value={formik.values.maximumPerMonth}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.maximumPerMonth && Boolean(formik.errors.maximumPerMonth)}
                                    helperText={formik.touched.maximumPerMonth && formik.errors.maximumPerMonth}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Maximum Days Advance</FormLabel>
                                <TextField
                                    id="maximumDaysAdvance"
                                    name="maximumDaysAdvance"
                                    type='number'
                                    size="small"
                                    maxRows={10}
                                    value={formik.values.maximumDaysAdvance}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.maximumDaysAdvance && Boolean(formik.errors.maximumDaysAdvance)}
                                    helperText={formik.touched.maximumDaysAdvance && formik.errors.maximumDaysAdvance}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Maximum Days BackDate</FormLabel>
                                <TextField
                                    id="maximumDaysBackDate"
                                    name="maximumDaysBackDate"
                                    type='number'
                                    size="small"
                                    maxRows={10}
                                    value={formik.values.maximumDaysBackDate}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.maximumDaysBackDate && Boolean(formik.errors.maximumDaysBackDate)}
                                    helperText={formik.touched.maximumDaysBackDate && formik.errors.maximumDaysBackDate}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Minimum Days Restriction</FormLabel>
                                <TextField
                                    id="minimumDaysRestriction"
                                    name="minimumDaysRestriction"
                                    type='number'
                                    size="small"
                                    maxRows={10}
                                    value={formik.values.minimumDaysRestriction}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.minimumDaysRestriction && Boolean(formik.errors.minimumDaysRestriction)}
                                    helperText={formik.touched.minimumDaysRestriction && formik.errors.minimumDaysRestriction}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Abbreviation</FormLabel>
                                <TextField
                                    id="abbreviation"
                                    name="abbreviation"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    value={formik.values.abbreviation}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.abbreviation && Boolean(formik.errors.abbreviation)}
                                    helperText={formik.touched.abbreviation && formik.errors.abbreviation}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormControlLabel control={<Checkbox checked={formik.values.canCarryForward}
                                    onChange={(e) => formik.setFieldValue('canCarryForward', e.target.checked)} />} name='canCarryForward' labelPlacement="start" label="Can Carry Forward" />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormControlLabel control={<Checkbox checked={formik.values.sandwiched} onChange={(e) => formik.setFieldValue('sandwiched', e.target.checked)} />} name='sandwiched' labelPlacement="start" label="Sandwiched" />
                            </Grid>

                            <Grid item xs={12} sm={12} md={12}>
                                <FormControlLabel control={<Checkbox checked={formik.values.paid} onChange={(e) => formik.setFieldValue('paid', e.target.checked)} />} name='paid' value={formik.values.paid} onChange={formik.handleChange} labelPlacement="start" label="Paid" />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormControlLabel control={<Checkbox checked={formik.values.minimumLeavePeriod} onChange={(e) => formik.setFieldValue('minimumLeavePeriod', e.target.checked)} />} name='minimumLeavePeriod' labelPlacement="start" label="Minimum Leave Period" />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormControlLabel control={<Checkbox checked={formik.values.balanceVisible} onChange={(e) => formik.setFieldValue('balanceVisible', e.target.checked)} />} name='balanceVisible' labelPlacement="start" label="Balance Visible" />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormControlLabel control={<Checkbox checked={formik.values.encachable} onChange={(e) => formik.setFieldValue('encachable', e.target.checked)} />} name='encachable' labelPlacement="start" label="Encachable" />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormControlLabel control={<Checkbox checked={formik.values.isEarned} onChange={(e) => formik.setFieldValue('isEarned', e.target.checked)} />} name='isEarned' labelPlacement="start" label="Is Earned" />
                            </Grid>
                            {
                                formik.values.isEarned &&
                                <>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <TextField
                                            id="noOfDays"
                                            name="noOfDays"
                                            label=""
                                            size="small"
                                            maxRows={10}
                                            placeholder='Enter No.Of Days'
                                            value={formik.values.noOfDays}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            error={formik.touched.noOfDays && Boolean(formik.errors.noOfDays)}
                                            helperText={formik.touched.noOfDays && formik.errors.noOfDays} />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <Autocomplete
                                            size="small"
                                            onChange={(event, newValue) => {
                                                formik.setFieldValue('period', newValue || "");
                                            }}
                                            fullWidth
                                            options={periodList}
                                            value={periodList.find(period => period === formik.values.period) || null}
                                            getOptionLabel={(period) => period}
                                            style={{ textTransform: 'capitalize' }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    style={{ textTransform: 'capitalize' }}
                                                    placeholder='Select Period'
                                                    error={formik.touched.period && Boolean(formik.errors.period)}
                                                    helperText={formik.touched.period && formik.errors.period} />
                                            )} />
                                    </Grid>
                                </>
                            }
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Calculation Base</FormLabel>
                                <Autocomplete
                                    size="small"
                                    onChange={(event, newValue) => {
                                        formik.setFieldValue('calculationBase', newValue || "");
                                    }}
                                    fullWidth
                                    options={calculationBaseList}
                                    value={calculationBaseList.find(calculationBase => calculationBase === formik.values.calculationBase) || null}
                                    getOptionLabel={(calculationBase) => calculationBase}
                                    style={{ textTransform: 'capitalize' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            style={{ textTransform: 'capitalize' }}
                                            error={formik.touched.calculationBase && Boolean(formik.errors.calculationBase)}
                                            helperText={formik.touched.calculationBase && formik.errors.calculationBase}
                                        />
                                    )}
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

export default Add;
