/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable arrow-body-style */
import { Avatar, Box, Button, Card, Container, FormLabel, Grid, Stack, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import React from 'react'
import * as yup from 'yup';

const Branding = () => {

    const [selectedFile, setSelectedFile] = React.useState(null);


    // -----------  validationSchema
    const validationSchema = yup.object({
        companyName: yup.string().required('Company Name is required'),
        contactNo: yup.string().required('Contact No is required'),
    });

    // -----------   initialValues
    const initialValues = {
        companyLogo: '',
        companyName: '',
        officeAddress: '',
        contactNo: ''
    };

    const addDivision = async (values) => {
        //    const data = new FormData()
        //    data.append('divisionName', values?.divisionName);
        //    data.append('appLogo', values?.appLogo);

        //     const result = await apipost('/api/division', data);

        //     if (result && result.status === 200) {
        //         formik.resetForm();
        //         setSelectedFile('')
        //     }
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

        }
        formik.setFieldValue('companyLogo', file);
    };

    const clear = () => {
        setSelectedFile('');
    };

    return (
        <div>
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Branding</Typography>
                </Stack>
                <Box width="50%" pt={3}>
                    <div style={{ marginTop: '20px' }}>
                        <form>
                            <Card style={{ padding: '20px' }}>
                                <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 4, md: 3 }}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Box style={{ textAlign: 'center' }}>
                                            {selectedFile ? (
                                                <img
                                                    alt="Avatar"
                                                    src={selectedFile}
                                                    style={{ width: 200, height: 200, margin: '16px auto', }}
                                                />
                                            ) : (
                                                <img
                                                    src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                                                    style={{ width: 200, height: 200, margin: '16px auto', }}
                                                />
                                            )}
                                            <Typography variant="h6">Company Logo</Typography>
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
                                                        {selectedFile ? "Change" : "Upload"}
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
                                        <FormLabel>Company Name</FormLabel>
                                        <TextField
                                            id="companyName"
                                            name="companyName"
                                            label=""
                                            size="small"
                                            maxRows={10}
                                            value={formik.values.companyName}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                                            helperText={formik.touched.companyName && formik.errors.companyName}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormLabel>Office Address</FormLabel>
                                        <TextField
                                            id="officeAddress"
                                            name="officeAddress"
                                            label=""
                                            size="small"
                                            maxRows={10}
                                            value={formik.values.officeAddress}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            error={formik.touched.officeAddress && Boolean(formik.errors.officeAddress)}
                                            helperText={formik.touched.officeAddress && formik.errors.officeAddress}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormLabel>Contact No</FormLabel>
                                        <TextField
                                            id="contactNo"
                                            name="contactNo"
                                            type='number'
                                            size="small"
                                            maxRows={10}
                                            value={formik.values.contactNo}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            error={formik.touched.contactNo && Boolean(formik.errors.contactNo)}
                                            helperText={formik.touched.contactNo && formik.errors.contactNo}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} textAlign={'right'}>
                                        <Button variant="contained" type="submit" onClick={formik.handleSubmit}>
                                            Update
                                        </Button>
                                        <Button variant="outlined" color='error' style={{ marginLeft: "10px" }} onClick={()=>{
                                            formik.handleReset();
                                            clear();
                                        }}>
                                            Cancle
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Card>
                        </form>
                    </div>
                </Box>
            </Container>
        </div>
    )
}

export default Branding