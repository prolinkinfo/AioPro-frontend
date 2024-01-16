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
import { useNavigate } from 'react-router-dom';
import BackDateVisitModel from './BackDateVisitModel';

const ImportFileModel = (props) => {
    const { isOpenImport, setIsOpenImport } = props;
    const [open, setOpen] = useState(false);
    const [fileData, setFileData] = useState(null);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const userRole = user?.role.toLowerCase();
    // -----------  validationSchema
    const validationSchema = yup.object({
        backDateVisit: yup.string().required('file is required'),
    });

    const initialValues = {
        backDateVisit: '',
    };


    // formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            if (values.backDateVisit) {
                // navigate(`/${userRole}/dashboard/visits/doctorvisit/backDateImport`, { state: { fileData: values.backDateVisit } });
                setFileData(values.backDateVisit)
                setIsOpenImport(false)
                setOpen(true);
            }
        },
    });

    const handleFileChange = (e) => {
        const file = e?.currentTarget?.files[0];
        formik.setFieldValue('backDateVisit', file);
    };

    return (
        <div>
            <BackDateVisitModel open={open} close={() => setOpen(false)} fileData={fileData}/>
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
                            <TextField type='file' fullWidth size='small' onChange={handleFileChange} />
                        </DialogContentText>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        variant="contained"
                        style={{ textTransform: 'capitalize' }}
                        color="secondary"
                        onClick={formik.handleSubmit}
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

export default ImportFileModel;
