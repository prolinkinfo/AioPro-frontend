/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/void-dom-elements-no-children */
import { Box, Container } from '@mui/material'
import React from 'react'
import webportaltraining from '../../../assets/video/webportaltraining.mp4'

const TutorialMaster = () => {
    return (
        <>
            <Container maxWidth="xl">
                <Box  display={"flex"} justifyContent={"center"} alignItems={"center"} pt={2}> 
                    <video width="80%" height="90%" controls>
                        <source src={webportaltraining} type="video/mp4" />
                        <track label="English" kind="subtitles" srcLang="en" src="captions-en.vtt" default />

                            Your browser does not support the video tag.
                    </video>
                </Box>
            </Container>
        </>
    )
}

export default TutorialMaster