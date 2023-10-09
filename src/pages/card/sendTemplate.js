/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-constant-condition */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
import * as React from 'react';
import { useEffect } from 'react';
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
import { FormLabel, Dialog, Button } from '@mui/material';
import { apipost } from '../../service/api';

const SendTemplate = (props) => {
  // eslint-disable-next-line react/prop-types
  const { handleClose, open, data } = props;
  const user = JSON.parse(localStorage.getItem('user'));

  // -----------  validationSchema
  const validationSchema = yup.object({
    subject: yup.string().required('Subject is Required'),
    to: yup.string().email('Invalid email').required('To is required'),
    form: yup.string().email('Invalid email').required('From is required'),
  });

  // -----------   initialValues
  const initialValues = {
    subject: '',
    to: '',
    form: '',
  };

  // add user api

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const datas = {
        to: values?.to,
        form: values?.form,
        subject: values?.subject,
        templateId: data?.id,
      };
      const result = await apipost('/api/greetingCard/send', datas);
      if (result && result.status === 200) {
        handleClose();
      }
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
          }}
        >
          <Typography variant="h6">Greeting Card </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Subject</FormLabel>
                <TextField
                  name="subject"
                  size="small"
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.subject && Boolean(formik.errors.subject)}
                  helperText={formik.touched.subject && formik.errors.subject}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>To</FormLabel>
                <TextField
                  id="firstName"
                  name="to"
                  size="small"
                  value={formik.values.to}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.to && Boolean(formik.errors.to)}
                  helperText={formik.touched.to && formik.errors.to}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>From</FormLabel>
                <TextField
                  name="form"
                  size="small"
                  value={formik.values.form}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.form && Boolean(formik.errors.form)}
                  helperText={formik.touched.form && formik.errors.form}
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
              handleClose();
            }}
          >
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SendTemplate;
