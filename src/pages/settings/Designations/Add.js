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
import { apipost } from '../../../service/api';

const ActivityTypeAdd = (props) => {
  // eslint-disable-next-line react/prop-types
  const { isOpenAdd, handleCloseAdd, fetchTypeData } = props;

  // -----------  validationSchema
  const validationSchema = yup.object({
    parent: yup.string().required('Immediate Parent is required'),
    abbreviation: yup.string().required('Abbreviation is required'),
    designation: yup.string().required('Designation is required'),
    child: yup.string().required('Immediate Child is required'),
    workType: yup.string().required('Work Type is required'),
  });

  // -----------   initialValues
  const initialValues = {
    parent: '',
    abbreviation: '',
    designation: '',
    child: '',
    workType: '',
  };



  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const pyload = {
        parent: values.parent,
        abbreviation: values.abbreviation,
        designation: values.designation,
        child: values.child,
        workType: values.workType,
      };
      const result = await apipost('/api/designationsan', pyload);

      if (result && result.status === 200) {
        formik.resetForm();
        handleCloseAdd();
        fetchTypeData();
      }
    },
  });

  const BloodGroup = [
    { label: 'O+' },
    { label: 'O-' },
    { label: 'A+' },
    { label: 'A-' },
    { label: 'B+' },
    { label: 'B-' },
    { label: 'AB+' },
  ];

  const WorkType = [{ label: 'On Field' }, { label: 'OF Fice' }];

  return (
    <div>
      <Dialog open={isOpenAdd} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">Add Designation</Typography>
          <Typography>
            <ClearIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12}>
                <FormLabel>Immediate Parent</FormLabel>
                <Autocomplete
                  disablePortal
                  name="parent"
                  options={BloodGroup}
                  getOptionLabel={(option) => option.label} // Specify the label property
                  fullWidth
                  size="small"
                  value={BloodGroup.find((option) => option.label === formik.values.bloodGroup)}
                  onChange={(e, value) => formik.setFieldValue('parent', value?.label || null)} // Set the label as the value
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Immediate Parent"
                      error={formik.touched.bloodGroup && Boolean(formik.errors.bloodGroup)}
                      helperText={formik.touched.bloodGroup && formik.errors.bloodGroup}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Designation </FormLabel>
                <TextField
                  name="designation"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Designation"
                  value={formik.values.designation}
                  onChange={formik.handleChange}
                  error={formik.touched.designation && Boolean(formik.errors.designation)}
                  helperText={formik.touched.designation && formik.errors.designation}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Abbreviation </FormLabel>
                <TextField
                  name="abbreviation"
                  size="small"
                  maxRows={10}
                  fullWidth
                  placeholder="Abbreviation"
                  value={formik.values.abbreviation}
                  onChange={formik.handleChange}
                  error={formik.touched.abbreviation && Boolean(formik.errors.abbreviation)}
                  helperText={formik.touched.abbreviation && formik.errors.abbreviation}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Immediate Child</FormLabel>
                <Autocomplete
                  disablePortal
                  name="child"
                  options={BloodGroup}
                  getOptionLabel={(option) => option.label} // Specify the label property
                  fullWidth
                  size="small"
                  value={BloodGroup.find((option) => option.label === formik.values.bloodGroup)}
                  onChange={(e, value) => formik.setFieldValue('child', value?.label || null)} // Set the label as the value
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Immediate Child"
                      error={formik.touched.bloodGroup && Boolean(formik.errors.bloodGroup)}
                      helperText={formik.touched.bloodGroup && formik.errors.bloodGroup}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Work Type</FormLabel>
                <Autocomplete
                  disablePortal
                  name="workType"
                  options={WorkType}
                  getOptionLabel={(option) => option.label} // Specify the label property
                  fullWidth
                  size="small"
                  value={WorkType.find((option) => option.label === formik.values.workType)}
                  onChange={(e, value) => formik.setFieldValue('workType', value?.label || null)} // Set the label as the value
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Work Type"
                      error={formik.touched.bloodGroup && Boolean(formik.errors.bloodGroup)}
                      helperText={formik.touched.bloodGroup && formik.errors.bloodGroup}
                    />
                  )}
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
              handleCloseAdd();
            }}
          >
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ActivityTypeAdd;
