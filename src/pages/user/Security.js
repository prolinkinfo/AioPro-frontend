/* eslint-disable react/prop-types */
import { Box, Button, Card, FormLabel, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { apiput } from '../../service/api';

const Security = (props) => {
  const Validations = yup.object({
    oldPassword: yup.string().required("Old Password is required"),
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Must Contain minimum 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
    confirmPassword: yup
      .string()
      .required('Please enter Re-enter Password')
      .oneOf([yup.ref('password'), null], 'Password does not match'),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
    enableReinitialize: true,
    validationSchema: Validations,
    onSubmit: async (values, { resetForm }) => {
      console.log('values', values);
      const data = {
        oldPassword: values?.oldPassword,
        password: values?.password,
        confirmPassword: values?.confirmPassword,
        email: props?.email,
      };
      resetForm({ values: '' });
      const result = await apiput(`/api/users/updatePassword`, data);

      console.log('result', result);
    },
  });

  return (
    <>
      <div style={{ marginTop: '20px' }}>
        <form>
          <Card style={{ padding: '20px' }}>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 4, md: 3 }}>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Old Password</FormLabel>
                <TextField
                  name="oldPassword"
                  type='password'
                  value={formik.values.oldPassword}
                  onChange={formik.handleChange}
                  fullWidth
                  size='small'
                  error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                  helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>New Password</FormLabel>
                <TextField
                  name="password"
                  type='password'
                  size='small'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
              <FormLabel>Confirm Password</FormLabel>
                <TextField
                  name="confirmPassword"
                  size='small'
                  type='password'
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} textAlign={'right'}>
                <Button variant="contained" type='submit' onClick={formik.handleSubmit}>Save Changes</Button>
              </Grid>
            </Grid>
          </Card>
        </form>
      </div>
    </>
  );
};

export default Security;
