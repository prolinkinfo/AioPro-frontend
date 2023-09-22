/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
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
import { FormLabel, Dialog, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText, Paper, Avatar, Box } from '@mui/material';
import { adduser, allusers, apipost } from '../../service/api';
import palette from '../../theme/palette';

const Add = (props) => {
  // eslint-disable-next-line react/prop-types
  const { handleClose, open } = props;
  const [alluser, setAllUser] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const user = JSON.parse(localStorage.getItem('user'));


  // -----------  validationSchema
  const validationSchema = yup.object({
    firstName: yup.string().required('Frist Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    role: yup.string().required('Role is required'),
    parentId: yup.string().required('Manager is required'),
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



  const admin = alluser?.filter(user => user?.role === "Admin");
  const hr = alluser?.filter(user => user?.role === "Hr");
  const nationalManager = alluser?.filter(user => user?.role === "National Manager");
  const branchManager = alluser?.filter(user => user?.role === "Branch Manager");
  const zonalManager = alluser?.filter(user => user?.role === "Zonal Manager");
  const regionalManager = alluser?.filter(user => user?.role === "Regional Manager");
  const territoryManager = alluser?.filter(user => user?.role === "Territory Manager");


  // -----------   initialValues
  const initialValues = {
    avatar: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: user?.role,
    parentId: user?.id,
    createdBy: user?.id
  };

  // add user api
  const addUser = async (values) => {
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
    data.append("createdBy", values?.createdBy)

    // const data = {
    //   email: values?.emailAddress,
    //   password: values?.password,
    //   confirmPassword: values?.confirmPassword,
    //   role:
    //     values?.role === "Hr" || values?.role === "Admin"
    //       ? "National Manager"
    //       : values?.role === "National Manager"
    //         ? "Branch Manager"
    //         : values?.role === "Branch Manager"
    //           ? "Zonal Manager"
    //           : values?.role === "Zonal Manager"
    //             ? "Regional Manager"
    //             : values?.role === "Regional Manager"
    //               ? "Territory Manager"
    //               : "",

    //   parentId: values?.parentId,
    //   firstName: values?.firstName,
    //   lastName: values?.lastName,
    // };

    const result = await apipost('/api/auth/signup', data);

    if (result && result.status === 200) {
      formik.resetForm();
      setSelectedFile('')
      handleClose();
      toast.success(result.data.message);
    } else {
      // alert(result.error);
    }
  };

  async function fetchdata() {
    const result = await allusers('/api/users');
    if (result && result.status === 200) {
      setAllUser(result?.data);
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      addUser(values);
      fetchdata();
    },
  });

  React.useEffect(() => {
    fetchdata();
  }, []);


  const handleFileChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      // Read the selected file and set it in state.
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile(e.target.result);
      };
      reader.readAsDataURL(file);

      // Update the formik field value with the selected file.
    }
    formik.setFieldValue('avatar', file);
  };

  const clear = () => {
    setSelectedFile('')
  }

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
                <Box style={{ textAlign: 'center' }}>
                  {selectedFile ?
                    <Avatar alt="Avatar" src={selectedFile} sx={{ width: 100, height: 100, margin: '16px auto', borderRadius: "50%" }} />
                    :
                    <img src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} style={{ width: 100, height: 100, margin: '16px auto', borderRadius: "50%" }} />
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
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>First Name</FormLabel>
                <TextField
                  id="firstName"
                  name="firstName"
                  label=""
                  size="small"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Last Name</FormLabel>
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
                  id="email"
                  name="email"
                  label=""
                  size="small"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
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
                        disabled={user?.role !== "Admin"}
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
                    disabled={user?.role !== "Admin"}
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
              clear();
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
