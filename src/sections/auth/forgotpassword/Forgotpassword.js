import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useFormik } from 'formik';
import * as yup from 'yup';

import CircularProgress from '@mui/material/CircularProgress';
import { apiput } from '../../../service/api';
import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

export default function Forgotpassword() {
  const { token } = useParams();

  console.log('paraps', token);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLogin] = useState(false);

  const initialValues = {
    token: '',
    password: '',
    confirmPassword: '',
  };

  // -----------  validationSchema
  const validationSchema = yup.object({
    password: yup.string().required('Password is required'),
    confirmPassword: yup
      .string()
      .required('confirmPassword is required')
      .oneOf([yup.ref('password'), null], 'Password does not match'),
  });

  const Adddata = async (values) => {
    setIsLogin(true);
    const data = { ...values, token };

    console.log('data12345678', data);
    const result = await apiput('/api/auth/forgotPassword', data);
    console.log('dataforget', result);
    if (result && result.status === 200) {
      alert('password updated successfully');
      navigate('/login');
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
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            name="confirmPassword"
            label="confirmPassword"
            type={showPassword ? 'text' : 'confirmPassword'}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
