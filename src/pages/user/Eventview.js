import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import dayjs from 'dayjs';
import { GiCancel } from 'react-icons/gi';
import { FiSave } from 'react-icons/fi';
import { adduser, apieditmeeting } from '../../service/api';
// import { Link } from 'react-router-dom';
// import DeleteTask from './components/deleteTask';
// import EditTask from './components/editTask';

const EventView = (props) => {
  const { onClose, isOpen, info, getdata, handleCloseevent, iD } = props;
  const [data, setData] = useState();
  const [edit, setEdit] = useState(false);
  const [deleteModel, setDelete] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const [isLoding, setIsLoding] = useState(false);
  const navigate = useNavigate();

  const fetchViewData = async () => {
    if (info) {
      setIsLoding(true);
      setIsLoding(false);
    }
  };

  useEffect(() => {
    fetchViewData();
  }, [info]);

  const handleViewOpen = () => {
    // navigate(user?.role !== 'admin' ? `/view/${info}` : `/admin/view/${info}`);
  };

  // -----------   initialValues
  const validationSchema = yup.object({
    subject: yup.string().required('Subject is required'),
    status: yup.string().required('Status is required'),
    startDate: yup.string().required('Start Date is required'),
    location: yup.string().required('Location is required'),
    duration: yup.string().required('Duration is required'),
    note: yup.string().required('Note is required'),
  });

  console.log('id1111111111111', iD);

  const initialValues = {
    subject: iD?.subject,
    status: iD?.status,
    startDate: iD?.startDate,
    duration: iD?.duration ? iD?.duration : '15 minutes',
    location: iD?.location,
    note: iD?.note,
    modifiedOn: '',
  };

  const EditMeeting = async (values) => {
    const data = { ...values, _id: iD._id };
    console.log('data123456', data);

    const result = await apieditmeeting(`/api/meeting`, data);
    console.log('data', result);
    if (result && result.status === 200) {
      handleCloseevent();
      getdata();
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const meetingData = {
        subject: values.subject,
        status: values.status,
        startDate: values.startDate,
        duration: values.duration,
        location: values.location,
        note: values.note,
      };
      EditMeeting(meetingData);
    },
  });

  return (
    <div>
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
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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
            startIcon={<FiSave />}
          >
            Save
          </Button>
          <Button
            type="reset"
            variant="outlined"
            style={{ textTransform: 'capitalize' }}
            startIcon={<GiCancel />}
            onClick={() => {
              formik.resetForm();
              handleCloseevent();
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

export default EventView;
