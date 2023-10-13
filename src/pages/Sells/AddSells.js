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
import { FormLabel, Dialog, Button, Autocomplete, InputAdornment, OutlinedInput, FormHelperText } from '@mui/material';
import { allusers, apiget, apipost } from '../../service/api';

const AddSells = (props) => {
  const { handleClose, open } = props;
  const [productList, setProductList] = React.useState([]);
  const [userList, setUserList] = React.useState([]);
  const [productPrice, setProductPrice] = React.useState("");
  const [productQty, setProductQty] = React.useState("");
  const user = JSON.parse(localStorage.getItem('user'));

  // -----------  validationSchema
  const validationSchema = yup.object({
    productName: yup.string().required('Product Name is required'),
    // quantity: yup.string().required('Quantity is required'),
    // price: yup.string().required('Price is required'),
    userName: yup.string().required('User Name is required'),
  });

  // -----------   initialValues
  const initialValues = {
    productName: '',
    quantity: '',
    totalAmount: '',
    userName: '',
    createdBy: user?.id,
  };


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        productId: values.productName,
        quantity: values.quantity,
        productPrice,
        totalAmount: values.totalAmount,
        userId: values.userName
      }
      const result = await apipost('/api/seles', payload);
      if (result && result.status === 200) {
        handleClose();
        formik.resetForm();
      }
    },
  });

  const reset = () => {
    setProductQty("")
    setProductPrice("")
  }

  const handleChange = (quantity) => {
    formik.setFieldValue("quantity", quantity)
    const totalPrice = quantity * productPrice
    formik.setFieldValue("totalAmount", totalPrice || 0)
  }

  async function fetchData() {
    const result = await apiget('/api/product');
    if (result && result.status === 200) {
      setProductList(result?.data);
    }
  }

  async function fetchUserData() {
    const result = await allusers('/api/users');
    if (result && result.status === 200) {
      setUserList(result?.data?.filter((user) => user?.role !== 'Dr'));
    }
  }

  React.useEffect(() => {
    fetchData();
    fetchUserData();
  }, []);


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
          <Typography variant="h6">Add Sell Details </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Product Name</FormLabel>
                <Autocomplete
                  id="product-autocomplete"
                  options={productList}
                  getOptionLabel={(product) => product.name}
                  value={productList.find(product => product._id === formik.values.productName) || null}
                  onChange={(event, newValue) => {
                    formik.setFieldValue("productName", newValue ? newValue._id : "");
                    setProductPrice(newValue?.price)
                    setProductQty(newValue?.quantity)
                  }}
                  error={formik.touched.productName && Boolean(formik.errors.productName)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      error={formik.touched.productName && Boolean(formik.errors.productName)}
                      helperText={formik.touched.productName && formik.errors.productName}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Quantity</FormLabel>
                <TextField
                  name="quantity"
                  size="small"
                  value={formik.values.quantity}
                  onChange={(e) => handleChange(e.target.value)}
                  fullWidth
                  error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                  helperText={productQty && `Total Quantity : ${productQty} `}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Price</FormLabel>
                <OutlinedInput
                  name="price"
                  size="small"
                  value={formik.values.totalAmount}
                  onChange={formik.handleChange}
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">&#8377;</InputAdornment>
                  }
                  error={formik.touched.totalAmount && Boolean(formik.errors.totalAmount)}
                />
                <FormHelperText>{productPrice && `Per Product : ${productPrice}`} {productPrice && <span>&#8377;</span>} </FormHelperText>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>User Name</FormLabel>
                <Autocomplete
                  id="userName-autocomplete"
                  options={userList}
                  getOptionLabel={(user) => `${user.firstName} ${user.lastName}`}
                  value={userList.find(user => user._id === formik.values.userName) || null}
                  onChange={(event, newValue) => {
                    formik.setFieldValue("userName", newValue ? newValue._id : "");
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      error={formik.touched.userName && Boolean(formik.errors.userName)}
                      helperText={formik.touched.userName && formik.errors.userName}
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
            onClick={() => {
              formik.handleSubmit();
              reset();
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
              handleClose();
              reset();
            }}
          >
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddSells;
