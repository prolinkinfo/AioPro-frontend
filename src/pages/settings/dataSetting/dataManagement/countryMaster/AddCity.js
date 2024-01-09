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
import { FormLabel, Dialog, Button, Autocomplete, FormControl } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { apiget, apipost } from '../../../../../service/api';
import { fetchStateData } from '../../../../../redux/slice/GetStateSlice';
import { fetchCountryData } from '../../../../../redux/slice/getCountrySlice';

const AddCity = (props) => {
  // eslint-disable-next-line react/prop-types
  const { isOpenCity, handleCloseCity, fetchCityData } = props;

  const dispatch = useDispatch();

  const stateList = useSelector((state) => state?.getState?.data);
  const countryList = useSelector((state) => state?.getCountry?.data);

  // -----------  validationSchema
  const validationSchema = yup.object({
    countryName: yup.string().required('Country Name is required'),
    stateName: yup.string().required('State Name is required'),
    cityName: yup.string().required('City Name is required'),
  });

  // -----------   initialValues
  const initialValues = {
    countryName: '',
    stateName: '',
    cityName: '',
  };

  const addCity = async (values) => {
    const pyload = {
      countryName: values.countryName,
      stateName: values.stateName,
      cityName: values.cityName
    };
    const result = await apipost('/api/citymaster', pyload);

    if (result && result.status === 200) {
      formik.resetForm();
      handleCloseCity();
      fetchCityData();
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      addCity(values);
    },
  });


  useEffect(() => {
    dispatch(fetchStateData());
    dispatch(fetchCountryData());
  }, [])

  return (
    <div>
      <Dialog open={isOpenCity} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">Add City </Typography>
          <Typography>
            <ClearIcon onClick={handleCloseCity} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Country</FormLabel>
                <FormControl fullWidth>
                  <Autocomplete
                    size="small"
                    onChange={(event, newValue) => {
                      formik.setFieldValue('countryName', newValue ? newValue.countryName : '');
                    }}
                    options={countryList}
                    value={countryList.find((country) => country.countryName === formik.values.countryName) || null}
                    getOptionLabel={(country) => country?.countryName}
                    style={{ textTransform: 'capitalize' }}
                    clearIcon
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        style={{ textTransform: 'capitalize' }}
                        placeholder="Select Country"
                        error={formik.touched.countryName && Boolean(formik.errors.countryName)}
                        helperText={formik.touched.countryName && formik.errors.countryName}
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>State</FormLabel>
                <FormControl fullWidth>
                  <Autocomplete
                    size="small"
                    onChange={(event, newValue) => {
                      formik.setFieldValue('stateName', newValue ? newValue.stateName : '');
                    }}
                    options={stateList}
                    value={stateList.find((state) => state.stateName === formik.values.stateName) || null}
                    getOptionLabel={(state) => state?.stateName}
                    style={{ textTransform: 'capitalize' }}
                    clearIcon
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        style={{ textTransform: 'capitalize' }}
                        placeholder="Select Country"
                        error={formik.touched.stateName && Boolean(formik.errors.stateName)}
                        helperText={formik.touched.stateName && formik.errors.stateName}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>City Name</FormLabel>
                <TextField
                  id="cityName"
                  name="cityName"
                  label=""
                  size="small"
                  maxRows={10}
                  placeholder="Enter City Name"
                  value={formik.values.cityName}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.cityName && Boolean(formik.errors.cityName)}
                  helperText={formik.touched.cityName && formik.errors.cityName}
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
              handleCloseCity();
            }}
          >
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCity;
