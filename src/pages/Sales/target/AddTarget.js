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
import { FormLabel, Dialog, Button, Autocomplete, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { apipost } from '../../../service/api';
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';
import { fetchCityData } from '../../../redux/slice/GetCitySlice';
import { fetchZoneData } from '../../../redux/slice/GetZoneSlice';

const frequencyList = [
    "Yearly",
    "Monthly",
    "Quarterly"
]
const yearList = [
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
]
const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]
const quarterList = [
    "1 Quarter",
    "2 Quarter",
    "3 Quarter",
    "4 Quarter",
]

const AddTarget = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenAdd, handleCloseAdd, fetchTargetData } = props;
    const dispatch = useDispatch()
    const employeeList = useSelector((state) => state?.getEmployee?.data)
    const zoneList = useSelector((state) => state?.getZone?.data)
    const cityList = useSelector((state) => state?.getCity?.data)

    // -----------  validationSchema
    const validationSchema = yup.object({
        // reason: yup.string().required('Reason is required'),
    });

    // -----------   initialValues
    const initialValues = {
        targetType: '',
        employeeName: '',
        zone: '',
        city: '',
        frequency: '',
        year: '',
        month: '',
        quarter: '',
        pobSec: '',
        firmSec: '',
        noOfDrVisit: '',
        noOfChemistVisit: '',
        noOfNewChemistAdddition: '',
        noOfNewDoctorAdddition: '',
    };

    const addTarget = async (values) => {
        const pyload = {
            targetType: values.targetType,
            employeeName: values.employeeName,
            zone: values.zone,
            city: values.city,
            frequency: values.frequency,
            year: values.year,
            month: values.month,
            quarter: values.quarter,
            pobSec: values.pobSec,
            firmSec: values.firmSec,
            noOfDrVisit: values.noOfDrVisit,
            noOfChemistVisit: values.noOfChemistVisit,
            noOfNewChemistAdddition: values.noOfNewChemistAdddition,
            noOfNewDoctorAdddition: values.noOfNewDoctorAdddition,
        }
        const result = await apipost('/api/target', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseAdd();
            dispatch(fetchTargetData());
        }
    }


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            addTarget(values)
        },
    });
