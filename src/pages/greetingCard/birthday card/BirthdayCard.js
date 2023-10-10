/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/alt-text */
import { Avatar, Box, Button, Card, Container, FormControl, FormControlLabel, FormLabel, Grid, InputAdornment, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Header from '../../../components/Header'
import Card1 from './images/card1.png'

// eslint-disable-next-line arrow-body-style
const BirthdayCard = () => {
  const [name, setName] = useState('');
  const [selectedFile, setSelectedFile] = React.useState(null);
  const navigate = useNavigate();

  const images = [
    {
      img: Card1,
      name: "Card1"
    },
    {
      img: Card1,
      name: "Card2"
    }
    ,
    {
      img: Card1,
      name: "Card3"
    },
    {
      img: Card1,
      name: "Card4"
    }
  ]

  const initialValues = {
    name: "",
    img: "",
    wise: "",
    dob: "",
    userImg: "",
    userName: "",
    userRole: ""
  };

  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: async (values) => {
    },
  });
  console.log(formik.values)

  const back = () => {
    navigate('/dashboard/greetingcard');
  };

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
  };

  const removeImage = () => {
    setSelectedFile(null)
  }

  return (
    <div>
      <Container maxWidth="xl">
        <Grid container display="flex" alignItems="center">
          <Stack direction="row" alignItems="center" mb={3} justifyContent={"space-between"} width={"100%"}>
            <Header
              title="Birthday Card"
            />
            <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
              <Button variant="contained" color="secondary" startIcon={<ArrowBackIosIcon />} onClick={back}>Back</Button>
            </Stack>
          </Stack>
        </Grid>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
          <Grid item xs={12} sm={4} md={4}>
            <Card style={{ padding: "10px" }}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }} textAlign={"center"}>
                <Grid item xs={12} sm={12} md={12}>
                  <Typography variant='h6' mb={2}>Doctor Name</Typography>
                  <TextField
                    id="name"
                    name="name"
                    label=""
                    placeholder='Doctor Name'
                    size="small"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    fullWidth
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Dr.</InputAdornment>,
                    }}
                  />
                  {
                    formik.values.name.length > 0 &&
                    <Box style={{ textAlign: 'center' }}>
                      {selectedFile ? (
                        <img
                          src={selectedFile}
                          style={{ width: 100, height: 100, margin: '16px auto', border: "1px solid" }}
                        />
                      ) : (
                        <img
                          src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                          style={{ width: 100, height: 100, margin: '16px auto', border: "1px solid" }}
                        />
                      )}
                      <input
                        accept="image/*"
                        type="file"
                        id="avatar-upload"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
                      <label htmlFor="avatar-upload">
                        <Button component="span" variant="outlined" color="primary">
                          Selecte Image
                        </Button>
                      </label>
                      <Button component="span" variant="outlined" color="primary" style={{ marginLeft: "10px" }} onClick={removeImage}>
                        Remove Image
                      </Button>
                    </Box>
                  }
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      placeholder=''
                      size="small"
                      name='wish'
                      value={formik.values.wish}
                      onChange={formik.handleChange}
                    >
                      <MenuItem value={"Good Morning"}>Good Morning</MenuItem>
                      <MenuItem value={'Good Afternoon'}>Good Afternoon</MenuItem>
                      <MenuItem value={'Good Evening'}>Good Evening</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    id=""
                    name="dob"
                    label=""
                    placeholder=''
                    type='date'
                    size="small"
                    value={formik.values.dob}
                    onChange={formik.handleChange}
                    fullWidth
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Birthday Date</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Typography variant='h6' mb={2}>Select Image</Typography>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={formik.values.userImg}
                      onChange={() =>formik.setFieldValue()}
                    >
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8} md={8}>
            <Card style={{ padding: "10px" }}>
              <Typography variant='h6' mb={2} textAlign={"center"}>Select Theme</Typography>
              <div style={{ width: "100%", overflowX: "scroll", whiteSpace: "nowrap", display: "flex" }}>
                {
                  images?.map((img, index) => {
                    return (
                      <>
                        <div style={{ padding: "10px" }} onClick={() => console.log(index)}>
                          <img
                            key={index}
                            src={img?.img}
                            style={{ width: "300px", height: "auto", marginRight: '12px', border: "1px solid" }}
                          />
                        </div>
                      </>
                    )
                  })
                }
              </div>
            </Card>
          </Grid>
        </Grid>

      </Container>
    </div >
  )
}

export default BirthdayCard
