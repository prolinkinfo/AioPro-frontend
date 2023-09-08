/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import ClearIcon from '@mui/icons-material/Clear';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { apiget, apiput } from '../../service/api';
import Palette from '../../theme/palette';

const Edit = (props) => {
  const { open, handleClose, showdata, id, fetchContact } = props;
  console.log('showdata', showdata);
  const [contactData, setContactData] = useState({});

  // -----------  validationSchema
  const validationSchema = yup.object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    dateOfBirth: yup.date().required('Date of Birth is required'),
    gender: yup.string().required('Gender is required'),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Phone number is invalid')
      .required('Phone number is required'),
    emailAddress: yup.string().email('Invalid email').required('Email is required'),
    address: yup.string().required(),
    alternatePhoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Phone number is invalid'),
    additionalEmailAddress: yup.string().email('Invalid email'),
  });

  // -----------   initialValues
  const initialValues = {
    firstName: contactData?.firstName,
    lastName: contactData?.lastName,
    dateOfBirth: contactData?.dateOfBirth,
    gender: contactData?.gender,
    phoneNumber: contactData?.phoneNumber,
    emailAddress: contactData?.emailAddress,
    address: contactData?.address,
    alternatePhoneNumber: contactData?.alternatePhoneNumber,
    additionalEmailAddress: contactData?.additionalEmailAddress,
    instagramProfile: contactData?.instagramProfile,
    twitterProfile: contactData?.twitterProfile,
    preferredContactMethod: contactData?.preferredContactMethod,
    referralSource: contactData?.referralSource,
    referralContactName: contactData?.referralContactName,
    relationshipToReferrer: contactData?.relationshipToReferrer,
    preferencesForMarketingCommunications: contactData?.preferencesForMarketingCommunications,
    preferredLanguage: contactData?.preferredLanguage,
    modifiedOn: '',
  };

  // add Contact Edit api
  const editContact = async (values) => {
    const data = values;

    console.log('editContact', data, id);
    const result = await apiput(`contact/edit/${id}`, data);

    if (result && result.status === 200) {
      handleClose();
      fetchContact();
    }
  };

  // fetch api
  const fetchdata = async () => {
    const result = await apiget(`contact/view/${id}`);
    if (result && result.status === 200) {
      setContactData(result?.data[0]);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [open]);

  // formik
  const formik = useFormik({
    initialValues,
    // validationSchema,
    enableReinitialize: true,
    // onSubmit: async (values) => {
    //   const ContactData = {
    //     firstName: values.firstName,
    //     lastName: values.lastName,
    //     dateOfBirth: values.dateOfBirth,
    //     gender: values.gender,
    //     phoneNumber: values.phoneNumber,
    //     emailAddress: values.emailAddress,
    //     address: values.address,
    //     alternatePhoneNumber: values.alternatePhoneNumber,
    //     additionalEmailAddress: values.additionalEmailAddress,
    //     instagramProfile: values.instagramProfile,
    //     twitterProfile: values.twitterProfile,
    //     preferredContactMethod: values.preferredContactMethod,
    //     referralSource: values.referralSource,
    //     referralContactName: values.referralContactName,
    //     relationshipToReferrer: values.relationshipToReferrer,
    //     preferencesForMarketingCommunications: values.preferencesForMarketingCommunications,
    //     preferredLanguage: values.preferredLanguage,
    //     modifiedOn: new Date(),
    //   };
    //   editContact(ContactData);
    // },
  });

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            // backgroundColor: "#2b4054",
            // color: "white",
          }}
        >
          <Typography variant="h6">Show More</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Typography style={{ marginBottom: '15px' }} variant="h6">
              Basic Information
            </Typography>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>First name</FormLabel>
                <TextField
                  id="firstName"
                  name="firstName"
                  size="small"
                  maxRows={10}
                  fullWidth
                  value={showdata?.firstName}
                  //   onChange={formik.handleChange}
                  //   error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  //   helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Last name</FormLabel>
                <TextField id="lastName" name="lastName" size="small" fullWidth value={showdata?.lastName} />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Date Of Birth</FormLabel>
                <TextField name="dateOfBirth" type="date" size="small" fullWidth value={showdata?.dateOfBirth} />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Phone number</FormLabel>
                <TextField
                  id="phoneNumber"
                  name="phoneNumber"
                  size="small"
                  type="number"
                  fullWidth
                  value={showdata?.phoneNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Email</FormLabel>
                <TextField
                  id="emailAddress"
                  name="emailAddress"
                  size="small"
                  fullWidth
                  value={showdata?.emailAddress}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup row name="gender" value={showdata?.gender}>
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                  </RadioGroup>
                  <FormHelperText style={{ color: Palette.error.main }}>
                    {formik.touched.gender && formik.errors.gender}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Address</FormLabel>
                <TextField id="address" name="address" size="small" multiline fullWidth value={showdata?.address} />
              </Grid>
            </Grid>
            <Typography style={{ marginBottom: '15px' }} variant="h6" mt={2}>
              Additional Contact Details
            </Typography>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Alternate phone number</FormLabel>
                <TextField
                  id="alternatePhoneNumber"
                  name="alternatePhoneNumber"
                  type="number"
                  size="small"
                  fullWidth
                  value={showdata?.alternatePhoneNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Additional email address</FormLabel>
                <TextField
                  id="additionalEmailAddress"
                  name="additionalEmailAddress"
                  type="email"
                  size="small"
                  fullWidth
                  value={showdata?.additionalEmailAddress}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Instagram profile</FormLabel>
                <TextField
                  id="instagramProfile"
                  name="instagramProfile"
                  type=""
                  size="small"
                  fullWidth
                  value={showdata?.instagramProfile}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Twitter profile</FormLabel>
                <TextField
                  id="twitterProfile"
                  name="twitterProfile"
                  type=""
                  size="small"
                  fullWidth
                  value={showdata?.twitterProfile}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormLabel>Preferred Contact Method</FormLabel>
                <TextField
                  id="preferredContactMethod"
                  name="preferredContactMethod"
                  type=""
                  size="small"
                  fullWidth
                  value={showdata?.preferredContactMethod}
                />
              </Grid>
            </Grid>
            <Typography style={{ marginBottom: '15px' }} variant="h6" mt={2}>
              Referral Information
            </Typography>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <FormLabel>Referral source</FormLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="referralSource"
                    name="referralSource"
                    size="small"
                    value={showdata?.referralSource}
                  >
                    <MenuItem value="Existing Customers">Existing Customers</MenuItem>
                    <MenuItem value="Professional Networks">Professional Networks</MenuItem>
                    <MenuItem value="Business Partnerships">Business Partnerships</MenuItem>
                    <MenuItem value="Employee Referrals">Employee Referrals</MenuItem>
                    <MenuItem value="Online Reviews and Social Media">Online Reviews and Social Media</MenuItem>
                  </Select>
                  <FormHelperText error={formik.touched.referralSource && Boolean(formik.errors.referralSource)}>
                    {formik.touched.referralSource && formik.errors.referralSource}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Referral Contact Name</FormLabel>
                <TextField
                  id="referralContactName"
                  name="referralContactName"
                  size="small"
                  fullWidth
                  value={showdata?.referralContactName}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Relationship To Referrer</FormLabel>
                <TextField
                  id="relationshipToReferrer"
                  name="relationshipToReferrer"
                  size="small"
                  fullWidth
                  value={showdata?.relationshipToReferrer}
                />
              </Grid>
            </Grid>
            <Typography style={{ marginBottom: '15px' }} variant="h6" mt={2}>
              Communication Preferences
            </Typography>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <FormLabel>Marketing Communications</FormLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="preferencesForMarketingCommunications"
                    name="preferencesForMarketingCommunications"
                    size="small"
                    value={showdata?.preferencesForMarketingCommunications}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.preferencesForMarketingCommunications &&
                      Boolean(formik.errors.preferencesForMarketingCommunications)
                    }
                  >
                    <MenuItem value="Opt-in">Opt-in</MenuItem>
                    <MenuItem value="Opt-out">Opt-out</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Preferred language</FormLabel>
                <TextField
                  id="preferredLanguage"
                  name="preferredLanguage"
                  type=""
                  size="small"
                  fullWidth
                  value={showdata?.preferredLanguage}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            type="reset"
            variant="outlined"
            style={{ textTransform: 'capitalize' }}
            color="error"
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
  );
};

export default Edit;
