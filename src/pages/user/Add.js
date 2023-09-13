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
import { FormLabel, Dialog, Button, Select, MenuItem, FormControl } from '@mui/material';
import { adduser } from '../../service/api';

const Add = (props) => {
  // eslint-disable-next-line react/prop-types
  const { handleClose, open } = props;

  // -----------  validationSchema
  const validationSchema = yup.object({
    firstName: yup.string().required('Frist Name is required'),
    lastName: yup.string().required('Last Name is required'),
    emailAddress: yup.string().email('Invalid email').required('Email is required'),
    role: yup.string().required('role is required'),
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
  };

  // add user api
  const addUser = async (values) => {
    const data = {
      email: values?.emailAddress,
      password: values?.password,
      confirmPassword: values?.confirmPassword,
      role: values?.role,
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
                <FormControl sx={{ m: 1, minWidth: 530, minHeight: 1 }}>
                  <Select
                    name="role"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formik.values.role}
                    label="role"
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="TerritoryManager">Territory Manager (TM)</MenuItem>
                    <MenuItem value="NationalManager">National Manager (NM)</MenuItem>
                    <MenuItem value="ZonalManager">Zonal Manager (ZM)</MenuItem>
                    <MenuItem value="RegionalManager, ">Regional Manager (RM) </MenuItem>
                    <MenuItem value="BranchManager">Branch Manager (BM)</MenuItem>
                  </Select>
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
                <FormLabel>confirmPassword</FormLabel>
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
