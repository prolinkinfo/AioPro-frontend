/* eslint-disable prefer-const */
import * as React from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormLabel, Dialog, Button, Autocomplete } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { apipost } from '../../../service/api';
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';

const AddSampleGiftWithChallan = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenAdd, handleCloseAdd } = props;
    const dispatch = useDispatch();
    const employeeList = useSelector((state) => state?.getEmployee?.data)

    // -----------  validationSchema
    const validationSchema = yup.object({
        sampleGiftCode: yup.string().required('Sample / Gift Code is required'),
        packSize: yup.string().required('Pack Size is required'),
        quantity: yup.string().required('Quantity is required'),
        batchNo: yup.string().required('Batch No is required'),
        expiryDate: yup.string().required('Expiry Date is required'),
        challanNo: yup.string().required('Challan No is required'),
        fieldPerson: yup.string().required('Field Person is required'),
        date: yup.string().required('Date is required'),
    });

    // -----------   initialValues
    const initialValues = {
        sampleGiftCode: '',
        packSize: '',
        quantity: '',
        batchNo: '',
        expiryDate: '',
        challanNo: '',
        fieldPerson: '',
        date: '',
    };

    const add = async (values) => {
        const pyload = {
            sampleGiftCode: values?.sampleGiftCode,
            packSize: values?.packSize,
            quantity: values?.quantity,
            batchNo: values?.batchNo,
            expiryDate: values?.expiryDate,
            challanNo: values?.challanNo,
            fieldPerson: values?.fieldPerson,
            date: values?.values
        }
        // const result = await apipost('/api/type', pyload);

        // if (result && result.status === 200) {
        //     formik.resetForm();
        //     handleCloseAdd();
        //     // dispatch(fetchTypeData());

        // }
    }


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            add(values)
        },
    });

    useEffect(() => {
        dispatch(fetchEmployeeData())
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
                    <Typography variant="h6">Add Details </Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Sample / Gift Code</FormLabel>
                                <TextField
                                    id="sampleGiftCode"
                                    name="sampleGiftCode"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Sample/Gift Code'
                                    value={formik.values.sampleGiftCode}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.sampleGiftCode && Boolean(formik.errors.sampleGiftCode)}
                                    helperText={formik.touched.sampleGiftCode && formik.errors.sampleGiftCode}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Pack Size</FormLabel>
                                <TextField
                                    id="packSize"
                                    name="packSize"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Pack Size'
                                    value={formik.values.packSize}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.packSize && Boolean(formik.errors.packSize)}
                                    helperText={formik.touched.packSize && formik.errors.packSize}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Quantity</FormLabel>
                                <TextField
                                    id="quantity"
                                    name="quantity"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Quantity'
                                    value={formik.values.quantity}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                                    helperText={formik.touched.quantity && formik.errors.quantity}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Batch No</FormLabel>
                                <TextField
                                    id="batchNo"
                                    name="batchNo"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter batchNo'
                                    value={formik.values.batchNo}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.batchNo && Boolean(formik.errors.batchNo)}
                                    helperText={formik.touched.batchNo && formik.errors.batchNo}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Expiry Date</FormLabel>
                                <TextField
                                    id="expiryDate"
                                    name="expiryDate"
                                    type='date'
                                    size="small"
                                    maxRows={10}
                                    value={formik.values.expiryDate}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
                                    helperText={formik.touched.expiryDate && formik.errors.expiryDate}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Challan No</FormLabel>
                                <TextField
                                    id="challanNo"
                                    name="challanNo"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Challan No'
                                    value={formik.values.challanNo}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.challanNo && Boolean(formik.errors.challanNo)}
                                    helperText={formik.touched.challanNo && formik.errors.challanNo}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Field Person</FormLabel>
                                <Autocomplete
                                    size="small"
                                    onChange={(event, newValue) => {
                                        formik.setFieldValue('fieldPerson', newValue ? `${newValue?.basicInformation?.firstName}${newValue?.basicInformation?.surname}`
                                            : "");
                                    }}
                                    fullWidth
                                    options={employeeList}
                                    value={employeeList.find(employee => employee?.basicInformation?.firstName + employee?.basicInformation?.surname === formik.values.fieldPerson)}
                                    getOptionLabel={(employee) => `${employee?.basicInformation?.firstName} ${employee?.basicInformation?.surname}`}
                                    style={{ textTransform: 'capitalize' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            style={{ textTransform: 'capitalize' }}
                                            placeholder='Select Field Person'
                                            error={formik.touched.fieldPerson && Boolean(formik.errors.fieldPerson)}
                                            helperText={formik.touched.fieldPerson && formik.errors.fieldPerson}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Date</FormLabel>
                                <TextField
                                    id="date"
                                    name="date"
                                    type='date'
                                    size="small"
                                    maxRows={10}
                                    value={formik.values.date}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.date && Boolean(formik.errors.date)}
                                    helperText={formik.touched.date && formik.errors.date}
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

export default AddSampleGiftWithChallan;
