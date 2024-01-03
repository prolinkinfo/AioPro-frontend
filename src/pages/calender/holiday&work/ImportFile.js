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
import DescriptionIcon from '@mui/icons-material/Description';
import { apiget, apipost, allusers } from '../../../service/api';

const ImportFile = (props) => {
  const { isOpen, handleClose } = props;
  const [selectedFile, setSelectedFile] = useState(null);

  // -----------  validationSchema
  const validationSchema = yup.object({
    csvFile: yup.string().required('file is required'),
  });

  const initialValues = {
    csvFile: '',
  };

  const addVisit = async (values) => {
    const data = new FormData();
    data.append('csvFile', values?.csvFile);

    const result = await apipost('/api/holidaycalendar/csv', data);
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
    },
  });

  const handleFileChange = (e) => {
    const file = e?.currentTarget?.files[0];
    if (file?.type === 'text/csv') {
      setSelectedFile(e?.target?.files[0]);
      formik.setFieldValue('csvFile', file);
    } else {
      alert('Invalid file. Please select a CSV file');
    }
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
                {selectedFile ? (
                  <Box>
                    <DescriptionIcon />
                    <Typography>{selectedFile?.name}</Typography>
                    <Typography>{selectedFile.size}</Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      border: '1px dotted #000',
                      height: '120px',
                      width: '100%',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      // textAlign:'center',
                      // display: 'flex',
                      // alignItems: 'center',
                      // justifyContent: 'center',
                      // flexDirection:'column'
                    }}
                  >
                    {/* <CloudUploadIcon style={{position:'absolute'}} /> */}
                    <Input
                      type="file"
                      onChange={handleFileChange}
                      sx={{
                        // position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: '0',
                        left: '0',
                        opacity: '0',
                        cursor: 'pointer',
                        // display:'none',
                        // backgroundColor: 'greenyellow',
                      }}
                    />
                  </Box>
                )}
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
              setSelectedFile(null);
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
