/* eslint-disable arrow-body-style */
import { Box, Button, Card, Container, FormHelperText, FormLabel, Grid, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

const RadiusSettings = () => {
    return (
        <div>
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
                    <Typography variant="h4">Radius Settings</Typography>
                </Stack>
                <Box width="50%" pt={3}>
                    <div style={{ marginTop: '20px' }}>
                        <form>
                            <Card style={{ padding: '20px' }}>
                                <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 4, md: 3 }}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <FormLabel>CURRENT RADIUS</FormLabel>
                                        <TextField
                                            name=""
                                            type=""
                                            fullWidth
                                            size="small"
                                        />
                                        <FormHelperText>( In Kilometers )</FormHelperText>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} textAlign={'right'}>
                                        <Button variant="contained" type="submit" >
                                            Update
                                        </Button>
                                        <Button variant="outlined" color='error' style={{ marginLeft: "10px" }}>
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

export default RadiusSettings