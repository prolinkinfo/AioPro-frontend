/* eslint-disable arrow-body-style */
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import moment from 'moment';
import { apieditmeeting, getmeeting, apiput } from '../../../service/api';

const ApprovalModel = ({ open, handleClose, meetingData, editNotification }) => {
  const fetchdata = async () => {
    const result = await getmeeting('/api/meeting');
  };

  const EditMeeting = async (id) => {
    const data = {
      _id: id,
      status: 'verified',
    };

    if (meetingData.type === 'user_update') {
      const data = {
        id: meetingData?.data?._id,
        role: meetingData?.data?.role,
        parentId: meetingData?.data?.parentId,
      };
      const result = await apiput(`/api/users`, data);
      if (result && result.status === 200) {
        editNotification();
        fetchdata();
        handleClose();
      }
    }
    const result = await apieditmeeting(`/api/meeting`, data);
    if (result && result.status === 200) {
      editNotification();
      fetchdata();
      handleClose();
    }
  };

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
          <Typography variant="h6">Meeting Approval</Typography>
          {/* <Typography>
                        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
                    </Typography> */}
        </DialogTitle>

        <DialogContent dividers>
          <Typography textTransform={'capitalize'}>
            {`${meetingData?.createdBy?.firstName} (${meetingData?.createdBy?.role})`},
          </Typography>
          <Typography>
            I am pleased to confirm my approval for the upcoming meeting scheduled for{' '}
            <b>{moment(meetingData?.data?.startDate).format('lll')}</b> to discuss <b>{meetingData?.data?.subject}</b>.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            style={{ textTransform: 'capitalize' }}
            onClick={() => EditMeeting(meetingData?.data?.id)}
          >
            Approval
          </Button>
          <Button
            type="reset"
            variant="outlined"
            color="error"
            style={{ textTransform: 'capitalize' }}
            onClick={handleClose}
          >
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ApprovalModel;