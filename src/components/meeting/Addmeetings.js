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
import { Autocomplete, FormControl, FormHelperText, FormLabel, MenuItem, Select } from '@mui/material';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { apiget, apipost, addmeeting, getsingleuser } from '../../service/api';

const Addmeetings = (props) => {
  const { open, handleClose, id, setUserAction, fetchApiMeeting, user } = props;

  const userName = localStorage.getItem('userName');
  const [singleuser, setsingleuser] = useState({});

  useEffect(() => {
    setsingleuser(user);
  }, [user]);

  // -----------  validationSchema
  const validationSchema = yup.object({
    subject: yup.string().required('Subject is required'),
    status: yup.string().required('Status is required'),
    startDate: yup.string().required('Start Date is required'),
    location: yup.string().required('Location is required'),
    duration: yup.string().required('Duration is required'),
    note: yup.string().required('Note is required'),
  });

  const initialValues = {
    subject: '',
    status: '',
    startDate: '',
    endDate: '',
    duration: '',
    location: '',
    note: '',
    backgroundColor: '',
    textColor: '',
    createdBy: singleuser?.firstName ? singleuser?.firstName : JSON.parse(userName),
    userid: id,
  };

  // add meeting api
  const addMeeting = async (values) => {
    const data = values;
    const result = await addmeeting('/api/meeting', data);
    setUserAction(result);

    if (result && result.status === 200) {
      formik.resetForm();
      handleClose();
      fetchApiMeeting();
      toast.success(result.data.message);
    }
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      addMeeting(values);
    },
  });

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            // backgroundColor: "#2b4054",
            // color: "white",
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
                  <TextField
                    id="subject"
                    name="subject"
                    size="small"
                    maxRows={10}
                    fullWidth
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    error={formik.touched.subject && Boolean(formik.errors.subject)}
                    helperText={formik.touched.subject && formik.errors.subject}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Status</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="status"
                      label=""
                      size="small"
                      value={formik.values.status || null}
                      onChange={formik.handleChange}
                      error={formik.touched.status && Boolean(formik.errors.status)}
                    >
                      <MenuItem value="Planned">Planned</MenuItem>
                      <MenuItem value="Held">Held</MenuItem>
                      <MenuItem value="Note Held">Note Held</MenuItem>
                    </Select>
                    <FormHelperText error={formik.touched.status && Boolean(formik.errors.status)}>
                      {formik.touched.status && formik.errors.status}
                    </FormHelperText>
                  </FormControl>
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
                  <FormLabel>End Date</FormLabel>
                  <TextField
                    name="endDate"
                    type={'datetime-local'}
                    size="small"
                    fullWidth
                    value={dayjs(formik.values.endDate).format('YYYY-MM-DD HH:mm:ss')}
                    onChange={formik.handleChange}
                    error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                    helperText={formik.touched.endDate && formik.errors.endDate}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <FormLabel>Duration</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="duration"
                      label=""
                      size="small"
                      value={formik.values.duration || null}
                      onChange={formik.handleChange}
                      error={formik.touched.duration && Boolean(formik.errors.duration)}
                    >
                      <MenuItem value="15 minutes">15 minutes</MenuItem>
                      <MenuItem value="30 minutes">30 minutes</MenuItem>
                      <MenuItem value="45 minutes">45 minutes</MenuItem>
                      <MenuItem value="1 hour">1 hour</MenuItem>
                      <MenuItem value="1.5 hours">1.5 hours</MenuItem>
                      <MenuItem value="2 hours">2 hours</MenuItem>
                      <MenuItem value="3 hours">3 hours</MenuItem>
                    </Select>
                    <FormHelperText error={formik.touched.duration && Boolean(formik.errors.duration)}>
                      {formik.touched.duration && formik.errors.duration}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormLabel>Location</FormLabel>
                  <TextField
                    id="location"
                    name="location"
                    size="small"
                    fullWidth
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    error={formik.touched.location && Boolean(formik.errors.location)}
                    helperText={formik.touched.location && formik.errors.location}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel id="demo-row-radio-buttons-group-label">Background Color</FormLabel>
                  <TextField
                    id=""
                    name="backgroundColor"
                    label=""
                    type="color"
                    size="small"
                    fullWidth
                    value={formik.values.backgroundColor}
                    onChange={formik.handleChange}
                    error={formik.touched.backgroundColor && Boolean(formik.errors.backgroundColor)}
                    helperText={formik.touched.backgroundColor && formik.errors.backgroundColor}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel id="demo-row-radio-buttons-group-label">Text Color</FormLabel>
                  <TextField
                    id=""
                    name="textColor"
                    label=""
                    type="color"
                    size="small"
                    fullWidth
                    value={formik.values.textColor}
                    onChange={formik.handleChange}
                    error={formik.touched.textColor && Boolean(formik.errors.textColor)}
                    helperText={formik.touched.textColor && formik.errors.textColor}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormLabel>Note</FormLabel>
                  <TextField
                    id="note"
                    name="note"
                    size="small"
                    rows={5}
                    multiline
                    fullWidth
                    value={formik.values.note}
                    onChange={formik.handleChange}
                    error={formik.touched.note && Boolean(formik.errors.note)}
                    helperText={formik.touched.note && formik.errors.note}
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
