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

const Add = (props) => {
  // eslint-disable-next-line react/prop-types
  const { handleClose, open } = props;

  // -----------  validationSchema
  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    manager: yup.string().required('Manager is required'),
    department: yup.string().required('department is required'),
    teamMember: yup.string().required('teamMember is required'),
  });

  // -----------   initialValues
  const initialValues = {
    name: '',
    manager: '',
    lastName: '',
    department: '',
    teamMember: '',
  };

  // add user api
  const addUser = async (values) => {
    const data = {
      manager: values?.manager,

      name: values?.name,
      department: values?.department,
      teamMember: values?.teamMember,
    };

    console.log("datateam",data)
    // const result = await apipost('/api/auth/signup', data);

    // if (result && result.status === 200) {
    //   formik.resetForm();
    //   handleClose();
    //   toast.success(result.data.message);
    // } else {
    //   alert(result.error);
    // }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      addUser(values);
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
          <Typography variant="h6">Add New </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Name</FormLabel>
                <TextField
                  id="name"
                  name="name"
                  label=""
                  size="small"
                  maxRows={10}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Manager</FormLabel>
                <TextField
                  id="manager"
                  name="manager"
                  label=""
                  size="small"
                  value={formik.values.manager}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.manager && Boolean(formik.errors.manager)}
                  helperText={formik.touched.manager && formik.errors.manager}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Department</FormLabel>
                <TextField
                  id="department"
                  name="department"
                  label=""
                  size="small"
                  value={formik.values.department}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.department && Boolean(formik.errors.department)}
                  helperText={formik.touched.department && formik.errors.department}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>TeamMember</FormLabel>
                <TextField
                  id="teamMember"
                  name="teamMember"
                  label=""
                  size="small"
                  value={formik.values.teamMember}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.teamMember && Boolean(formik.errors.teamMember)}
                  helperText={formik.touched.teamMember && formik.errors.teamMember}
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

export default Add;
