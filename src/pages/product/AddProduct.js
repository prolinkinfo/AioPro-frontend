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
import { FormLabel, Dialog, Button } from '@mui/material';
import { apipost } from '../../service/api';

const AddProduct = (props) => {
  const { handleClose, open } = props;
  const user = JSON.parse(localStorage.getItem('user'));

  // -----------  validationSchema
  const validationSchema = yup.object({
    name: yup.string().required('Product Name is required'),
    category: yup.string().required('Product Category is required'),
    price: yup.string().required('Price is required'),
    quantity: yup.string().required('Quantity is required'),
  });

  // -----------   initialValues
  const initialValues = {
    name: '',
    category: '',
    price: '',
    quantity: '',
    description: '',
    createdBy: user?.id,
  };

  // add user api

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const result = await apipost('/api/product', values);
      if (result && result.status === 200) {
        handleClose();
      }
    },
  });

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
          <Typography variant="h6">Add Product </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Product Name</FormLabel>
                <TextField
                  id="firstName"
                  name="name"
                  size="small"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Category</FormLabel>
                <TextField
                  name="category"
                  size="small"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.category && Boolean(formik.errors.category)}
                  helperText={formik.touched.category && formik.errors.category}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Price</FormLabel>
                <TextField
                  name="price"
                  size="small"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Quantity</FormLabel>
                <TextField
                  name="quantity"
                  size="small"
                  type='number'
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                  helperText={formik.touched.quantity && formik.errors.quantity}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Description</FormLabel>
                <TextField
                  name="description"
                  size="small"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  fullWidth
                  multiline
                  rows={4}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
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
            }}
          >
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddProduct;
