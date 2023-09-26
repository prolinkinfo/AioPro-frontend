/* eslint-disable arrow-body-style */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormLabel, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import DeleteModel from '../../components/Deletemodle'

const Edit = ({ isOpenModel, handleCloseModel }) => {

    const [isOpenDelete, setIsOpenDelete] = useState(false)

    const handleOpenDelete = () => setIsOpenDelete(true)
    const handleCloseDelete = () => setIsOpenDelete(false)

    return (
        <div>
            <DeleteModel isOpenDeleteModel={isOpenDelete} handleCloseDeleteModel={handleCloseDelete}/>

            <Dialog open={isOpenModel} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
                <DialogTitle
                    id="scroll-dialog-title"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h6">Edit</Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseModel} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        {/* <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Last name</FormLabel>
                                <TextField
                                    id="lastName"
                                    name="lastName"
                                    label=""
                                    size="small"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Email</FormLabel>
                                <TextField
                                    id="emailAddress"
                                    name="emailAddress"
                                    label=""
                                    size="small"
                                    fullWidth
                                />
                            </Grid>

                        </Grid> */}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                        variant="contained"

                        style={{ textTransform: 'capitalize' }}
                    >
                        Save
                    </Button>
                    <Button
                        type="reset"
                        variant="contained"
                        color="error"
                        style={{ textTransform: 'capitalize' }}
                        onClick={handleOpenDelete}
                    >
                        Delete
                    </Button>
                    <Button
                        type="reset"
                        variant="outlined"
                        color="error"
                        style={{ textTransform: 'capitalize' }}
                        onClick={handleCloseModel}
                    >
                        Cancle
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Edit