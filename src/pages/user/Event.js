// /* eslint-disable react/prop-types */
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable prefer-const */
// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
// import TextField from '@mui/material/TextField';
// import ClearIcon from '@mui/icons-material/Clear';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import FullCalendar from '@fullcalendar/react';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import { MenuItem, Select } from '@mui/material';
// import FormLabel from '@mui/material/FormLabel';
// import { useEffect, useState } from 'react';

// import { apiget, apiput } from '../../service/api';
// // import { FiSave } from "react-icons/fi";
// // import { GiCancel } from "react-icons/gi";

// const Event = (props) => {
//   const { handleClose, open, data, fetchdata } = props;
//   console.log('data', data);
//   const [userDetails, setUserDetails] = useState({})

//   return (
//     <div>
//       <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
//         <DialogTitle
//           id="scroll-dialog-title"
//           style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//           }}
//         >
//           <Typography variant="h6">All Events </Typography>
//           <Typography>
//             <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
//           </Typography>
//         </DialogTitle>
//         <FullCalendar
//           plugins={[dayGridPlugin]}
//           initialView="dayGridMonth"
//           weekends={false}
//           events={[
//             { title: 'event 1', date: '2023-09-12' },
//             { title: 'event 2', date: '2023-09-13' },
//           ]}
//         />
//         <DialogActions>
//           <Button type="submit" variant="contained" onClick={() => handleClose()} style={{ textTransform: 'capitalize' }}>
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default Event;


/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Container from '@mui/material/Container';
import { Button, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Iconify from '../../components/iconify/Iconify';
import AddTask from '../../components/task/AddTask';
import { apidelete, apiget } from '../../service/api';
import ViewEdit from '../../components/task/Edit'
import ActionButtonTwo from '../../components/ActionButtonTwo';
import AddMeeting from '../../components/meeting/Addmeetings'
import AddCall from '../../components/call/Addcalls'

const Event = () => {
  const [userAction, setUserAction] = useState(null);
  const [data, setData] = useState([]);
  const [taskId, setTaskId] = useState('');
  const [openTask, setOpenTask] = useState(false);
  const [openMeeting, setOpenMeeting] = useState(false);
  const [openCall, setOpenCall] = useState(false);
  const [openViewEdit, setOpenViewEdit] = useState(false);

  const userid = localStorage.getItem('user_id');
  const userRole = localStorage.getItem('userRole');
  const {id} =useParams()

  console.log("userid",id)

  useEffect(()=>{
    
    

  },[id])

  // open task model
  const handleOpenTask = () => setOpenTask(true);
  const handleCloseTask = () => setOpenTask(false);

  // open meeting model
  const handleOpenMeeting = () => setOpenMeeting(true);
  const handleCloseMeeting = () => setOpenMeeting(false);

  // open call model
  const handleOpenCall = () => setOpenCall(true);
  const handleCloseCall = () => setOpenCall(false);

  const handleOpenViewEdit = () => setOpenViewEdit(true);
  const handleCloseViewEdit = () => setOpenViewEdit(false);

  const handleDateSelect = (selectInfo) => {
    handleCloseTask();
  };

  const handleEventClick = (clickInfo) => {
    setTaskId(clickInfo?.event?._def?.extendedProps?._id);
    handleOpenViewEdit();
    if (clickInfo.event.url) {
      clickInfo.jsEvent.preventDefault();
      window.open(clickInfo.event.url);
    }
  };
  const handleEvents = (events) => {};

  const renderEventContent = (eventInfo) => (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );

  // delete api
  const deletedata = async () => {
    await apidelete(`task/delete/${taskId}`);
    handleCloseViewEdit();
  };

  const fetchApiTask = async () => {
    // const result = await apiget(userRole === 'admin' ? `task/list` : `task/list/?createdBy=${userid}`);
    // return result.data.result.map((item) => ({
    //   title: item.subject,
    //   start: item.startDate,
    //   end: item.endDate,
    //   textColor: item.textColor,
    //   backgroundColor: item.backgroundColor,
    // }));
  };

  const fetchApiMeeting = async () => {
    // const result = await apiget(userRole === 'admin' ? `meeting/list` : `meeting/list/?createdBy=${userid}`);
    // return result.data.result.map((item) => ({
    //   title: item.subject,
    //   start: item.startDate,
    //   end: item.endDate,
    // }));
  };

  const fetchApiCall = async () => {
    // const result = await apiget(userRole === 'admin' ? `call/list` : `call/list/?createdBy=${userid}`);
    // return result.data.result.map((item) => ({
    //   title: item.subject,
    //   start: item.startDateTime,
    // }));
  };

  useEffect(() => {
    const fetchData = async () => {
      // // const taskApiData = await fetchApiTask();
      // const meetingApiData = await fetchApiMeeting();
      // const callApiData = await fetchApiCall();
      // const combinedData = [...taskApiData, ...meetingApiData, ...callApiData];
      // setData(combinedData);
    };

    fetchData();
  }, [openTask, openViewEdit, userAction]);

  return (
    <div>
      {/* Add Task Model */}
      <AddTask
        open={openTask}
        handleClose={handleCloseTask}
        setUserAction={setUserAction}
        lead="lead"
        contact="contact"
      />

      {/* View Edit Model */}
      {/* <ViewEdit open={openViewEdit} handleClose={handleCloseViewEdit} id={taskId} deletedata={deletedata} lead='lead' contact='contact' setUserAction={setUserAction} fetchEvent={fetchdata} /> */}

      {/* Add Meeting Model */}
      <AddMeeting open={openMeeting} handleClose={handleCloseMeeting} setUserAction={setUserAction} />

      {/* Add Call Model */}
      <AddCall open={openCall} handleClose={handleCloseCall} setUserAction={setUserAction} />

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Calendar</Typography>
          <ActionButtonTwo
            handleOpenTask={handleOpenTask}
            handleOpenMeeting={handleOpenMeeting}
            handleOpenCall={handleOpenCall}
          />
        </Stack>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          minHeight="400px"
          height="600px"
          // dateClick={handleDateClick}
          // events={calendarDataCalendar}
          events={data}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          select={handleDateSelect}
          eventContent={renderEventContent}
          views={{
            listWeek: { buttonText: 'List' },
            multiMonthFourMonth: {
              type: 'multiMonth',
              buttonText: 'multiMonth',
              duration: { months: 4 },
            },
          }}
          buttonText={{
            today: 'Today',
            dayGridMonth: 'Month',
            timeGridWeek: 'Week',
            timeGridDay: 'Day',
          }}
          eventClassNames="custom-fullcalendar"
        />
      </Container>
    </div>
  );
};

 export default Event;;

