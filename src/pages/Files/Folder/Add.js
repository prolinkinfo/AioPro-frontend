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
import { FormLabel, Dialog, Button, Autocomplete, FormControl } from '@mui/material';
import { apipost } from '../../../service/api';

const AddFolder = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenAdd, handleCloseAdd ,fetchFolder} = props;

    // -----------  validationSchema
    const validationSchema = yup.object({
        folderName: yup.string().required('Folder is required'),
    });

    // -----------   initialValues
    const initialValues = {
        folderName: ''
    };

    const addFolder = async (values) => {
        const pyload = {
            folderName: values.folderName
        }
        const result = await apipost('/api/folder/createFolder', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseAdd();
            fetchFolder();
        }
    }


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            addFolder(values)
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
                    <Typography variant="h6">Create Folder </Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Folder</FormLabel>
                                <TextField
                                    id="folderName"
                                    name="folderName"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    value={formik.values.folderName}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.folderName && Boolean(formik.errors.folderName)}
                                    helperText={formik.touched.folderName && formik.errors.folderName}
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

export default AddFolder;
