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

const AddCallObjective = (props) => {
  // eslint-disable-next-line react/prop-types
  const { isOpenAdd, handleCloseAdd, fetchCallObjectiveData } = props;
  const dispatch = useDispatch();

  // -----------  validationSchema
  const validationSchema = yup.object({
    objectiveName: yup.string().required('Objective Name is required'),
    abbrevation: yup.string().required('Abbrevation is required'),
  });

  // -----------   initialValues
  const initialValues = {
    objectiveName: '',
    abbrevation: '',
  };

  const addCallObjective = async (values) => {
    const pyload = {
      objectiveName: values.objectiveName,
      abbrevation: values.abbrevation,
    };
    const result = await apipost('/api/callObjective', pyload);

    if (result && result.status === 200) {
      formik.resetForm();
      handleCloseAdd();
      dispatch(fetchCallObjectiveData());
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      addCallObjective(values);
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
          <Typography variant="h6">Add Call Objective</Typography>
          <Typography>
            <ClearIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Objective Name</FormLabel>
                <TextField
                  id="objectiveName"
                  name="objectiveName"
                  label=""
                  size="small"
                  maxRows={10}
                  placeholder="Enter Objective Name"
                  value={formik.values.objectiveName}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.objectiveName && Boolean(formik.errors.objectiveName)}
                  helperText={formik.touched.objectiveName && formik.errors.objectiveName}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Abbrevation</FormLabel>
                <TextField
                  id="abbrevation"
                  name="abbrevation"
                  label=""
                  size="small"
                  maxRows={10}
                  placeholder="Enter Abbrevation"
                  value={formik.values.abbrevation}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.abbrevation && Boolean(formik.errors.abbrevation)}
                  helperText={formik.touched.abbrevation && formik.errors.abbrevation}
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

export default AddCallObjective;
