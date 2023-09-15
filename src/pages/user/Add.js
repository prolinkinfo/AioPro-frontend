/* eslint-disable no-constant-condition */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
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
import { FormLabel, Dialog, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { adduser, allusers } from '../../service/api';
import palette from '../../theme/palette';

const Add = (props) => {
  // eslint-disable-next-line react/prop-types
  const { handleClose, open } = props;
  const [alluser, setAllUser] = React.useState([]);

  // -----------  validationSchema
  const validationSchema = yup.object({
    firstName: yup.string().required('Frist Name is required'),
    lastName: yup.string().required('Last Name is required'),
    emailAddress: yup.string().email('Invalid email').required('Email is required'),
    role: yup.string().required('Role is required'),
    parentId:yup.string().required('Manager is required'),
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

  // -----------   initialValues
  const initialValues = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    role: '',
    parentId:''
  };

  // add user api
  const addUser = async (values) => {
    const data = {
      email: values?.emailAddress,
      password: values?.password,
      confirmPassword: values?.confirmPassword,
      role: values?.role === "Hr" || "Admin" ? "National Manager" : values?.role === "National Manager" ? "Branch Manager" : values?.role === "Branch Manager" ? "Zonal Manager" : values?.role === "Zonal Manager" ? "Regional Manager" : values?.role === "Regional Manager" ? "Territory Manager" : "",
      parentId:values?.parentId,
      firstName: values?.firstName,
      lastName: values?.lastName,
    };

    const result = await adduser('/api/auth/signup', data);

    if (result && result.status === 200) {
      formik.resetForm();
      handleClose();
      toast.success(result.data.message);
    } else {
      alert(result.error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      addUser(values);
    },
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


  React.useEffect(() => {
    fetchdata();
  }, []);


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
          <Typography variant="h6">Add New </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>First name</FormLabel>
                <TextField
                  id="firstName"
                  name="firstName"
                  label=""
                  size="small"
                  maxRows={10}
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Last name</FormLabel>
                <TextField
                  id="lastName"
                  name="lastName"
                  label=""
                  size="small"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Email</FormLabel>
                <TextField
                  id="emailAddress"
                  name="emailAddress"
                  label=""
                  size="small"
                  value={formik.values.emailAddress}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.emailAddress && Boolean(formik.errors.emailAddress)}
                  helperText={formik.touched.emailAddress && formik.errors.emailAddress}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Role</FormLabel>
                <FormControl fullWidth>
                  <Select
                    name="role"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formik.values.role}
                    size="small"
                    fullWidth
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
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Manager</FormLabel>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    name="parentId"
                    size='small'
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
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Password</FormLabel>
                <TextField
                  id="password"
                  name="password"
                  label=""
                  size="small"
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
                  id="confirmPassword"
                  name="confirmPassword"
                  label=""
                  size="small"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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

export default Add;
