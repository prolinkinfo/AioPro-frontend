/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Avatar, Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import { useEffect, useState } from 'react';
import { allusers, apiget, apiput } from '../../service/api';
// import { FiSave } from "react-icons/fi";
// import { GiCancel } from "react-icons/gi";

const Edit = (props) => {
  const { handleClose, open, user, fetchdata } = props;
  const [userDetails, setUserDetails] = useState({});
  const [Role, setrole] = useState(user?.row?.role);
  const [alluser, setAllUser] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [img, setImg] = useState(null);

  // -----------  validationSchema
  const validationSchema = yup.object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
  });

  // -----------   initialValues
  const initialValues = {
    avatar: user?.row?.avatar,
    firstName: user?.row?.firstName,
    lastName: user?.row?.lastName,
    email: user?.row?.email,
    role: user?.row?.role,
    parentId: user?.row?.parentId,
  };

  // fetch api
  const fetch = async () => {
    const result = await apiget(`user/view/${user}`);
    if (result && result.status === 200) {
      setUserDetails(result.data);
    }
  };

  // edit api
  const EditUser = async (values) => {
    const data = {
      _id: user?.row?._id,
      firstName: values?.firstName,
      lastName: values?.lastName,
      email: values?.emailAddress,
      role: values?.role,
      parentId: values?.parentId,
    };

    const result = await apiput(`/api/users`, data);

    if (result && result.status === 200) {
      handleClose();
    }
  };

  async function fetchdatas() {
    const result = await allusers('/api/users');
    if (result && result.status === 200) {
      setAllUser(result?.data);
    }
  }

  const formik = useFormik({
    initialValues,
    // validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const userData = {
        avatar: values.avatar,
        firstName: values.firstName,
        lastName: values.lastName,
        emailAddress: values.emailAddress,
        role: values?.role,
        parentId: values.parentId,
        modifiedAt: new Date(),
      };
      EditUser(userData);
      fetchdatas();
    },
  });

  useEffect(() => {
    fetch();
    fetchdatas();
  }, []);

  const hr = alluser?.filter((user) => {
    return user?.role === 'Hr';
  });
  const admin = alluser?.filter((user) => {
    return user?.role === 'Admin';
  });
  const nationalManager = alluser?.filter((user) => {
    return user?.role === 'National Manager';
  });
  const branchManager = alluser?.filter((user) => {
    return user?.role === 'Branch Manager';
  });
  const zonalManager = alluser?.filter((user) => {
    return user?.role === 'Zonal Manager';
  });
  const regionalManager = alluser?.filter((user) => {
    return user?.role === 'Regional Manager';
  });
  const territoryManager = alluser?.filter((user) => {
    return user?.role === 'Territory Manager';
  });

  const handleFileChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      // Read the selected file and set it in state.
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile(e.target.result);
        // setSelectedFile(user?.row?.avatar)
      };
      reader.readAsDataURL(file);

      // Update the formik field value with the selected file.
    }
    formik.setFieldValue('avatar', file);
  };

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
          <Typography variant="h6">User </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={12} md={12}>
                <Box style={{ textAlign: 'center' }}>
                  {selectedFile ? (
                    <Avatar
                      alt="Avatar"
                      src={selectedFile}
                      sx={{ width: 100, height: 100, margin: '16px auto', borderRadius: '50%' }}
                    />
                  ) : (
                    <img
                      src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                      style={{ width: 100, height: 100, margin: '16px auto', borderRadius: '50%' }}
                    />
                  )}
                  <Typography variant="h6">Upload Avatar</Typography>
                  <TextField
                    accept="image/*"
                    type="file"
                    id="avatar-upload"
                    name="avatar"
                    style={{ display: 'none' }}
                    // onChange={(event) => {
                    //   console.log(event?.currentTarget?.files[0])
                    //   formik.setFieldValue("avatar", event?.currentTarget?.files[0]);
                    // }}
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
                  size="small"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <FormLabel style={{ marginLeft: '30px', marginBottom: '-20px', marginTop: '20px' }}>Role</FormLabel>
              <Grid item xs={12} sm={12} md={12} style={{ display: 'flex' }}>
                <FormControl fullWidth>
                  <Select
                    name="role"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formik.values.role || null}
                    size="small"
                    fullWidth
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="Hr">Hr</MenuItem>
                    <MenuItem value="Admin">Admin </MenuItem>
                    <MenuItem value="National Manager">National Manager </MenuItem>
                    <MenuItem value="Branch Manager">Branch Manager </MenuItem>
                    <MenuItem value="Zonal Manager">Zonal Manager </MenuItem>
                    <MenuItem value="Regional Manager">Regional Manager </MenuItem>
                    <MenuItem value="Territory Manager">Territory Manager</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Manager</FormLabel>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    name="parentId"
                    size="small"
                    fullWidth
                    value={formik.values.parentId || null}
                    onChange={formik.handleChange}
                    error={formik.touched.parentId && Boolean(formik.errors.parentId)}
                    helperText={formik.touched.parentId && formik.errors.parentId}
                  >
                    {formik?.values?.role === 'Hr'
                      ? hr?.map((item) => {
                          return (
                            <MenuItem key={item?._id} value={item?._id}>
                              {`${item?.firstName} ${item?.lastName}`}
                            </MenuItem>
                          );
                        })
                      : formik?.values?.role === 'National Manager'
                      ? admin?.map((item) => {
                          return (
                            <MenuItem key={item?._id} value={item?._id}>
                              {`${item?.firstName} ${item?.lastName}`}
                            </MenuItem>
                          );
                        })
                      : formik?.values?.role === 'Branch Manager'
                      ? nationalManager?.map((item) => {
                          return (
                            <MenuItem key={item?._id} value={item?._id}>
                              {`${item?.firstName} ${item?.lastName}`}
                            </MenuItem>
                          );
                        })
                      : formik?.values?.role === 'Zonal Manager'
                      ? branchManager?.map((item) => {
                          return (
                            <MenuItem key={item?._id} value={item?._id}>
                              {`${item?.firstName} ${item?.lastName}`}
                            </MenuItem>
                          );
                        })
                      : formik?.values?.role === 'Regional Manager'
                      ? zonalManager?.map((item) => {
                          return (
                            <MenuItem key={item?._id} value={item?._id}>
                              {`${item?.firstName} ${item?.lastName}`}
                            </MenuItem>
                          );
                        })
                      : formik?.values?.role === 'Territory Manager'
                      ? regionalManager?.map((item) => {
                          return (
                            <MenuItem key={item?._id} value={item?._id}>
                              {`${item?.firstName} ${item?.lastName}`}
                            </MenuItem>
                          );
                        })
                      : ''}
                  </Select>
                </FormControl>
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

export default Edit;
