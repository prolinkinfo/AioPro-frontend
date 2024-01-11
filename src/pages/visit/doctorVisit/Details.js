/* eslint-disable prefer-const */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import { Box, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Palette from '../../../theme/palette'

// eslint-disable-next-line arrow-body-style
const Details = ({ data }) => {

  const fullName = (name) => {
    let separatedNames = name.split(/(?=[A-Z])/);
    let firstName = separatedNames[0];
    let lastName = separatedNames[1];

    return `${firstName} ${lastName}`
  }
  return (
    <div>
      <Card style={{ borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}>
        <Box p={3}>
          <Grid container display="flex" spacing={4}>
            <Grid item xs={12} sm={6}>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                <Typography variant="body1">Visit ID :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} textTransform={"capitalize"}>{data?.visitId ? data?.visitId : "N/A"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Doctor Name :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} textTransform={"capitalize"}>{data?.doctorName ? data?.doctorName : "N/A"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Doctor Phone :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>{data?.doctorPhone ? data?.doctorPhone : "N/A"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1"> Employee Name :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>{data?.employeeName ? fullName(data?.employeeName) : "N/A"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Reported From :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>{data?.reportedForm ? data?.reportedForm : "N/A"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Skipped Reason :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>{data?.skippedReason ? data?.skippedReason : "N/A"}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} pb={2}>
                <Typography variant="body1">Date :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>{data?.visitDate ? moment( data?.visitDate).format("DD/MM/YYYY") : "N/A"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Doctor Email :</Typography>
                <Typography variant="body2" color={Palette.grey[600]} style={{ cursor: "pointer" }}>{data?.doctorEmail ? data?.doctorEmail : "N/A"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Reported Clinic Address :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>{data?.clinicAddress ? data?.clinicAddress : "N/A"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Accompanied By :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>{data?.accompaniedBy ? data?.accompaniedBy : "N/A"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Extra Info :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>{data?.extraInfo ? data?.extraInfo : "N/A"}</Typography>
              </Grid>
              <Grid style={{ borderBottom: "1.5px dashed", borderBottomColor: Palette.grey[400] }} py={2}>
                <Typography variant="body1">Info (Filled by Employee) :</Typography>
                <Typography variant="body2" color={Palette.grey[600]}>{data?.info ? data?.info : "N/A"}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  )
}

export default Details