console.log(employeeList,"employeeList")
    useEffect(() => {
        dispatch(fetchEmployeeData());
        dispatch(fetchCityData());
        dispatch(fetchZoneData());

    }, [])
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
                    <Typography variant="h6">Add Target </Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Target Type</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="targetType"
                                        value={formik.values.targetType}
                                        onChange={formik.handleChange}
                                        defaultValue={"employeeWise"}
                                        error={formik.touched.targetType && Boolean(formik.errors.targetType)}
                                        helperText={formik.touched.targetType && formik.errors.targetType}
                                    >
                                        <FormControlLabel value="employeeWise" control={<Radio />} label="Employee Wise" />
                                        <FormControlLabel value="hqWise" control={<Radio />} label="HQ Wise" />

                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            {
                                formik.values.targetType === "employeeWise" &&
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Employee</FormLabel>
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('employeeName', newValue ? newValue.basicInformation?.employeesName
                                                : "");
                                        }}
                                        fullWidth
                                        options={employeeList}
                                        value={employeeList.find(employee => employee?.basicInformation?.employeesName === formik.values.employeeName) || null}
                                        getOptionLabel={(employee) => `${employee?.basicInformation?.employeesName?.firstName} ${employee?.basicInformation?.employeesName?.surname}`}
                                        style={{ textTransform: 'capitalize' }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                style={{ textTransform: 'capitalize' }}
                                                placeholder='Select Employee'
                                                error={formik.touched.employeeName && Boolean(formik.errors.employeeName)}
                                                helperText={formik.touched.employeeName && formik.errors.employeeName}
                                            />
                                        )}
                                    />
                                </Grid>
                            }
                            {
                                (formik.values.targetType === "hqWise") &&
                                (<>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormLabel>Zone</FormLabel>
                                        <Autocomplete
                                            size="small"
                                            onChange={(_event, newValue) => {
                                                formik.setFieldValue('zone', newValue ? newValue.zoneName : "");
                                            }}
                                            fullWidth
                                            options={zoneList}
                                            value={zoneList.find(zone => zone.zoneName === formik.values.zone) || null}
                                            getOptionLabel={(zone) => zone?.zoneName}
                                            style={{ textTransform: 'capitalize' }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    style={{ textTransform: 'capitalize' }}
                                                    placeholder='Select Zone'
                                                    error={formik.touched.zone && Boolean(formik.errors.zone)}
                                                    helperText={formik.touched.zone && formik.errors.zone} />
                                            )} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormLabel>City</FormLabel>
                                        <Autocomplete
                                            size="small"
                                            onChange={(event, newValue) => {
                                                formik.setFieldValue('city', newValue ? newValue.cityName : "");
                                            }}
                                            fullWidth
                                            options={cityList}
                                            value={cityList.find(city => city.cityName === formik.values.city) || null}
                                            getOptionLabel={(city) => city?.cityName}
                                            style={{ textTransform: 'capitalize' }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    style={{ textTransform: 'capitalize' }}
                                                    placeholder='Select City'
                                                    error={formik.touched.city && Boolean(formik.errors.city)}
                                                    helperText={formik.touched.city && formik.errors.city} />
                                            )} />
                                    </Grid>
                                </>)
                            }
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Frequency</FormLabel>
                                <Autocomplete
                                    size="small"
                                    onChange={(event, newValue) => {
                                        formik.setFieldValue('frequency', newValue || "");
                                    }}
                                    fullWidth
                                    options={frequencyList}
                                    value={frequencyList.find(frequency => frequency === formik.values.frequency) || null}
                                    getOptionLabel={(frequency) => frequency}
                                    style={{ textTransform: 'capitalize' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            style={{ textTransform: 'capitalize' }}
                                            placeholder='Select Frequency'
                                            error={formik.touched.frequency && Boolean(formik.errors.frequency)}
                                            helperText={formik.touched.frequency && formik.errors.frequency}
                                        />
                                    )}
                                />
                            </Grid>
                            {
                                formik.values.frequency === "Monthly" &&
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Month</FormLabel>
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('month', newValue || "");
                                        }}
                                        fullWidth
                                        options={monthList}
                                        value={monthList.find(month => month === formik.values.month) || null}
                                        getOptionLabel={(month) => month}
                                        style={{ textTransform: 'capitalize' }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                style={{ textTransform: 'capitalize' }}
                                                placeholder='Select Month'
                                                error={formik.touched.month && Boolean(formik.errors.month)}
                                                helperText={formik.touched.month && formik.errors.month}
                                            />
                                        )}
                                    />
                                </Grid>
                            }
                            {
                                formik.values.frequency === "Quarterly" &&
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Quarter</FormLabel>
                                    <Autocomplete
                                        size="small"
                                        onChange={(event, newValue) => {
                                            formik.setFieldValue('quarter', newValue || "");
                                        }}
                                        fullWidth
                                        options={quarterList}
                                        value={quarterList.find(quarter => quarter === formik.values.quarter) || null}
                                        getOptionLabel={(quarter) => quarter}
                                        style={{ textTransform: 'capitalize' }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                style={{ textTransform: 'capitalize' }}
                                                placeholder='Select Quarter'
                                                error={formik.touched.quarter && Boolean(formik.errors.quarter)}
                                                helperText={formik.touched.quarter && formik.errors.quarter}
                                            />
                                        )}
                                    />
                                </Grid>
                            }
                            {
                                (formik.values.frequency === "Yearly" || formik.values.frequency === "Monthly" || formik.values.frequency === "Quarterly") && (
                                    <>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <FormLabel>Year</FormLabel>
                                            <Autocomplete
                                                size="small"
                                                onChange={(event, newValue) => {
                                                    formik.setFieldValue('year', newValue || "");
                                                }}
                                                fullWidth
                                                options={yearList}
                                                value={yearList.find(year => year === formik.values.year) || null}
                                                getOptionLabel={(year) => year}
                                                style={{ textTransform: 'capitalize' }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        style={{ textTransform: 'capitalize' }}
                                                        placeholder='Select Year'
                                                        error={formik.touched.year && Boolean(formik.errors.year)}
                                                        helperText={formik.touched.year && formik.errors.year}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </>
                                )
                            }

                            <Grid item xs={12} sm={6} md={6}>
                                <FormLabel>POB SEC. Value</FormLabel>
                                <TextField
                                    id="pobSec"
                                    name="pobSec"
                                    size="small"
                                    maxRows={10}
                                    fullWidth
                                    value={formik.values.pobSec}
                                    onChange={formik.handleChange}
                                    error={formik.touched.pobSec && Boolean(formik.errors.pobSec)}
                                    helperText={formik.touched.pobSec && formik.errors.pobSec}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormLabel>Firm SEC. Value</FormLabel>
                                <TextField
                                    id="firmSec"
                                    name="firmSec"
                                    size="small"
                                    maxRows={10}
                                    fullWidth
                                    value={formik.values.firmSec}
                                    onChange={formik.handleChange}
                                    error={formik.touched.firmSec && Boolean(formik.errors.firmSec)}
                                    helperText={formik.touched.firmSec && formik.errors.firmSec}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormLabel>No Of DR. Visit</FormLabel>
                                <TextField
                                    id="noOfDrVisit"
                                    name="noOfDrVisit"
                                    size="small"
                                    maxRows={10}
                                    fullWidth
                                    value={formik.values.noOfDrVisit}
                                    onChange={formik.handleChange}
                                    error={formik.touched.noOfDrVisit && Boolean(formik.errors.noOfDrVisit)}
                                    helperText={formik.touched.noOfDrVisit && formik.errors.noOfDrVisit}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormLabel>No Of Chemist Visit</FormLabel>
                                <TextField
                                    id="noOfChemistVisit"
                                    name="noOfChemistVisit"
                                    size="small"
                                    maxRows={10}
                                    fullWidth
                                    value={formik.values.noOfChemistVisit}
                                    onChange={formik.handleChange}
                                    error={formik.touched.noOfChemistVisit && Boolean(formik.errors.noOfChemistVisit)}
                                    helperText={formik.touched.noOfChemistVisit && formik.errors.noOfChemistVisit}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormLabel>No Of New Chemist Adddition</FormLabel>
                                <TextField
                                    id="noOfNewChemistAdddition"
                                    name="noOfNewChemistAdddition"
                                    size="small"
                                    maxRows={10}
                                    fullWidth
                                    value={formik.values.noOfNewChemistAdddition}
                                    onChange={formik.handleChange}
                                    error={formik.touched.noOfNewChemistAdddition && Boolean(formik.errors.noOfNewChemistAdddition)}
                                    helperText={formik.touched.noOfNewChemistAdddition && formik.errors.noOfNewChemistAdddition}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormLabel>No Of New Doctor Adddition</FormLabel>
                                <TextField
                                    id="noOfNewDoctorAdddition"
                                    name="noOfNewDoctorAdddition"
                                    size="small"
                                    maxRows={10}
                                    fullWidth
                                    value={formik.values.noOfNewDoctorAdddition}
                                    onChange={formik.handleChange}
                                    error={formik.touched.noOfNewDoctorAdddition && Boolean(formik.errors.noOfNewDoctorAdddition)}
                                    helperText={formik.touched.noOfNewDoctorAdddition && formik.errors.noOfNewDoctorAdddition}
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
        </div >
    );
};

export default AddTarget;
