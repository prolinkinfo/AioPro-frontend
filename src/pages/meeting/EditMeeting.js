import { useNavigate, useParams } from 'react-router-dom';
// import { Modal } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { BiLink } from 'react-icons/bi';
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
import { toast } from 'react-toastify';
import {
  FormLabel,
  Dialog,
  Button,
  Select,
  MenuItem,
  FormControl,
  DialogContentText,
  FormHelperText,
  Box,
  Chip,
  Autocomplete,
} from '@mui/material';
import dayjs from 'dayjs';
import { GiCancel } from 'react-icons/gi';
import { FiDelete, FiSave } from 'react-icons/fi';
import { useTheme } from '@emotion/react';
import { adduser, apidelete, apieditmeeting, apiget, deletemeetingApi } from '../../service/api';
import DeleteModel from '../../components/Deletemodle'
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


const EditMeeting = (props) => {
  const { isOpen, meetingsId, fetchApiMeeting, handleCloseevent, dataByMeetingId, setUserAction } = props;

  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)

  const userId = JSON.parse(localStorage.getItem('user'))
  const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
  const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

  // -----------   initialValues
  const validationSchema = yup.object({
    subject: yup.string().required('Subject is required'),
    city: yup.string().required('City is required'),
    startDate: yup.string().required('Start Date is required'),
    bach: yup.string().required('Bach is required'),
    // doctors: yup.array().required('Doctors is required'),
  });

  const initialValues = {
    _id: dataByMeetingId?._id,
    subject: dataByMeetingId?.subject,
    city: dataByMeetingId?.city,
    startDate: dataByMeetingId?.startDate,
    bach: dataByMeetingId?.bach,
    doctors: dataByMeetingId?.doctors,
    modifiedOn: '',
  };

  const EditMeeting = async (values) => {
    const data = values;

    const result = await apieditmeeting(`/api/meeting`, data);
    setUserAction(result)
    if (result && result.status === 200) {
      fetchApiMeeting();
      handleCloseevent();
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const meetingData = {
        _id: values?._id,
        subject: values?.subject,
        city: values?.city,
        startDate: values?.startDate,
        bach: values?.bach,
        doctors: values?.doctors,
        modifiedOn: new Date()

      };
      EditMeeting(meetingData);
    },
  });

  const deleteData = async (id) => {
    const result = await deletemeetingApi(`/api/meeting/${id}`)
    setUserAction(result)
    handleCloseDeleteModel();
    handleCloseevent();
    fetchApiMeeting();
  }

  return (
    <div>

      <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} id={meetingsId} deleteData={deleteData} />

      <Dialog open={isOpen} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            // backgroundColor: "#2b4054",
            // color: "white",
          }}
        >
          <Typography variant="h6">Edit Meeting </Typography>
          <Typography>
            <ClearIcon onClick={handleCloseevent} style={{ cursor: 'pointer' }} />
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
                      disabled={userId?.id !== dataByMeetingId?.createdBy}
                      value={formik.values.subject || null}
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
                    options={City}
                    name='city'
                    disabled={userId?.id !== dataByMeetingId?.createdBy}
                    getOptionLabel={(option) => option?.name}
                    value={City.find(city => city?.name === formik.values.city) || null}
                    onChange={(event, newValue) => {
                      formik.setFieldValue('city', newValue?.name);
                    }}
                    renderInput={(params) =>
                      <TextField
                        {...params}
                        name='city'
                        error={formik.touched.city && Boolean(formik.errors.city)}
                        helperText={formik.touched.city && formik.errors.city}
                      />}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Start Date</FormLabel>
                  <TextField
                    name="startDate"
                    type={'datetime-local'}
                    size="small"
                    fullWidth
                    inputProps={{
                      min: dayjs().format('YYYY-MM-DD HH:mm')
                    }}
                    disabled={userId?.id !== dataByMeetingId?.createdBy}
                    value={dayjs(formik.values.startDate).format('YYYY-MM-DD HH:mm')}
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
                      disabled={userId?.id !== dataByMeetingId?.createdBy}
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
                      name="doctors"
                      multiple
                      size="small"
                      disabled={userId?.id !== dataByMeetingId?.createdBy}
                      value={formik.values.doctors}
                      onChange={(event, newValue) => {
                        formik.setFieldValue('doctors', newValue || null);
                      }}
                      options={names}
                      getOptionLabel={(option) => option || null}
                      disableCloseOnSelect
                      renderInput={(params) =>
                        <TextField
                          {...params}
                          error={formik.touched.doctors && Boolean(formik.errors.doctors)}
                          helperText={formik.touched.doctors && formik.errors.doctors}
                        />}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        {
          userId?.id === dataByMeetingId?.createdBy ?
            <>
              <DialogActions>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={formik.handleSubmit}
                  style={{ textTransform: 'capitalize' }}
                  color="secondary"
                // startIcon={<FiSave />}
                >
                  Save
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleOpenDeleteModel}
                  style={{ textTransform: 'capitalize' }}
                  color="error"
                // startIcon={<FiDelete />}
                >
                  Delete
                </Button>

                <Button
                  type="reset"
                  variant="outlined"
                  style={{ textTransform: 'capitalize' }}
                  // startIcon={<GiCancel />}
                  onClick={() => {
                    formik.resetForm();
                    handleCloseevent();
                  }}
                  color="error"
                >
                  Cancle
                </Button>
              </DialogActions>
            </>
            :
            " "
        }
      </Dialog>
    </div>
  );
};

export default EditMeeting;
