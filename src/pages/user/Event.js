
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
import Iconify from '../../components/iconify/Iconify';
import { apiget, getsingleuser } from '../../service/api';
import EditMeeting from '../meeting/EditMeeting';
import AddMeeting from '../meeting/Addmeetings';

const Event = () => {
  const [userAction, setUserAction] = useState(null);
  const [openMeeting, setOpenMeeting] = useState(false);
  const [openViewEdit, setOpenViewEdit] = useState(false);
  const [meetingList, setMeetingList] = useState([]);
  const [dataByMeetingId, setDataByMeetingId] = useState(null);
  const [meetingsId,setMeetingsId] = useState('') 
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [eventView, setEventView] = useState(false);

  const getuser = async () => {
    const result = await getsingleuser(`/api/users`, id);
    console.log('result', result.data);
    setUser(result.data);
  };

  useEffect(() => {
    getuser();
  }, [id]);


  // open meeting model
  const handleOpenMeeting = () => setOpenMeeting(true);
  const handleCloseMeeting = () => setOpenMeeting(false);

  const fetchApByMeetingd = async (meetingId) => {
    if (meetingId) {
      const result = await apiget(`/api/meeting/${meetingId}`);
      if (result?.statusText === "OK") {
        setDataByMeetingId(result?.data)
      }
    }

  };
  const handleOpenViewEdit = (meetingId) => {
    fetchApByMeetingd(meetingId)
    setOpenViewEdit(true)
    setMeetingsId(meetingId)
  };
  const handleCloseViewEdit = () => setOpenViewEdit(false);

  const handleEventClick = (clickInfo) => {
    setEventView(true);
    handleOpenViewEdit(clickInfo?.event?._def?.extendedProps?._id);
    if (clickInfo.event.url) {
      clickInfo.jsEvent.preventDefault();
      window.open(clickInfo.event.url);
    }
  };


  const renderEventContent = (eventInfo) => (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );

  const handleCloseevent = () => {
    setEventView(false);
  };

  const fetchApiMeeting = async () => {
    const result = await apiget(`/api/meeting/?userid=${id}`);
    if (result?.statusText === "OK") {
      setMeetingList(result?.data)
    }
  };

  useEffect(async () => {
    fetchApiMeeting();
  }, []);



  return (
    <div>

      {/* Add Meeting Model */}
      <AddMeeting
        open={openMeeting}
        handleClose={handleCloseMeeting}
        setUserAction={setUserAction}
        fetchApiMeeting={fetchApiMeeting}
        user={user}
        id={id}
      />

      <EditMeeting isOpen={eventView} handleCloseevent={handleCloseevent} dataByMeetingId={dataByMeetingId} fetchApiMeeting={fetchApiMeeting} setUserAction={setUserAction} meetingsId={meetingsId}/>

      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={"space-between"}>
          <Typography variant="h4" >
            Calendar
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenMeeting}>
              New Meeting
            </Button>
          </Stack>
        </Stack>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          minHeight="400px"
          height="600px"
          events={meetingList}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          eventClick={handleEventClick}
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

export default Event;