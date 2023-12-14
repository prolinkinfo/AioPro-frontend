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
import { useEffect, useState } from 'react';
import { Autocomplete, Checkbox, FormControl, FormControlLabel, FormLabel } from '@mui/material';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { useTheme } from '@emotion/react';
import { apiget, apipost, addmeeting, getsingleuser, allusers } from '../../service/api';

const Setting = (props) => {
  const { isOpen, handleClose } = props;

  // const [allUser, setAllUser] = useState([]);
  // const { id } = JSON.parse(localStorage.getItem('user'));

  // -----------  validationSchema
  // const validationSchema = yup.object({
  //   date: yup.string().required('Date is required'),
  //   location: yup.string().required('Location is required'),
  // });

  // const initialValues = {
  //   date: '',
  //   location: '',
  //   doctors: [],
  //   notes: '',
  //   createdBy: id,
  // };

  // add opd api
  // const addOpd = async (values) => {
  //   const data = {
  //     date: values.date,
  //     location: values.location,
  //     doctors: values.doctors,
  //     notes: values.notes,
  //     createdBy: values.createdBy,
  //   };

  //   const result = await apipost('/api/opd', data);
  //   if (result && result.status === 200) {
  //     formik.resetForm();
  //     handleClose();
  //   }
  // };

  // formik
  // const formik = useFormik({
  //   initialValues,
  //   validationSchema,
  //   onSubmit: async (values, { resetForm }) => {
  //     addOpd(values);
  //     resetForm();
  //   },
  // });

  // function capitalize(str) {
  //   if (!str) return '';
  //   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  // }

  // async function fetchdata() {
  //   const result = await allusers('/api/users');
  //   if (result && result.status === 200) {
  //     const filterRole = result.data.filter((user) => user?.role === 'Dr');
  //     const names = filterRole.map((user) => {
  //       const firstName = capitalize(user?.firstName);
  //       const lastName = capitalize(user?.lastName);
  //       return `${firstName} ${lastName}`;
  //     });
  //     setAllUser(names);
  //   }
  // }
  // useEffect(() => {
  //   fetchdata();
  // }, []);

  const text = [
    { label: 'Call Report' },
    { label: 'POB Report' },
    { label: 'Call Report With POB' },
    { label: 'Objective Wise Call Report' },
    { label: 'Daily Call Report' },
    { label: 'Doctor Coverage Report' },
    { label: 'Discrepancy Report' },
    { label: 'Visit Report' },
    { label: 'Doctors Attended/Doctors Missed' },
    { label: 'Firm Visit Report' },
    { label: 'MSL Report' },
    { label: 'Sample Distribution Report' },
    { label: 'Gift Distribution Report' },
    { label: 'Consolidated Employee Wise Work Report' },
    { label: 'Last Work Report' },
    { label: 'Activity Report' },
    { label: 'Presentation Report' },
    { label: 'Payment Collection Report' },
    { label: 'Monthly Cycle Summary Report' },
    { label: 'Employee Month & Productivity Report' },
    { label: 'Employee Monthly Coverage Report' },
    { label: ' Product Exposure Report' },
    { label: 'Key performance indicator Report' },
    { label: 'Target Report' },
    { label: 'Stockist Monthly Report' },
    { label: 'Stockist Sales Report' },
    { label: 'RCPA Report' },
    { label: 'Firm Order Report' },
    { label: 'Doctor Business Report' },
    { label: 'Doctor Business Planning / Achievement Report' },
    { label: 'Chemist Business Achievement Report' },
    { label: 'All India Daily Call Report' },
    { label: 'Category wise Monthly Cycle Report' },
    { label: 'Track Report' },
    { label: 'Last Sync Location Tracker' },
    { label: 'Doctor Birthday Or Anniversary' },
    { label: 'Doctor Address Not Found Report' },
    { label: 'Synchronize details report' },
    { label: 'Top 10 Visited Address' },
    { label: 'Employee Daily Performance Report' },
    { label: 'Closed Visit Wise Attendance Report' },
    { label: 'Month Wise Attendance Report' },
    { label: 'Quiz Report' },
    { label: 'Question Report' },
    { label: 'Employee Expense Report' },
    { label: 'Consolidated Expense Report (Overview)' },
    { label: 'Leave Report' },
    { label: 'Deviation Report' },
    { label: 'Tour Plan Status Report' },
    { label: 'Incharge Call Report' },
    { label: 'Doctor Investment Report' },
    { label: 'Sample Promoted Report' },
    { label: 'Product And Category Wise Sales Report' },
    { label: 'Bifurcated Report' },
    { label: 'Travel Expense Statement / Monthly Tour Program Report' },
    { label: 'Category Wise Call Average Report' },
    { label: 'Expense Report' },
    { label: 'City Wise Secondary Sales Report' },
    { label: 'Category Wise Call Activity Report' },
    { label: 'Referral Report' },
    { label: 'Plan & Deviation Report' },
    { label: 'Data Summary Report' },
    { label: 'Area Wise Sales Report' },
    { label: 'Designation Wise Expense Summary Report' },
    { label: 'Hospital Sales Report' },
    { label: 'Attendance and Leave Report' },
    { label: 'Month Wise Expense Report' },
    { label: 'Sales Trend Report' },
    { label: 'Date Wise Call Activity Report' },
    { label: 'Call Average Report' },
    { label: 'All Visits Report' },
    { label: 'ROI Report' },
    { label: 'Party / Item Wise Sales Report' },
    { label: 'Sample Distribution Report With Opening And Closing Quantity' },
    { label: 'Hospital Wise Referral Report' },
    { label: 'Doctor Wise ROI Report' },
    { label: 'Employee Attendance Report' },
    { label: 'Consolidate Report (Month Wise)' },
    { label: 'Sample Collection Report' },
    { label: 'Monthly Expense Summary Report' },
    { label: 'Sponsor Report' },
    { label: 'Secondary Sales Target & Achievement Report' },
    { label: 'Yearly Sales Target VS Achievement Report' },
    { label: 'Combined Summary Employee Wise Report' },
    { label: 'Sample Transportation And Deposit Receipt' },
    { label: 'Yearly Gift Distribution Report' },
    { label: 'Free Quantity Report' },
    { label: 'Visit Tracker' },
    { label: 'Date Wise Employee Month And Productivity Report' },
    { label: 'Category / Speciality Report' },
    { label: 'Firm Attended / Firm Missed' },
    { label: 'Consolidated Managers Report' },
  ];

  return (
    <div>
      <Dialog open={isOpen} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            minWidth: '300px',
          }}
        >
          <Typography variant="h6">Report setting</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Typography>Please select report as per requirement.</Typography>
              <Grid container columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                {text?.map(({ label }, index) => (
                  <Grid item xs={12} sm={12} md={12}>
                    <FormControlLabel control={<Checkbox name="antoine" />} label={label} key={index} />
                  </Grid>
                ))}
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            // onClick={formik.handleSubmit}
            style={{ textTransform: 'capitalize' }}
            color="secondary"
          >
            Update
          </Button>
          <Button
            type="reset"
            variant="outlined"
            style={{ textTransform: 'capitalize' }}
            // onClick={() => {
            //   formik.resetForm();
            //   handleClose();
            // }}
            color="error"
          >
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Setting;
