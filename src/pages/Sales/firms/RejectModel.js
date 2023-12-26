/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Autocomplete, Box, Chip, FormControl, FormHelperText, FormLabel, MenuItem, Select } from '@mui/material';
import { apiget, apipost, allusers } from '../../../service/api';

import { fetchCityData } from '../../../redux/slice/GetCitySlice';
import { fetchZoneData } from '../../../redux/slice/GetZoneSlice';
import { fetchDivisionData } from '../../../redux/slice/GetDivisionSlice';
import { fetchTypeData } from '../../../redux/slice/GetTypeSlice';
import { fetchCategoryData } from '../../../redux/slice/GetDoctorCategorySlice';
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';
import { firmaTypeData } from '../../../redux/slice/GetFirmTypesSlice';
import { fetchfirmData } from '../../../redux/slice/GetFirmSlice';

const RejectModel = (props) => {
  const { isOpen, handleClose } = props;
  const dispatch = useDispatch();
  const [firmList, setFirmList] = useState([]);

  // -----------  validationSchema
  const validationSchema = yup.object({
    msg: yup.string().required('Massage is required'),
    // location: yup.string().required('Location is required'),
  });

  const initialValues = {
    msg: '',
  };

  const employeeList = useSelector((state) => state?.getEmployee?.data);
  const firmData = useSelector((state) => state?.geFirmType?.data);
  const firm = useSelector((state) => state?.getFirm?.data);

  useEffect(() => {
    dispatch(fetchfirmData());
    dispatch(fetchCityData());
    dispatch(fetchZoneData());
    dispatch(fetchDivisionData());
    dispatch(fetchTypeData());
    dispatch(fetchCategoryData());
    dispatch(fetchEmployeeData());
    dispatch(firmaTypeData());
  }, []);

  const addVisit = async (values) => {
    const data = {
      msg: values.firmType,
      _id: 'id',
    };
    const result = await apipost('/api/firmVisit', data);
    if (result && result.status === 200) {
      formik.resetForm();
      handleClose(false);
    }
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      addVisit(values);
      resetForm();
    },
  });

  const fetchFirm = (firmType) => {
    const filteredFirm = firm?.filter((firm) => firm?.firmType?.toLowerCase() === firmType?.toLowerCase());
    setFirmList(filteredFirm);
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="md"
      >
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',

            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">Reject Reason</Typography>
          <Typography>
            <ClearIcon onClick={() => handleClose(false)} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Messeg</FormLabel>
                  <TextField
                    id="address"
                    name="msg"
                    size="small"
                    rows={4}
                    multiline
                    fullWidth
                    value={formik.values.msg}
                    onChange={formik.handleChange}
                    error={formik.touched.msg && Boolean(formik.errors.msg)}
                    helperText={formik.touched.msg && formik.errors.msg}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            onClick={formik.handleSubmit}
            style={{ textTransform: 'capitalize' }}
            color="secondary"
          >
            Send
          </Button>
          <Button
            type="reset"
            variant="outlined"
            style={{ textTransform: 'capitalize' }}
            onClick={() => {
              formik.resetForm();
              handleClose(false);
            }}
            color="error"
          >
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RejectModel;
