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
import { apipost } from '../../service/api';

const Upload = (props) => {
    const { isOpenUpload, handleCloseUpload, folderId, fetchFolder } = props;

    // -----------  validationSchema
    const validationSchema = yup.object({
        fileName: yup.string().required('File Name is required'),
    });

    // -----------   initialValues
    const initialValues = {
        fileName: ''
    };

    const addFile = async (values) => {
        const formData = new FormData()
        formData.append("fileName", values?.fileName)
        formData.append("folderId", folderId)
        const result = await apipost('/api/files', formData);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseUpload();
            fetchFolder();
        }
    }


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            addFile(values)
        },
    });

    return (
        <Dialog open={isOpenUpload} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
            <DialogTitle
                id="scroll-dialog-title"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant="h6">Upload File</Typography>
                <Typography>
                    <ClearIcon onClick={handleCloseUpload} style={{ cursor: 'pointer' }} />
                </Typography>
            </DialogTitle>

            <DialogContent dividers>
                <form>
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                        <Grid item xs={12} sm={12} md={12}>
                            <FormLabel>File Name</FormLabel>
                            <TextField
                                id="fileName"
                                name="fileName"
                                type='file'
                                size="small"
                                accept=".jpg, .jpeg, .png, .pdf, .xls, .xlsx"
                                maxRows={10}
                                onChange={(e) =>
                                    formik.setFieldValue("fileName", e.currentTarget.files[0])
                                }
                                fullWidth
                                error={formik.touched.fileName && Boolean(formik.errors.fileName)}
                                helperText={formik.touched.fileName && formik.errors.fileName}
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
                    Upload
                </Button>
                <Button
                    type="reset"
                    variant="outlined"
                    color="error"
                    style={{ textTransform: 'capitalize' }}
                    onClick={() => {
                        formik.resetForm();
                        handleCloseUpload();
                    }}
                >
                    Cancle
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Upload
