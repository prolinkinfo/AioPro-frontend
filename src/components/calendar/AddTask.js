/* eslint-disable prefer-const */
import * as React from 'react';
import { useEffect, useState } from 'react';
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
import { FormLabel, Dialog, Button, Autocomplete, FormControl, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { apipost } from '../../service/api';

import { fetchZoneData } from '../../redux/slice/GetZoneSlice';
import { fetchCityData } from '../../redux/slice/GetCitySlice';

const AddTaskMOdel = ({ modelOpen, modelClose, event }) => {
  // eslint-disable-next-line react/prop-types

  const dispatch = useDispatch();
  const zoneList = useSelector((state) => state?.getZone?.data);
  const cityList = useSelector((state) => state?.getCity?.data);

  // -----------  validationSchema
  const validationSchema = yup.object({
    zone: yup.string().required('zone is required'),
    city: yup.string().required('city is required'),
  });

  // -----------   initialValues
  const initialValues = {
    zone: '',
    city: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('values', values);
      event(values);
      modelClose(false);
    },
  });

  useEffect(() => {
    dispatch(fetchZoneData());
    dispatch(fetchCityData());
  }, []);

  return (
    <div>
      <Dialog
        open={modelOpen}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        // sx={{width:'450px'}}
      >
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">Add </Typography>
          <Typography>
            <ClearIcon onClick={() => modelClose(false)} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <Box sx={{ width: '350px' }}>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Zone</FormLabel>
                <Autocomplete
                  disablePortal
                  name="zone"
                  options={zoneList}
                  fullWidth
                  size="small"
                  value={zoneList.find((zone) => zone.zoneName === formik.values.zone) || null}
                  onChange={(e, value) => formik.setFieldValue('zone', value ? value.zoneName : '')}
                  getOptionLabel={({ zoneName }) => zoneName} // Set the label to the 'divisionName' property
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Zone"
                      error={formik.touched.zone && Boolean(formik.errors.zone)}
                      helperText={formik.touched.zone && formik.errors.zone}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>City</FormLabel>
                <Autocomplete
                  disablePortal
                  name="city"
                  options={cityList}
                  fullWidth
                  size="small"
                  value={cityList.find((item) => item.cityName === formik.values.city) || null}
                  onChange={(e, value) => formik.setFieldValue('city', value ? value.cityName : '')}
                  getOptionLabel={({ cityName }) => cityName} // Set the label to the 'divisionName' property
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Zone"
                      error={formik.touched.zone && Boolean(formik.errors.zone)}
                      helperText={formik.touched.zone && formik.errors.zone}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            onClick={() => {
              formik.handleSubmit();
            }}
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
              modelClose(false);
            }}
          >
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTaskMOdel;
