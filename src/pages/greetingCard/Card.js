/* eslint-disable arrow-body-style */
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import TableStyle from '../../components/TableStyle'
import Iconify from '../../components/iconify/Iconify'

const Card = () => {
    return (
        <div>
            <Container maxWidth="xl">
                <TableStyle>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4">Greeting Card</Typography>
                        {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}> */}
                        {/* <Link to="/dashboard/greetingcard/add" style={{ textDecoration: 'none', color: 'white' }}>
                                New Template
                            </Link> */}
                        {/* </Button> */}
                    </Stack>
                    <Box width="100%">
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={6} md={6}>
                                <Card>
                                    <h1>1</h1>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Card>
                                    <h1>2</h1>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </TableStyle>

            </Container>
        </div>
    )
}

export default Card