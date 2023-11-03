import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import CircularProgress from '@mui/material/CircularProgress';
import { apipost } from '../../../service/api';
import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLogin] = useState(false);

  const initialValues = {
    login: '',
    password: '',
  };

  // -----------  validationSchema
  const validationSchema = yup.object({
    // email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const Adddata = async (values) => {
    setIsLogin(true);
    const data = values;

    try {
      const result = await apipost('/api/auth/login', data);
      console.log('result', result);
      if (result && result.status === 200) {
        localStorage.setItem('userName', JSON.stringify(result?.data?.userData?.userName));
        localStorage.setItem('user', JSON.stringify(result?.data?.userData));
        localStorage.setItem('user_id', result?.data?.userData?.id);
        localStorage.setItem('userRole', result?.data?.userData?.role);

        const user = JSON.parse(localStorage.getItem('user'));
        const userRole = user?.role.toLowerCase();

        navigate(`/${userRole}/dashboard/app`);
        return;
      }
    } catch (error) {
      console.log('error', error);
      toast.error(error.message || 'Email or password are incorrect');
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
            name="login"
            label="Email or EmployeId"
            value={formik.values.login}
            onChange={formik.handleChange}
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
          />
          {/* <TextField
            name="employeId"
            label="EmployeId"
            value={formik.values.employeId}
            onChange={formik.handleChange}
            error={formik.touched.employeId && Boolean(formik.errors.employeId)}
            helperText={formik.touched.employeId && formik.errors.employeId}
          /> */}

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
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel control={<Checkbox name="remember" />} label="Remember me" />
          <Link to="/resetpassword" variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={!!isLoading}>
          {isLoading ? <CircularProgress /> : 'Login'}
        </LoadingButton>
      </form>
    </>
  );
}
