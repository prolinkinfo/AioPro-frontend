/* eslint-disable no-unneeded-ternary */
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
import { FormLabel, Dialog, Button, Autocomplete, FormControl, FormControlLabel, Checkbox } from '@mui/material';
import { useDispatch } from 'react-redux';
import { apipost } from '../../../service/api';

const AddExpenseHead = (props) => {
  // eslint-disable-next-line react/prop-types
  const { isOpenAdd, handleCloseAdd, fetchExpenseHeadData } = props;
  const dispatch = useDispatch();
  
  // -----------  validationSchema
  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
  });

  // -----------   initialValues
  const initialValues = {
    title: '',
    monthlyCap: '',
    isEditable: '',
  };

  const addHead = async (values) => {
    const pyload = {
      title: values.title,
      monthlyCap: values.monthlyCap,
      isEditable: values.isEditable === true ? "Yes" : "No",
      status: "active",
    };

    const result = await apipost('/api/expenseHead', pyload);

    if (result && result.status === 200) {
      formik.resetForm();
      handleCloseAdd();
      dispatch(fetchExpenseHeadData());
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      addHead(values);
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
          <Typography variant="h6">Add Head</Typography>
          <Typography>
            <ClearIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Title</FormLabel>
                <TextField
                  id="title"
                  name="title"
                  label=""
                  size="small"
                  maxRows={10}
                  placeholder="Enter Title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Monthly Cap</FormLabel>
                <TextField
                  id="monthlyCap"
                  name="monthlyCap"
                  label=""
                  size="small"
                  maxRows={10}
                  placeholder="Enter Monthly Cap"
                  value={formik.values.monthlyCap}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.monthlyCap && Boolean(formik.errors.monthlyCap)}
                  helperText={formik.touched.monthlyCap && formik.errors.monthlyCap}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormControlLabel control={<Checkbox checked={formik.values.isEditable}
                  onChange={(e) => formik.setFieldValue('isEditable', e.target.checked)} />} name='isEditable' labelPlacement="start" label="Is Editable" />
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

export default AddExpenseHead;
