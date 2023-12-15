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
import { useDispatch, useSelector } from 'react-redux';
import { apipost } from '../../../service/api';
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';

const AddBackDateVisit = (props) => {
  // eslint-disable-next-line react/prop-types
  const { isOpenAdd, handleCloseAdd, fetchBackDateVisitData } = props;

  const dispatch = useDispatch()
  const employeeList = useSelector((state) => state?.getEmployee?.data)


  // -----------  validationSchema
  const validationSchema = yup.object({
    employeeName: yup.string().required('Employee is required'),
    fromDate: yup.string().required('From date is required'),
    toDate: yup.string().required('To Date is required'),
  });

  // -----------   initialValues
  const initialValues = {
    employeeName: '',
    fromDate: '',
    toDate: '',
    deadline: ''
  };

  const addBackDateVisit = async (values) => {
    const pyload = {
      employeeName: values.employeeName,
      fromDate: values.fromDate,
      toDate: values.toDate,
      deadline: values.deadline,
    };
    const result = await apipost('/api/backDateVisit', pyload);

    if (result && result.status === 200) {
      formik.resetForm();
      handleCloseAdd();
      fetchBackDateVisitData();
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      addBackDateVisit(values);
    },
  });

  useEffect(() => {
    dispatch(fetchEmployeeData());
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
          <Typography variant="h6">Add Back Date Visit </Typography>
          <Typography>
            <ClearIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
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
                  getOptionLabel={(employee) => employee?.basicInformation?.employeesName}
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
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>From Date</FormLabel>
                <TextField
                  id="fromDate"
                  name="fromDate"
                  type='date'
                  size="small"
                  maxRows={10}
                  value={formik.values.fromDate}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.fromDate && Boolean(formik.errors.fromDate)}
                  helperText={formik.touched.fromDate && formik.errors.fromDate}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>To Date</FormLabel>
                <TextField
                  id="toDate"
                  name="toDate"
                  type='date'
                  size="small"
                  inputProps={{
                    min: formik.values.fromDate
                  }}
                  maxRows={10}
                  value={formik.values.toDate}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.toDate && Boolean(formik.errors.toDate)}
                  helperText={formik.touched.toDate && formik.errors.toDate}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Deadline </FormLabel>
                <TextField
                  id="deadline"
                  name="deadline"
                  type='date'
                  size="small"
                  maxRows={10}
                  placeholder="Enter Deadline"
                  value={formik.values.deadline}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.deadline && Boolean(formik.errors.deadline)}
                  helperText={formik.touched.deadline && formik.errors.deadline}
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

export default AddBackDateVisit;
