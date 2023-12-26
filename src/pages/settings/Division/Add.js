/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
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
import { FormLabel, Dialog, Button, Autocomplete, FormControl, Box, Avatar, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { apipost } from '../../../service/api';

const AddDivision = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenAdd, handleCloseAdd, fetchDivisionData } = props;
    const [selectedFile, setSelectedFile] = React.useState(null);
    const dispatch = useDispatch();
    // -----------  validationSchema
    const validationSchema = yup.object({
        divisionName: yup.string().required('Division Name is required'),
    });

    // -----------   initialValues
    const initialValues = {
        divisionName: '',
        appLogo: ''
    };

    const addDivision = async (values) => {
       const data = new FormData()
       data.append('divisionName', values?.divisionName);
       data.append('appLogo', values?.appLogo);

        const result = await apipost('/api/division', data);

        if (result && result.status === 200) {
            formik.resetForm();
            setSelectedFile('')
            handleCloseAdd();
            dispatch(fetchDivisionData());
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            addDivision(values)
            console.log(values)
        },
    });

    const handleFileChange = (e) => {
        const file = e.currentTarget.files[0];
        if (file) {
            // Read the selected file and set it in state.
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedFile(e.target.result);
            };
            reader.readAsDataURL(file);

            // Update the formik field value with the selected file.
        }
        formik.setFieldValue('appLogo', file);
    };

    const clear = () => {
        setSelectedFile('');
    };

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
                    <Typography variant="h6">Add Division </Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <Box style={{ textAlign: 'center' }}>
                                    {selectedFile ? (
                                        <Avatar
                                            alt="Avatar"
                                            src={selectedFile}
                                            sx={{ width: 100, height: 100, margin: '16px auto', borderRadius: '50%' }}
                                        />
                                    ) : (
                                        <img
                                            src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                                            style={{ width: 100, height: 100, margin: '16px auto', borderRadius: '50%' }}
                                        />
                                    )}
                                    <Typography variant="h6">Upload App Logo</Typography>
                                    <input
                                        accept="image/*"
                                        type="file"
                                        id="avatar-upload"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    <div>
                                        <label htmlFor="avatar-upload" >
                                            <Button component="span" variant="outlined" color="primary">
                                                {selectedFile ? "Change" : "Upload" }
                                            </Button>
                                        </label>
                                        {
                                            selectedFile ?
                                                <Button component="span" variant="outlined" color="error" style={{ marginLeft: "10px" }} onClick={clear}>
                                                    Clear
                                                </Button> : ""
                                        }
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Division Name</FormLabel>
                                <TextField
                                    id="divisionName"
                                    name="divisionName"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Division Name'
                                    value={formik.values.divisionName}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.divisionName && Boolean(formik.errors.divisionName)}
                                    helperText={formik.touched.divisionName && formik.errors.divisionName}
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
                            clear();
                        }}
                    >
                        Cancle
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddDivision;
