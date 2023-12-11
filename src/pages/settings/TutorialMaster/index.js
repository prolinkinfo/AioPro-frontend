/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/void-dom-elements-no-children */
import { Box, Container } from '@mui/material';
import React from 'react';
// import webportaltraining from '../../../assets/video/webportaltraining.mp4'

const TutorialMaster = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} pt={2}>
          <iframe
            width="80%"
            height="800px"
            src="https://www.youtube.com/embed/tpkgSE4Rueg?si=TXuZ1NxrffYIqTpa"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
        </Box>
      </Container>
    </>
  );
};

export default TutorialMaster;
