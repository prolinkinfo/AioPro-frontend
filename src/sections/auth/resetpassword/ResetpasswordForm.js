import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useFormik } from 'formik';
import * as yup from 'yup';

import CircularProgress from '@mui/material/CircularProgress';
import { resetpassword } from '../../../service/api';
import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLogin] = useState(false);

  const initialValues = {
    email: '',
  };

  // -----------  validationSchema
  const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
  });

  const Adddata = async (values) => {
    setIsLogin(true);
    const data = values;
    const result = await resetpassword('/api/auth/forgotPassword/sendMails', data);
    if (result && result.status === 200) {
      alert(result?.data);
    } else {
      alert('Please Provide valied Email');
    }

    setIsLogin(false);
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      Adddata(values);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3} mb={2}>
          <TextField
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel control={<Checkbox name="remember" />} label="Remember me" />
        </Stack>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={!!isLoading}>
          {isLoading ? <CircularProgress /> : 'Forget Password'}
        </LoadingButton>
      </form>
    </>
  );
}
