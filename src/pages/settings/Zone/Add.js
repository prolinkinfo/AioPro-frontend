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
import { useDispatch } from 'react-redux';
import { apipost } from '../../../service/api';

const AddZone = (props) => {
    // eslint-disable-next-line react/prop-types
    const { isOpenAdd, handleCloseAdd, fetchZoneData } = props;
    const dispatch = useDispatch();

    // -----------  validationSchema
    const validationSchema = yup.object({
        zoneCode: yup.string().required('Zone Code is required'),
        zoneName: yup.string().required('Zone Name is required'),
    });

    // -----------   initialValues
    const initialValues = {
        zoneCode: '',
        zoneName: ''
    };

    const addZone = async (values) => {
        const pyload = {
            zoneCode: values.zoneCode,
            zoneName: values.zoneName,
        }
        const result = await apipost('/api/zone', pyload);

        if (result && result.status === 200) {
            formik.resetForm();
            handleCloseAdd();
            dispatch(fetchZoneData());

        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            addZone(values)
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
                    <Typography variant="h6">Add Zone </Typography>
                    <Typography>
                        <ClearIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <form>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Zone Code</FormLabel>
                                <TextField
                                    id="zoneName"
                                    name="zoneCode"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Zone Code'
                                    value={formik.values.zoneCode}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.zoneCode && Boolean(formik.errors.zoneCode)}
                                    helperText={formik.touched.zoneCode && formik.errors.zoneCode}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormLabel>Zone Name</FormLabel>
                                <TextField
                                    id="zoneName"
                                    name="zoneName"
                                    label=""
                                    size="small"
                                    maxRows={10}
                                    placeholder='Enter Zone Name'
                                    value={formik.values.zoneName}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    error={formik.touched.zoneName && Boolean(formik.errors.zoneName)}
                                    helperText={formik.touched.zoneName && formik.errors.zoneName}
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

export default AddZone;
