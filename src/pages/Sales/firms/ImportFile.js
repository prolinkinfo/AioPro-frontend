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
import {
  Autocomplete,
  Box,
  Chip,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  MenuItem,
  Select,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { apiget, apipost, allusers } from '../../../service/api';

import { fetchCityData } from '../../../redux/slice/GetCitySlice';
import { fetchZoneData } from '../../../redux/slice/GetZoneSlice';
import { fetchDivisionData } from '../../../redux/slice/GetDivisionSlice';
import { fetchTypeData } from '../../../redux/slice/GetTypeSlice';
import { fetchCategoryData } from '../../../redux/slice/GetDoctorCategorySlice';
import { fetchEmployeeData } from '../../../redux/slice/GetEmployeeSlice';
import { firmaTypeData } from '../../../redux/slice/GetFirmTypesSlice';
import { fetchfirmData } from '../../../redux/slice/GetFirmSlice';

const ImportFile = (props) => {
  const { isOpen, handleClose } = props;
  const dispatch = useDispatch();
  const [firmList, setFirmList] = useState([]);

  // -----------  validationSchema
  const validationSchema = yup.object({
    // date: yup.string().required('Date is required'),
    // location: yup.string().required('Location is required'),
  });

  const initialValues = {
    firmType: '',
    employeeName: '',
    firmId: '',
    address: '',
    city: '',
    zone: '',
    firmName: '',
    visitDate: '',
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
      firmType: values.firmType,
      employeeName: values.employeeName,
      firmId: values.firmId,
      visitAddress: values.address,
      firmAddress: values.address,
      city: values.city,
      zone: values.zone,
      firmName: values.firmName,
      visitDate: values.visitDate,
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
      <Dialog open={isOpen} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">Import Firm</Typography>
          <Typography>
            <ClearIcon onClick={() => handleClose(false)} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1} height="200px">
              <Box width="500px">
                <Box
                  sx={{
                    border: '1px dotted #000',
                    height: '120px',
                    width: '100%',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    // textAlign:'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CloudUploadIcon />
                  <Input
                    type="file"
                    sx={{
                      // position: 'absolute',
                      width: '100%',
                      height: '100%',
                      top: '0',
                      left: '0',
                      opacity: '0',
                      cursor: 'pointer',
                      backgroundColor: 'greenyellow',
                    }}
                  />
                </Box>
              </Box>
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
            Save
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

export default ImportFile;
