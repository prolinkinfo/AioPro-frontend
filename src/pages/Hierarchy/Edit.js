/* eslint-disable arrow-body-style */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Palette from '../../theme/palette';
import DeleteModel from '../../components/Deletemodle';
import { allusers, apiput, getsingleuser } from '../../service/api';

const Edit = ({ isOpenModel, handleCloseModel, id }) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [user, setuser] = useState({});

  const handleOpenDelete = () => setIsOpenDelete(true);
  const handleCloseDelete = () => setIsOpenDelete(false);

  const singleUser = async () => {
    const res = await getsingleuser(`/api/users`, id);
    if (res && res.status === 200) {
      setuser(res?.data);
    }
  };

  async function fetchdata() {
    const result = await allusers('/api/users');
    setAllUser(result?.data);
  }
  useEffect(() => {
    fetchdata();
    if (id) {
      singleUser();
    }
  }, [id]);

  const admin = allUser?.filter((user) => user?.role === 'Admin');
  const hr = allUser?.filter((user) => user?.role === 'Hr');
  const nationalManager = allUser?.filter((user) => user?.role === 'National Manager');
  const branchManager = allUser?.filter((user) => user?.role === 'Branch Manager');
  const zonalManager = allUser?.filter((user) => user?.role === 'Zonal Manager');
  const regionalManager = allUser?.filter((user) => user?.role === 'Regional Manager');
  const territoryManager = allUser?.filter((user) => user?.role === 'Territory Manager');

  const Validations = yup.object({
    role: yup.string().required('role is required'),
    parentId: yup.string().required('Manager is required'),
  });

  const formik = useFormik({
    initialValues: {
      role: user?.role ? user?.role : '',
      parentId: user?.parentId ? user?.parentId : '',
    },
    enableReinitialize: true,
    validationSchema: Validations,
    onSubmit: async (values, { resetForm }) => {
      const data = {
        _id: id,
        role: values?.role,
        parentId: values?.parentId,
        oldParentId: user?.parentId?._id ? user?.parentId?._id : '',
      };
      resetForm({ values: '' });
      const result = await apiput(`/api/users`, data);
      if (result && result?.status === 200) {
        handleCloseModel();
      }
    },
  });
  return (
    <div>
      <DeleteModel isOpenDeleteModel={isOpenDelete} handleCloseDeleteModel={handleCloseDelete} />

      <Dialog open={isOpenModel} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">Edit</Typography>
          <Typography>
            <ClearIcon onClick={handleCloseModel} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={12} md={12}>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <FormControl fullWidth style={{ minWidth: '500px' }}>
                  <Select
                    labelId="demo-simple-select-label"
                    name="role"
                    fullWidth
                    size="small"
                    value={formik.values.role || null}
                    onChange={formik.handleChange}
                    error={formik.touched.role && Boolean(formik.errors.role)}
                    helperText={formik.touched.role && formik.errors.role}
                  >
                    <MenuItem value="Hr">Hr</MenuItem>
                    {/* <MenuItem value="Admin">Admin </MenuItem> */}
                    <MenuItem value="National Manager">National Manager </MenuItem>
                    <MenuItem value="Branch Manager">Branch Manager </MenuItem>
                    <MenuItem value="Zonal Manager">Zonal Manager </MenuItem>
                    <MenuItem value="Regional Manager">Regional Manager </MenuItem>
                    <MenuItem value="Territory Manager">Territory Manager</MenuItem>
                  </Select>
                  <FormHelperText style={{ color: Palette.error.main }}>
                    {formik.touched.role && formik.errors.role}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <InputLabel id="demo-simple-select-label">Manager</InputLabel>
                <FormControl fullWidth style={{ minWidth: '500px' }}>
                  <Select
                    labelId="demo-simple-select-label"
                    name="parentId"
                    fullWidth
                    size="small"
                    value={formik.values.parentId}
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
                  <FormHelperText style={{ color: Palette.error.main }}>
                    {formik.touched.parentId && formik.errors.parentId}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            style={{ textTransform: 'capitalize' }}
            onClick={formik.handleSubmit}
          >
            Save
          </Button>
          <Button
            type="reset"
            variant="outlined"
            color="error"
            style={{ textTransform: 'capitalize' }}
            onClick={handleCloseModel}
          >
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Dialog open={isOpenModel} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">Add New </Typography>
          <Typography>
            <ClearIcon onClick={handleCloseModel} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={12} md={12}>
                hello open componethello open componethello open componethello open componethello open componethello open componethello open componethello open componethello open componethello open componethello open componethello open componet 
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
        </DialogActions>
      </Dialog> */}
    </div>
  );
};

export default Edit;
