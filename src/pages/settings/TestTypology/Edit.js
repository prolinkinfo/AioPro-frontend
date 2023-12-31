/* eslint-disable prefer-const */
import * as React from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormLabel, Dialog, Button } from '@mui/material';

const EditTypology = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenEdit, handleCloseEdit } = props;

    // -----------  validationSchema
    const validationSchema = yup.object({
        testTypology: yup.string().required('Test Typology is required'),
    });

    // -----------   initialValues
    const initialValues = {
        testTypology: ''
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
        },
    });

 
    return (
        <div>
            <Dialog open={isOpenEdit} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
                <DialogTitle
                    id="scroll-dialog-title"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="h6">Edit Test Typology </Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseEdit} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Test Typology</FormLabel>
                                <TextField
                                    id="testTypology"
                                    name="testTypology"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Test Typology'
                                    value={formik.values.testTypology}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.testTypology && Boolean(formik.errors.testTypology)}
                                    helperText={formik.touched.testTypology && formik.errors.testTypology}
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
                            handleCloseEdit();
                        }}
                    >
                        Cancle
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditTypology;
