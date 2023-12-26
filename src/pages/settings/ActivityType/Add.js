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
import { useDispatch } from 'react-redux';
import { apipost } from '../../../service/api';

const ActivityTypeAdd = (props) => {
  // eslint-disable-next-line react/prop-types
  const { isOpenAdd, handleCloseAdd, fetchActivityTypeData } = props;
  const dispatch = useDispatch();

  // -----------  validationSchema
  const validationSchema = yup.object({
    activityName: yup.string().required('Activity Name is required'),
  });

  // -----------   initialValues
  const initialValues = {
    activityName: '',
  };

  const addType = async (values) => {
    const pyload = {
      activityName: values.activityName,
    };
    const result = await apipost('/api/activityType', pyload);

    if (result && result.status === 200) {
      formik.resetForm();
      handleCloseAdd();
      dispatch(fetchActivityTypeData());
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      addType(values);
    },
  });

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
          <Typography variant="h6">Add Activity Type Name </Typography>
          <Typography>
            <ClearIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Activity Type Name</FormLabel>
                <TextField
                  id="typeName"
                  name="activityName"
                  label=""
                  size="small"
                  maxRows={10}
                  placeholder="Enter Type Name"
                  value={formik.values.activityName}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.activityName && Boolean(formik.errors.activityName)}
                  helperText={formik.touched.activityName && formik.errors.activityName}
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
