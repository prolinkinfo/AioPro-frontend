/* eslint-disable jsx-a11y/alt-text */
import { Box, Button, Card, Container, FormLabel, Grid, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react'
import * as yup from 'yup';

const PersonalSettings = () => {
    const [selectedFile, setSelectedFile] = React.useState(null);


    // -----------  validationSchema
    const validationSchema = yup.object({
        // name: yup.string().required('Name is required'),
        // phoneNo: yup.string().required('Phone No is required'),
        // city: yup.string().required('City is required'),
        // alternateEmail: yup.string().required('Alternate Emaili required'),
        // gstinNo: yup.string().required('GSTIN No is required'),
        // panNo: yup.string().required('PAN No is required'),
        // drugLicenseNo: yup.string().required('Drug License No is required'),
        // tanNo: yup.string().required('TAN No is required'),
        // fssaiNo: yup.string().required('FSSAI No is required'),
        // branchName: yup.string().required('Branch Name is required'),
        // bankName: yup.string().required('Bank Name is required'),
        // ifscNo: yup.string().required('IFSC No is required'),
        // accountNo: yup.string().required('Account No is required')
    });

    // -----------   initialValues
    const initialValues = {
        companyLogo: '',
        name: '',
        phoneNo: '',
        city: '',
        alternateEmail: '',
        gstinNo: '',
        panNo: '',
        drugLicenseNo: '',
        tanNo: '',
        fssaiNo: '',
        branchName: '',
        bankName: '',
        ifscNo: '',
        accountNo: '',
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
                    <Typography variant="h4">Personal Settings</Typography>
                </Stack>
                <Box width="50%" pt={3}>
                    <div style={{ marginTop: '20px' }}>
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
                                        <Typography variant="h6">Profile Image</Typography>
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
                                    <FormLabel>Email Id</FormLabel>
                                    <TextField
                                        id="emailId"
                                        name="emailId"
                                        label=""
                                        size="small"
                                        disabled
                                        maxRows={10}
                                        value={formik.values.emailId}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        error={formik.touched.emailId && Boolean(formik.errors.emailId)}
                                        helperText={formik.touched.emailId && formik.errors.emailId}
                                    />
                                </Grid>
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
                                    <FormLabel>Phone No</FormLabel>
                                    <TextField
                                        id="phoneNo"
                                        name="phoneNo"
                                        type='number'
                                        size="small"
                                        maxRows={10}
                                        value={formik.values.phoneNo}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        error={formik.touched.phoneNo && Boolean(formik.errors.phoneNo)}
                                        helperText={formik.touched.phoneNo && formik.errors.phoneNo}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>City</FormLabel>
                                    <TextField
                                        id="city"
                                        name="city"
                                        type='number'
                                        size="small"
                                        maxRows={10}
                                        value={formik.values.city}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        error={formik.touched.city && Boolean(formik.errors.city)}
                                        helperText={formik.touched.city && formik.errors.city}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Division</FormLabel>
                                    <TextField
                                        id="division"
                                        name="division"
                                        size="small"
                                        disabled
                                        maxRows={10}
                                        value={formik.values.division}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        error={formik.touched.division && Boolean(formik.errors.division)}
                                        helperText={formik.touched.division && formik.errors.division}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Alternate Email</FormLabel>
                                    <TextField
                                        id="alternateEmail"
                                        name="alternateEmail"
                                        size="small"
                                        maxRows={10}
                                        value={formik.values.alternateEmail}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        error={formik.touched.alternateEmail && Boolean(formik.errors.alternateEmail)}
                                        helperText={formik.touched.alternateEmail && formik.errors.alternateEmail}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>GSTIN No.</FormLabel>
                                    <TextField
                                        id="gstinNo"
                                        name="gstinNo"
                                        size="small"
                                        maxRows={10}
                                        value={formik.values.gstinNo}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        error={formik.touched.gstinNo && Boolean(formik.errors.gstinNo)}
                                        helperText={formik.touched.gstinNo && formik.errors.gstinNo}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>PAN No.</FormLabel>
                                    <TextField
                                        id="panNo"
                                        name="panNo"
                                        size="small"
                                        maxRows={10}
                                        value={formik.values.panNo}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        error={formik.touched.panNo && Boolean(formik.errors.panNo)}
                                        helperText={formik.touched.panNo && formik.errors.panNo}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Drug License No.</FormLabel>
                                    <TextField
                                        id="drugLicenseNo"
                                        name="drugLicenseNo"
                                        size="small"
                                        maxRows={10}
                                        value={formik.values.drugLicenseNo}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        error={formik.touched.drugLicenseNo && Boolean(formik.errors.drugLicenseNo)}
                                        helperText={formik.touched.drugLicenseNo && formik.errors.drugLicenseNo}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>TAN No.</FormLabel>
                                    <TextField
                                        id="tanNo"
                                        name="tanNo"
                                        size="small"
                                        maxRows={10}
                                        value={formik.values.tanNo}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        error={formik.touched.tanNo && Boolean(formik.errors.tanNo)}
                                        helperText={formik.touched.tanNo && formik.errors.tanNo}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>FSSAI No</FormLabel>
                                    <TextField
                                        id="fssaiNo"
                                        name="fssaiNo"
                                        size="small"
                                        maxRows={10}
                                        value={formik.values.fssaiNo}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        error={formik.touched.fssaiNo && Boolean(formik.errors.fssaiNo)}
                                        helperText={formik.touched.fssaiNo && formik.errors.fssaiNo}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Branch Name</FormLabel>
                                    <TextField
                                        id="branchName"
                                        name="branchName"
                                        size="small"
                                        maxRows={10}
                                        value={formik.values.branchName}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        error={formik.touched.branchName && Boolean(formik.errors.branchName)}
                                        helperText={formik.touched.branchName && formik.errors.branchName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Bank Name</FormLabel>
                                    <TextField
                                        id="bankName"
                                        name="bankName"
                                        size="small"
                                        maxRows={10}
                                        value={formik.values.bankName}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        error={formik.touched.bankName && Boolean(formik.errors.bankName)}
                                        helperText={formik.touched.bankName && formik.errors.bankName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>IFSC No.</FormLabel>
                                    <TextField
                                        id="ifscNo"
                                        name="ifscNo"
                                        size="small"
                                        maxRows={10}
                                        value={formik.values.ifscNo}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        error={formik.touched.ifscNo && Boolean(formik.errors.ifscNo)}
                                        helperText={formik.touched.ifscNo && formik.errors.ifscNo}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <FormLabel>Account No.</FormLabel>
                                    <TextField
                                        id="accountNo"
                                        name="accountNo"
                                        size="small"
                                        maxRows={10}
                                        value={formik.values.accountNo}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        error={formik.touched.accountNo && Boolean(formik.errors.accountNo)}
                                        helperText={formik.touched.accountNo && formik.errors.accountNo}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} textAlign={'right'}>
                                    <Button variant="contained" type="submit" onClick={formik.handleSubmit}>
                                        Update
                                    </Button>
                                    <Button variant="outlined" color='error' style={{ marginLeft: "10px" }} onClick={() => {
                                        formik.handleReset();
                                        clear();
                                    }}>
                                        Cancle
                                    </Button>
                                </Grid>
                            </Grid>
                        </Card>
                    </div>
                </Box>
            </Container>
        </div>
    )
}

export default PersonalSettings