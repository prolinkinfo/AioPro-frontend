/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Autocomplete, Box, Chip, FormControl, FormHelperText, FormLabel, MenuItem, Select } from '@mui/material';
import { apiget, apipost, allusers } from '../../../service/api';

import { fetchCityData } from '../../../redux/slice/GetCitySlice';
import { fetchZoneData } from '../../../redux/slice/GetZoneSlice';
import { fetchDivisionData } from '../../../redux/slice/GetDivisionSlice';
import { fetchTypeData } from '../../../redux/slice/GetTypeSlice';
import { fetchCategoryData } from '../../../redux/slice/GetDoctorCategorySlice';
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';
import { firmaTypeData } from '../../../redux/slice/GetFirmTypesSlice';
import { fetchfirmData } from '../../../redux/slice/GetFirmSlice';

const VisitModel = (props) => {
  const { isOpen, handleCloseView } = props;
  const dispatch = useDispatch();
  const [firmList, setFirmList] = useState([]);

  // -----------  validationSchema
  const validationSchema = yup.object({
    // date: yup.string().required('Date is required'),
    // location: yup.string().required('Location is required'),
  });

  const initialValues = {
    firmType: '',
    employeeName: '',
    firmId: '',
    address: '',
    city: '',
    zone: '',
    firmName: '',
    visitDate: '',

  };


  const employeeList = useSelector((state) => state?.getEmployee?.data);
  const firmData = useSelector((state) => state?.geFirmType?.data);
  const firm = useSelector((state) => state?.getFirm?.data);

  useEffect(() => {
    dispatch(fetchfirmData());
    dispatch(fetchCityData());
    dispatch(fetchZoneData());
    dispatch(fetchDivisionData());
    dispatch(fetchTypeData());
    dispatch(fetchCategoryData());
    dispatch(fetchEmployeeData());
    dispatch(firmaTypeData());
  }, []);

  const addVisit = async (values) => {
    const data = {
      firmType: values.firmType,
      employeeName: values.employeeName,
      firmId: values.firmId,
      visitAddress: values.address,
      firmAddress: values.address,
      city: values.city,
      zone: values.zone,
      firmName: values.firmName,
      visitDate: values.visitDate,
    };
    const result = await apipost('/api/firmVisit', data);
    if (result && result.status === 200) {
      formik.resetForm();
      handleCloseView();
    }
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      addVisit(values);
      resetForm();
    },
  });

  const fetchFirm = (firmType) => {
    const filteredFirm = firm?.filter((firm) => firm?.firmType?.toLowerCase() === firmType?.toLowerCase());
    setFirmList(filteredFirm)
  }


  return (
    <div>
      <Dialog open={isOpen} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">Add Visits</Typography>
          <Typography>
            <ClearIcon onClick={handleCloseView} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Firm Type</FormLabel>
                  <Autocomplete
                    size="small"
                    name="firmType"
                    onChange={(event, newValue) => {
                      formik.setFieldValue("firmType", newValue ? newValue?.firmType : "");
                      fetchFirm(newValue ? newValue?.firmType : "")
                    }

                    }
                    fullWidth
                    options={firmData}
                    value={firmData.find((item) => item.firmType === formik.values.firmType) || null}
                    getOptionLabel={(firm) => firm?.firmType}
                    // style={{ textTransform: 'capitalize' }}
                    renderInput={(params) => (
                      <TextField {...params} style={{ textTransform: 'capitalize' }} placeholder="Select Firm Type" />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Employee</FormLabel>
                  {/* <Autocomplete
                    disablePortal
                    name="employeeName"
                    id="combo-box-demo"
                    onChange={(event, newValue) =>
                      formik.setFieldValue("employeeName", newValue ? `${newValue.basicInformation?.firstName}${newValue.basicInformation?.surname}` : "")
                    }
                    options={employeeList}
                    value={employeeList.find((employee) => `${employee?.basicInformation?.firstName}${employee?.basicInformation?.surname}` === formik.values.employeeName) || null}
                    getOptionLabel={(employee) => `${employee?.basicInformation?.firstName} ${employee?.basicInformation?.surname}`}
                    size="small"
                    fullWidth
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select Employee" style={{ fontSize: '12px' }} />
                    )}
                  /> */}
                  <Autocomplete
                    size="small"
                    onChange={(event, newValue) => {
                      formik.setFieldValue('employeeName', newValue ? `${newValue?.basicInformation?.firstName}${newValue?.basicInformation?.surname}`
                        : "");
                    }}
                    fullWidth
                    options={employeeList}
                    value={employeeList.find(employee => employee?.basicInformation?.firstName + employee?.basicInformation?.surname === formik.values.employeeName)}
                    getOptionLabel={(employee) => `${employee?.basicInformation?.firstName} ${employee?.basicInformation?.surname}`}
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
                  <FormLabel>Firm</FormLabel>
                  <Autocomplete
                    size="small"
                    name="firms"
                    onChange={(event, newValue) => {
                      console.log(newValue)
                      formik.setFieldValue("firmName", newValue ? newValue?.firmName : "");
                      formik.setFieldValue("firmId", newValue ? newValue?.firmId : "");
                      formik.setFieldValue("city", newValue ? newValue?.city : "");
                      formik.setFieldValue("zone", newValue ? newValue?.zone : "");
                      formik.setFieldValue("address", newValue ? newValue?.address : "");
                    }
                    }
                    fullWidth
                    options={firmList}
                    value={firmList.find((item) => item?.firmName === formik.values.firmName) || null}
                    getOptionLabel={(firm) => firm?.firmName}
                    // style={{ textTransform: 'capitalize' }}
                    renderInput={(params) => (
                      <TextField {...params} style={{ textTransform: 'capitalize' }} placeholder="Select Firm" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Visit Date</FormLabel>
                  <TextField
                    name="visitDate"
                    type={'datetime-local'}
                    size="small"
                    fullWidth
                    value={formik.values.visitDate}
                    onChange={formik.handleChange}
                    error={formik.touched.visitDate && Boolean(formik.errors.visitDate)}
                    helperText={formik.touched.visitDate && formik.errors.visitDate}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            onClick={formik.handleSubmit}
            style={{ textTransform: 'capitalize' }}
            color="secondary"
          >
            Save
          </Button>
          <Button
            type="reset"
            variant="outlined"
            style={{ textTransform: 'capitalize' }}
            onClick={() => {
              formik.resetForm();
              handleCloseView();
            }}
            color="error"
          >
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VisitModel;
