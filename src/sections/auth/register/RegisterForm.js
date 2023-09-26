/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable arrow-body-style */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, IconButton, InputAdornment, TextField, FormHelperText, MenuItem, Select, FormControl, InputLabel, Button, Typography, Avatar, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { allusers, apipost } from '../../../service/api';
import Iconify from '../../../components/iconify';
import palette from '../../../theme/palette';


export default function RgisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alluser, setAllUser] = useState([]);

  const initialValues = {
    avatar: '',
    email: '',
    password: '',
    confirmPassword: '',
    lastName: '',
    firstName: '',
    role: '',
    parentId: ''
  };

  // validationSchema
  const validationSchema = yup.object({
    lastName: yup.string().required('Last Name is required'),
    firstName: yup.string().required('First Name is required'),
    role: yup.string().required('Role is required'),
    parentId: yup.string().required('Manager is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Must Contain minimum 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password'), null], 'Password does not match'),
  });

  const Adddata = async (values) => {
    const data = new FormData()
    data.append("avatar", values?.avatar)
    data.append("firstName", values?.firstName)
    data.append("lastName", values?.lastName)
    data.append("email", values?.email)
    data.append("role", values?.role === "Hr" || values?.role === "Admin"
      ? "National Manager"
      : values?.role === "National Manager"
        ? "Branch Manager"
        : values?.role === "Branch Manager"
          ? "Zonal Manager"
          : values?.role === "Zonal Manager"
            ? "Regional Manager"
            : values?.role === "Regional Manager"
              ? "Territory Manager"
              : "",)
    data.append("parentId", values?.parentId)
    data.append("password", values?.password)
    data.append("confirmPassword", values?.confirmPassword)
    const result = await apipost('/api/auth/signup', data);
    if (result && result.status === 200) {
      navigate('/login');
    }
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => Adddata(values),
  });

  async function fetchdata() {
    const result = await allusers('/api/users');
    if (result && result.status === 200) {
      setAllUser(result?.data);
    }
  }

  const admin = alluser?.filter(user => user?.role === "Admin");
  const hr = alluser?.filter(user => user?.role === "Hr");
  const nationalManager = alluser?.filter(user => user?.role === "National Manager");
  const branchManager = alluser?.filter(user => user?.role === "Branch Manager");
  const zonalManager = alluser?.filter(user => user?.role === "Zonal Manager");
  const regionalManager = alluser?.filter(user => user?.role === "Regional Manager");
  const territoryManager = alluser?.filter(user => user?.role === "Territory Manager");


  useEffect(() => {
    fetchdata();
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile(e.target.result);
      };
      reader.readAsDataURL(file);
    }
    formik.setFieldValue('avatar', file);
  };


  return (

    <>
      <form>
        <Stack spacing={3} mb={2}>

          <Box style={{ textAlign: 'center' }}>
            {selectedFile ?
              <Avatar alt="Avatar" src={selectedFile} sx={{ width: 100, height: 100, margin: '16px auto',borderRadius:"50%" }} />
              :
              <img src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} style={{ width: 100, height: 100, margin: '16px auto' ,borderRadius:"50%"}} />
            }
            <Typography variant="h6">Upload Avatar</Typography>
            <input
              accept="image/*"
              type="file"
              id="avatar-upload"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <label htmlFor="avatar-upload">
              <Button component="span" variant="outlined" color="primary">
                Upload
              </Button>
            </label>
          </Box>
          <TextField
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="role"
              label="Role"
              fullWidth
              value={formik.values.role || null}
              onChange={formik.handleChange}
              error={
                formik.touched.role &&
                Boolean(formik.errors.role)
              }
              helperText={
                formik.touched.role && formik.errors.role
              }
            >
              <MenuItem value="Hr">Hr</MenuItem>
              <MenuItem value="Admin">Admin </MenuItem>
              <MenuItem value="National Manager">National Manager </MenuItem>
              <MenuItem value="Branch Manager">Branch Manager </MenuItem>
              <MenuItem value="Zonal Manager">Zonal Manager </MenuItem>
              <MenuItem value="Regional Manager">Regional Manager </MenuItem>
              <MenuItem value="Territory Manager">Territory Manager</MenuItem>
            </Select>
            <FormHelperText style={{ color: palette.error.main }}>{formik.touched.role && formik.errors.role}</FormHelperText>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Manager</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="parentId"
              label="Manager"
              fullWidth
              value={formik.values.parentId}
              onChange={formik.handleChange}
              error={
                formik.touched.parentId &&
                Boolean(formik.errors.parentId)
              }
              helperText={
                formik.touched.parentId && formik.errors.parentId
              }
            >
              {
                formik?.values?.role === "Hr" ?
                  hr?.map((item) => {
                    return (
                      <MenuItem key={item?._id} value={item?._id}>
                        {`${item?.firstName} ${item?.lastName}`}
                      </MenuItem>
                    );
                  }) : formik?.values?.role === "Admin" ?
                    admin?.map((item) => {
                      return (
                        <MenuItem key={item?._id} value={item?._id}>
                          {`${item?.firstName} ${item?.lastName}`}
                        </MenuItem>
                      );
                    }) : formik?.values?.role === "National Manager" ?
                      nationalManager?.map((item) => {
                        return (
                          <MenuItem key={item?._id} value={item?._id}>
                            {`${item?.firstName} ${item?.lastName}`}
                          </MenuItem>
                        );
                      }) : formik?.values?.role === "Branch Manager" ?
                        branchManager?.map((item) => {
                          return (
                            <MenuItem key={item?._id} value={item?._id}>
                              {`${item?.firstName} ${item?.lastName}`}
                            </MenuItem>
                          );
                        }) : formik?.values?.role === "Zonal Manager" ?
                          zonalManager?.map((item) => {
                            return (
                              <MenuItem key={item?._id} value={item?._id}>
                                {`${item?.firstName} ${item?.lastName}`}
                              </MenuItem>
                            );
                          }) : formik?.values?.role === "Regional Manager" ?
                            regionalManager?.map((item) => {
                              return (
                                <MenuItem key={item?._id} value={item?._id}>
                                  {`${item?.firstName} ${item?.lastName}`}
                                </MenuItem>
                              );
                            }) : formik?.values?.role === "Territory Manager" ?
                              territoryManager?.map((item) => {
                                return (
                                  <MenuItem key={item?._id} value={item?._id}>
                                    {`${item?.firstName} ${item?.lastName}`}
                                  </MenuItem>
                                );
                              }) : ""
              }
            </Select>
            <FormHelperText style={{ color: palette.error.main }}>{formik.touched.parentId && formik.errors.parentId}</FormHelperText>
          </FormControl>

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
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                    <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
        </Stack>
      </form>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={formik.handleSubmit}>
        Sign up
      </LoadingButton>
    </>
  );
}
