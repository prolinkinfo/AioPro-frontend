/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-constant-condition */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
import * as React from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from 'react-toastify';
import { FormLabel, Dialog, Tooltip } from '@mui/material';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

const Share = (props) => {
  const { handleClose, open } = props;

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">Share</Typography>
          <Typography>
            <ClearIcon onClick={() => handleClose(false)} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers style={{ maxWidth: '480px' }}>
          <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
            <Grid item xs={3} sm={3} md={3}>
              <div className="share-btn">
                <EmailShareButton>
                  <EmailIcon style={{ borderRadius: '50%' }} />
                </EmailShareButton>
                <p className="share-btn-text">Email</p>
              </div>
            </Grid>
            <Grid item xs={3} sm={3} md={3}>
              <div className="share-btn">
                <WhatsappShareButton>
                  <WhatsappIcon style={{ borderRadius: '50%' }} />
                </WhatsappShareButton>
                <p className="share-btn-text">Whatsapp</p>
              </div>
            </Grid>
            <Grid item xs={3} sm={3} md={3}>
              <div className="share-btn">
                <FacebookShareButton>
                  <FacebookIcon style={{ borderRadius: '50%' }} />
                </FacebookShareButton>
                <p className="share-btn-text">Facebook</p>
              </div>
            </Grid>
            <Grid item xs={3} sm={3} md={3}>
              <div className="share-btn">
                <TwitterShareButton>
                  <TwitterIcon style={{ borderRadius: '50%' }} />
                </TwitterShareButton>
                <p className="share-btn-text">Twitter</p>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField name="url" label="" size="small" value="url" fullWidth />
              <p style={{margin:"0px"}}>http://localhost:3000/dashboard/user/view/64ff042212969aea5fab4cf1</p>

              <Tooltip title="Click to Copy" arrow>
                <CopyAllIcon />
              </Tooltip>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Share;
