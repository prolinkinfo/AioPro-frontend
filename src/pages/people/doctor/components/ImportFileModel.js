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
    TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FieldSelectModel from './FieldSelectModel';

const ImportFileModel = (props) => {
    const { isOpenImport, close } = props;
    const [open, setOpen] = useState(false);
    const [fileData, setFileData] = useState(null);

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
                close();
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
            <FieldSelectModel open={open} close={() => setOpen(false)} fileData={fileData}/>
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
                        <ClearIcon onClick={() => close()} style={{ cursor: 'pointer' }} />
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
                            close();
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
