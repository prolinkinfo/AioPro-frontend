import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';

const Permissions = (props) => {

    const { isOpen, handleClose } = props;

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
        // const result = await apipost('/api/folder/createFolder', pyload);

        // if (result && result.status === 200) {
        //     formik.resetForm();
        //     handleCloseAdd();
        //     fetchFolder();
        // }
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
            <Dialog open={isOpen} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
                <DialogTitle
                    id="scroll-dialog-title"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width:"450px"
                    }}
                >
                    <Typography variant="h6">Permissions</Typography>
                    <Typography>
                        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                        <Grid item xs={12} sm={12} md={12}>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="public"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="public" control={<Radio />} label="Public ( Visible to all )" />
                                    <FormControlLabel value="private" control={<Radio />} label="Private ( Visible to me )" />
                                    <FormControlLabel value="other" control={<Radio />} label="Custom ( Let me select )" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
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
                            handleClose();
                        }}
                    >
                        Cancle
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Permissions