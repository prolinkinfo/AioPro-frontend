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
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import {
    Box,
    Input,
    TextField,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { apipost } from '../service/api';


const ImportFile = (props) => {
    const { isOpenImport, setIsOpenImport } = props;
    const [selectedFile, setSelectedFile] = useState(null);

    // -----------  validationSchema
    const validationSchema = yup.object({
        csvFile: yup.string().required('file is required'),
    });

    const initialValues = {
        csvFile: '',
    };

    const importFile = async (values) => {
        const data = new FormData();
        data.append('csvFile', values?.csvFile);

        const result = await apipost('/api/firm/csv', data);
        if (result && result.status === 200) {
            formik.resetForm();
            setIsOpenImport(false);
        }
    };

    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            importFile(values);
            resetForm();
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
            <Dialog open={isOpenImport} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
                <DialogTitle
                    id="scroll-dialog-title"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h6">Import File</Typography>
                    <Typography>
                        <ClearIcon onClick={() => setIsOpenImport(false)} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <DialogContentText id="scroll-dialog-description" tabIndex={-1} >
                            <TextField type='file' fullWidth size='small' onChange={handleFileChange}/>
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
                            setIsOpenImport(false);
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
