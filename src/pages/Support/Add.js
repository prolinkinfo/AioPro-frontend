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
import { useDispatch } from 'react-redux';
import { apipost } from '../../service/api';
// import { apipost } from '../../../service/api';

const AddTicket = (props) => {
  // eslint-disable-next-line react/prop-types
  const { isOpenAdd, handleCloseAdd } = props;
  const dispatch = useDispatch();

  // -----------  validationSchema
  const validationSchema = yup.object({
    subject: yup.string().required('Subject is required'),
    message: yup.string().required('Message is required'),
  });

  // -----------   initialValues
  const initialValues = {
    subject: '',
    message: '',
  };

  const addTicket = async (values) => {
    const pyload = {
      subject: values.subject,
      message: values.message
    };
    // const result = await apipost('/api/', pyload);

    // if (result && result.status === 200) {
    //   formik.resetForm();
    //   handleCloseAdd();
    // }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      addTicket(values);
    },
  });

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
          <Typography variant="h6">Add New Ticket</Typography>
          <Typography>
            <ClearIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Subject</FormLabel>
                <TextField
                  id="subject"
                  name="subject"
                  label=""
                  size="small"
                  maxRows={10}
                  autoFocus
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.subject && Boolean(formik.errors.subject)}
                  helperText={formik.touched.subject && formik.errors.subject}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Message</FormLabel>
                <TextField
                  id="message"
                  name="message"
                  size="small"
                  maxRows={10}
                  multiline
                  rows={5}
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.message && Boolean(formik.errors.message)}
                  helperText={formik.touched.message && formik.errors.message}
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

export default AddTicket;
