/* eslint-disable react/prop-types */
import { Box, Button, Card, FormLabel, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import moment from 'moment'
import Palette from '../../theme/palette'

const Security = () => (
    <div style={{ marginTop: "20px" }}>
        <Card style={{ padding: "20px" }}>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 4, md: 3 }}>
                <Grid item xs={12} sm={12} md={12}>
                    <TextField
                        id="firstName"
                        name="firstName"
                        label="Old Password"
                        // value={formik.values.firstName}
                        // onChange={formik.handleChange}
                        fullWidth
                    // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    // helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <TextField
                        id="firstName"
                        name="firstName"
                        label="New Password"
                        // value={formik.values.firstName}
                        // onChange={formik.handleChange}
                        fullWidth
                    // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    // helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <TextField
                        id="firstName"
                        name="firstName"
                        label="Confirm Password"
                        // value={formik.values.firstName}
                        // onChange={formik.handleChange}
                        fullWidth
                    // error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    // helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={12} textAlign={"right"}>
                    <Button variant='contained'>Save Changes</Button>
                </Grid>
            </Grid>
        </Card>
    </div>
)

export default Security
