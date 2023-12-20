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
  const [firmEmployee, setFirmEmployee] = useState(null);
  const [firmType, setFirmType] = useState(null);
  const [firms, setFirms] = useState(null);

  const [allUser, setAllUser] = useState([]);
  const { id } = JSON.parse(localStorage.getItem('user'));

  // -----------  validationSchema
  const validationSchema = yup.object({
    date: yup.string().required('Date is required'),
    location: yup.string().required('Location is required'),
  });

  const initialValues = {
    date: '',
    location: '',
    doctors: [],
    notes: '',
    createdBy: id,
  };

  const cityData = useSelector((state) => state?.getCity?.data);
  const zoneList = useSelector((state) => state?.getZone?.data);
  const divisionList = useSelector((state) => state?.getDivision?.data);
  const doctorCategoryList = useSelector((state) => state?.getDoctorCategory?.data);
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

  const addOpd = async (values) => {
    const data = {
      date: values.date,
      location: values.location,
      doctors: values.doctors,
      notes: values.notes,
      createdBy: values.createdBy,
    };

    const result = await apipost('/api/opd', data);
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
      addOpd(values);
      resetForm();
    },
  });

  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  async function fetchdata() {
    const result = await allusers('/api/users');
    if (result && result.status === 200) {
      const filterRole = result.data.filter((user) => user?.role === 'Dr');
      const names = filterRole.map((user) => {
        const firstName = capitalize(user?.firstName);
        const lastName = capitalize(user?.lastName);
        return `${firstName} ${lastName}`;
      });
      setAllUser(names);
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);

  console.log('firm', firm);
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
                  <Autocomplete
                    size="small"
                    name="firmType"
                    onChange={(event, newValue) => setFirmType(newValue?.firmType)}
                    fullWidth
                    options={firmData}
                    value={firmData.find((item) => item.firmType === firmType) || null}
                    getOptionLabel={(firm) => firm?.firmType}
                    // style={{ textTransform: 'capitalize' }}
                    renderInput={(params) => (
                      <TextField {...params} style={{ textTransform: 'capitalize' }} placeholder="Select Firm Type" />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    onChange={(event, newValue) => setFirmEmployee(newValue?.basicInformation?.employeesName)}
                    options={employeeList}
                    value={employeeList.find((item) => item.basicInformation?.employeesName === firmEmployee) || null}
                    getOptionLabel={(employee) => employee?.basicInformation?.employeesName}
                    size="small"
                    fullWidth
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select Employee" style={{ fontSize: '12px' }} />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <Autocomplete
                    size="small"
                    name="firms"
                    onChange={(event, newValue) => setFirms(newValue?.firmName)}
                    fullWidth
                    options={firm}
                    value={firm.find((item) => item.firmName === firms) || null}
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
                    name="date"
                    type={'datetime-local'}
                    size="small"
                    fullWidth
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    error={formik.touched.date && Boolean(formik.errors.date)}
                    helperText={formik.touched.date && formik.errors.date}
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
