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
import { Autocomplete, Box, Chip, FormControl, FormHelperText, FormLabel, MenuItem, Select } from '@mui/material';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { useTheme } from '@emotion/react';
import { apiget, apipost, addmeeting, getsingleuser } from '../../service/api';
import City from './cities.json'

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const Addmeetings = (props) => {
  const { open, handleClose, id, setUserAction, fetchApiMeeting, user } = props;
  const { parentID } = JSON.parse(localStorage.getItem('user'));
  const userName = localStorage.getItem('userName');
  const [singleuser, setsingleuser] = useState({});

  useEffect(() => {
    setsingleuser(user);
  }, [user]);

  // -----------  validationSchema
  const validationSchema = yup.object({
    subject: yup.string().required('Subject is required'),
    city: yup.string().required('City is required'),
    startDate: yup.string().required('Start Date is required'),
    bach: yup.string().required('Bach is required'),
  });

  const initialValues = {
    subject: '',
    city: '',
    startDate: '',
    bach: '',
    doctors: [],
    createdBy: id,
  };

  // add meeting api
  const addMeeting = async (values) => {
    const data = {
      subject: values.subject,
      city: values.city,
      startDate: values.startDate,
      bach: values.bach,
      doctors: values.doctors,
      status: 'not verified',
      createdBy: values.createdBy,
      parentId: parentID,
    };

    const result = await addmeeting('/api/meeting', data);
    if (result && result.status === 200) {
      formik.resetForm();
      fetchApiMeeting();
      handleClose();
      toast.success(result.data.message);
    }
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      addMeeting(values);
      resetForm();
    },
  });

  // const cityOptions = City.getAllCities();

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">Add Meeting </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Subject</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="subject"
                      label=""
                      size="small"
                      value={formik.values.subject}
                      onChange={formik.handleChange}
                      error={formik.touched.subject && Boolean(formik.errors.subject)}
                    >
                      <MenuItem value="Pathology">Pathology</MenuItem>
                      <MenuItem value="Cardiology">Cardiology</MenuItem>
                      <MenuItem value="Neurology">Neurology</MenuItem>
                      <MenuItem value="Pediatrics">Pediatrics</MenuItem>
                    </Select>
                    <FormHelperText error={formik.touched.subject && Boolean(formik.errors.subject)}>
                      {formik.touched.subject && formik.errors.subject}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormLabel>City</FormLabel>
                  <Autocomplete
                    id="city-autocomplete"
                    size="small"
                    name="city"
                    options={City}
                    getOptionLabel={(option) => option?.name}
                    value={City.find((city) => city?.name === formik.values.city) || null}
                    onChange={(event, newValue) => {
                      formik.setFieldValue('city', newValue?.name);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="city"
                        error={formik.touched.city && Boolean(formik.errors.city)}
                        helperText={formik.touched.city && formik.errors.city}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Start Date</FormLabel>
                  <TextField
                    name="startDate"
                    type={'datetime-local'}
                    size="small"
                    fullWidth
                    value={dayjs(formik.values.startDate).format('YYYY-MM-DD HH:mm:ss')}
                    onChange={formik.handleChange}
                    error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                    helperText={formik.touched.startDate && formik.errors.startDate}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Bach</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="bach"
                      label=""
                      size="small"
                      value={formik.values.bach || null}
                      onChange={formik.handleChange}
                      error={formik.touched.bach && Boolean(formik.errors.bach)}
                    >
                      <MenuItem value="Planned">Planned</MenuItem>
                      <MenuItem value="Held">Held</MenuItem>
                      <MenuItem value="Note Held">Note Held</MenuItem>
                    </Select>
                    <FormHelperText error={formik.touched.bach && Boolean(formik.errors.bach)}>
                      {formik.touched.bach && formik.errors.bach}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Doctors</FormLabel>
                  <FormControl fullWidth>
                    <Autocomplete
                      multiple
                      size="small"
                      value={formik.values.doctors}
                      onChange={(event, newValue) => {
                        formik.setFieldValue('doctors', newValue);
                      }}
                      options={names}
                      getOptionLabel={(option) => option}
                      disableCloseOnSelect
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={formik.touched.doctors && Boolean(formik.errors.doctors)}
                          helperText={formik.touched.doctors && formik.errors.doctors}
                        />
                      )}
                    />
                  </FormControl>
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
              handleClose();
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

export default Addmeetings;
