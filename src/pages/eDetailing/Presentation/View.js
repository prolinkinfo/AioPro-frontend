/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/alt-text */
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Slider from "react-slick"
import Iconify from '../../../components/iconify'
import { apiget } from '../../../service/api'
import AddSlide from './AddSlide'
// eslint-disable-next-line import/no-unresolved
import "slick-carousel/slick/slick.css";
// eslint-disable-next-line import/no-unresolved
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const carouselStyle = {
  width: '800px', // Set the width as per your requirement
  // height: '800px', // Set the height as per your requirement
  margin: "auto"
};

const ViewPresentation = () => {

  const [data, setData] = useState({})
  const [isTrue, setIsTrue] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role.toLowerCase();
  const navigate = useNavigate();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const fetchData = async () => {
    const result = await apiget(`/api/presentation/${id}`);
    if (result && result.status === 200) {
      setData(result?.data?.result);
    }
  }

  const back = () => {
    if (isTrue) {
      setIsTrue(false)
    } else {
      navigate(`/${userRole}/dashboard/eDetailing/presentation`)
    }
  }

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id])


  return (
    <div>
      {/* Add Slide */}
      <AddSlide isOpen={isOpen} handleClose={handleClose} data={data} fetchData={fetchData} />

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={1}>
          <Typography variant="h4">Presentation : {data?.presentationName}</Typography>
        </Stack>
        <Box width="100%" pt={3}>
          <Stack direction={'row'} spacing={2} display={'flex'} justifyContent={'space-between'} mb={2}>
            {
              isTrue === false &&
              <>
                <div>
                  <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
                    Add Slide
                  </Button>
                  {
                    data?.slideImgs?.length > 0 &&
                    <Button variant="contained" startIcon={<Iconify icon="icon-park-outline:preview-open" />} onClick={() => setIsTrue(true)} style={{ marginLeft: "15px" }}>
                      Preview
                    </Button>
                  }
                </div>
              </>
            }
            <Button variant="contained" startIcon={<Iconify icon="material-symbols:arrow-back-ios" />} onClick={back}>
              Back
            </Button>
          </Stack>
        </Box>
        {
          isTrue === false &&
          <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
            {
              data?.slideImgs?.map((item) => {
                return (
                  <>
                    <Grid item xs={12} sm={6} md={3} >
                      <Box mt={4}>
                        <img src={item?.image} height={200} width={400} />
                      </Box>
                    </Grid>
                  </>
                )
              })
            }
          </Grid>
        }
        {
          isTrue === true &&
          <div style={carouselStyle}>
            <Slider {...settings}>
              {
                data?.slideImgs?.map((item) => {
                  return (
                    <>
                      <div >
                        <img src={item?.image}/>
                      </div>
                    </>
                  )
                })
              }
            </Slider>
          </div>
        }
      </Container>
    </div>
  )
}

export default ViewPresentation