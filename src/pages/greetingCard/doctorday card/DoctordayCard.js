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
import palette from '../../../theme/palette';
import Header from '../../../components/Header'
import Card1 from "./images/card1.png"



// eslint-disable-next-line arrow-body-style
const DoctordayCard = () => {
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [wise, setWise] = useState('')
  const [dob, setDob] = useState('')
  const [selectUserImg, setSelectUserImg] = useState('')
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'))
  const images = [
    {
      img: Card1,
      name: "Card1"
    },
    {
      img: Card1,
      name: "Card2"
    },
    {
      img: Card1,
      name: "Card3"
    },
   
  ]

  const generateCard = () => {
    const data = {
      name,
      img,
      wise,
      theme:selectedImage,
      userImg: selectUserImg === "yes" ? user?.avatar : null,
      userName: user.userName,
      occupation: "Docter"
    };
    console.log(data, "data")
  }

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
    setImg(file)
  };


  const handleImageSelect = (img, index) => {
    setSelectedImageIndex(index);
    setSelectedImage(img.img)
  };

  const removeImage = () => {
    setSelectedFile(null)
  }

  return (
    <div>
      <Container maxWidth="xl">
        {/* <img src={selectedImageIndex}/> */}
        <Grid container display="flex" alignItems="center">
          <Stack direction="row" alignItems="center" mb={3} justifyContent={"space-between"} width={"100%"}>
            <Header
              title="Doctorday Card"
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
                    value={name}
                    placeholder='Doctor Name'
                    size="small"
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Dr.</InputAdornment>,
                    }}
                  />
                  {
                    name.length > 0 &&
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
                <Grid item xs={12} sm={12} md={12} style={{ borderBottom: "1.5px dashed", borderBottomColor: palette.grey[400] }} py={2}>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      placeholder=''
                      size="small"
                      value={wise}
                      name='wish'
                      onChange={(e) => setWise(e.target.value)}
                    >
                      <MenuItem value={"Good Morning"}>Good Morning</MenuItem>
                      <MenuItem value={'Good Afternoon'}>Good Afternoon</MenuItem>
                      <MenuItem value={'Good Evening'}>Good Evening</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
             
                <Grid item xs={12} sm={12} md={12} style={{ borderBottom: "1.5px dashed", borderBottomColor: palette.grey[400] }} py={2}>
                  <Typography variant='h6' mb={2}>Select Image</Typography>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      onChange={(e)=>setSelectUserImg(e.target.value)}
                    >
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12} style={{ borderBottom: "1.5px dashed", borderBottomColor: palette.grey[400] }} py={2}>
                  <Typography variant='h6' mb={2} textAlign={"center"}>Select Theme</Typography>
                  <div style={{ width: "100%", overflowX: "scroll", whiteSpace: "nowrap", display: "flex" }}>
                    {
                      images?.map((img, index) => {
                        return (
                          <>
                            <div style={{ padding: "10px", position: "relative" }}>
                              <input
                                type="radio"
                                name="selectedImage"
                                checked={selectedImageIndex === index}
                                onChange={() => handleImageSelect(img, index)}
                                value={img.name}
                                style={{
                                  position: "absolute",
                                  opacity: "0",
                                  width: " 100px",
                                  height: "100px",
                                  left: "0",
                                }}
                              />
                              <img
                                key={index}
                                src={img?.img}
                                style={{
                                  width: "300px", height: "auto", marginRight: '12px', border: selectedImageIndex !== index ? "" : "1px solid blue", padding: "5px"
                                }}
                              />
                            </div>
                          </>
                        )
                      })
                    }
                  </div>
                </Grid>
                <Grid item xs={12} sm={8} md={8} style={{ margin: "auto" }}>
                  <Button variant='contained' onClick={generateCard}>Generate Card</Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8} md={8}>
            <Card style={{ padding: "10px" }}>
              <img src={selectedImage} height={"auto"} width={"500px"} style={{ margin: "auto" }} />
            </Card>
          </Grid>
        </Grid>

      </Container>
    </div >
  )
}

export default DoctordayCard
