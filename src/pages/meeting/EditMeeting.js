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
} from '@mui/material';
import dayjs from 'dayjs';
import { GiCancel } from 'react-icons/gi';
import { FiDelete, FiSave } from 'react-icons/fi';
import { adduser, apidelete, apieditmeeting, apiget, deletemeetingApi } from '../../service/api';
import DeleteModel from '../../components/Deletemodle'

const EditMeeting = (props) => {
  const {  isOpen, meetingsId, fetchApiMeeting, handleCloseevent, dataByMeetingId, setUserAction } = props;


  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false)

  

  const handleOpenDeleteModel = () => setIsOpenDeleteModel(true)
  const handleCloseDeleteModel = () => setIsOpenDeleteModel(false)

  // -----------   initialValues
  const validationSchema = yup.object({
    title: yup.string().required('Subject is required'),
    status: yup.string().required('Status is required'),
    start: yup.string().required('Start Date is required'),
    location: yup.string().required('Location is required'),
    duration: yup.string().required('Duration is required'),
    note: yup.string().required('Note is required'),
  });


  const initialValues = {
    _id: dataByMeetingId?._id,
    title: dataByMeetingId?.title,
    status: dataByMeetingId?.status,
    start: dataByMeetingId?.start,
    end: dataByMeetingId?.end,
    duration: dataByMeetingId?.duration,
    location: dataByMeetingId?.location,
    backgroundColor: dataByMeetingId?.backgroundColor,
    textColor: dataByMeetingId?.textColor,
    note: dataByMeetingId?.note,
    modifiedOn: '',
  };

  const EditMeeting = async (values) => {
    const data = values;
    console.log('data123456', data);

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
        _id: values._id,
        title: values.title,
        status: values.status,
        start: values.start,
        end: values.end,
        duration: values.duration,
        location: values.location,
        backgroundColor: values.backgroundColor,
        textColor: values.textColor,
        note: values.note,
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

      <DeleteModel isOpenDeleteModel={isOpenDeleteModel} handleCloseDeleteModel={handleCloseDeleteModel} id={meetingsId} deleteData={deleteData}/>

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
                    id="title"
                    name="title"
                    size="small"
                    maxRows={10}
                    fullWidth
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
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
                    name="start"
                    type={'datetime-local'}
                    size="small"
                    fullWidth
                    value={dayjs(formik.values.start).format('YYYY-MM-DD HH:mm:ss')}
                    onChange={formik.handleChange}
                    error={formik.touched.start && Boolean(formik.errors.start)}
                    helperText={formik.touched.start && formik.errors.start}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>End Date</FormLabel>
                  <TextField
                    name="end"
                    type={'datetime-local'}
                    size="small"
                    fullWidth
                    value={dayjs(formik.values.end).format('YYYY-MM-DD HH:mm:ss')}
                    onChange={formik.handleChange}
                    error={formik.touched.end && Boolean(formik.errors.end)}
                    helperText={formik.touched.end && formik.errors.end}
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
                    error={
                      formik.touched.backgroundColor &&
                      Boolean(formik.errors.backgroundColor)
                    }
                    helperText={
                      formik.touched.backgroundColor && formik.errors.backgroundColor
                    }
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
                    error={
                      formik.touched.textColor &&
                      Boolean(formik.errors.textColor)
                    }
                    helperText={
                      formik.touched.textColor && formik.errors.textColor
                    }
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
            type="submit"
            variant="contained"
            onClick={handleOpenDeleteModel}
            style={{ textTransform: 'capitalize' }}
            color="error"
            startIcon={<FiDelete />}
          >
            Delete
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

export default EditMeeting;
