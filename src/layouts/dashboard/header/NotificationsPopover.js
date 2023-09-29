import PropTypes from 'prop-types';
import { set, sub } from 'date-fns';
import { noCase } from 'change-case';
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
// utils
import { Link } from 'react-router-dom';
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { apiget, apiput } from '../../../service/api';
import ApprovalModel from './ApprovalModel';

// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    id: faker.datatype.uuid(),
    title: 'Your order is placed',
    description: 'waiting for shipping',
    avatar: null,
    type: 'order_placed',
    createdAt: set(new Date(), { hours: 10, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.datatype.uuid(),
    title: faker.name.fullName(),
    description: 'answered to your comment on the Minimal',
    avatar: '/assets/images/avatars/avatar_2.jpg',
    type: 'friend_interactive',
    createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.datatype.uuid(),
    title: 'You have new message',
    description: '5 unread messages',
    avatar: null,
    type: 'chat_message',
    createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.datatype.uuid(),
    title: 'You have new mail',
    description: 'sent from Guido Padberg',
    avatar: null,
    type: 'mail',
    createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.datatype.uuid(),
    title: 'Delivery processing',
    description: 'Your order is being shipped',
    avatar: null,
    type: 'order_shipped',
    createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
];

export default function NotificationsPopover() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const [notification, setNotification] = useState([]);

  const activeNotifications = notification?.filter(notification => notification?.status === 'active');

  const totalUnRead = activeNotifications?.length;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  // const handleMarkAllAsRead = () => {
  //   setNotifications(
  //     notifications.map((notification) => ({
  //       ...notification,
  //       isUnRead: false,
  //     }))
  //   );
  // };

  const { id } = JSON.parse(localStorage.getItem('user'));

  const notificationApi = async () => {
    const result = await apiget(`/api/notification/?approvalBy=${id}`);
    if (result) {
      const filteredNotifications = result?.data?.filter(notification => notification?.status === 'active');
      setNotification(filteredNotifications);
    }
  };

  useEffect(() => {
    notificationApi();
  }, []);

  console.log(notification, "notification")

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen} sx={{ width: 40, height: 40 }}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline', textAlign: "center", textTransform: "capitalize" }}>
                {
                  notification?.length > 0 ? "" : 'No Notification Found'
                }
              </ListSubheader>
            }
          >
            {notification?.map((notification) => (
              <NotificationItem key={notification._id} notification={notification} handleClose={handleClose} notificationApi={notificationApi} />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple onClick={handleClose}>
            <Link to={"/dashboard/notification"} style={{ textDecoration: "none" }}>View All</Link>
          </Button>
        </Box>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

// NotificationItem.propTypes = {
//   notification: PropTypes.shape({
//     createdAt: PropTypes.instanceOf(Date),
//     id: PropTypes.string,
//     isUnRead: PropTypes.bool,
//     title: PropTypes.string,
//     description: PropTypes.string,
//     type: PropTypes.string,
//     avatar: PropTypes.any,
//   }),
// };

function NotificationItem({ notification, handleClose, notificationApi }) {
  const { avatar } = renderContent(notification);

  const [meetingData, setMeetingData] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenModel = () => {
    setIsOpen(true)
    // handleClose();
  }
  const handleCloseModel = () => setIsOpen(false)

  const editNotification = async () => {
    const data = {
      _id: meetingData?._id,
      status: "deActive",
      createdBy: meetingData?.createdBy?._id,
      approvalBy: meetingData?.approvalBy
    };
    const result = await apiput(`/api/notification`, data);
    if (result && result.status === 200) {
      handleCloseModel();
      notificationApi();
      handleClose();
    }
  }



  const editNotificationApproval = async () => {
    const data = {
      _id: meetingData?._id,
      status: "deActive",
    };
    const result = await apiput(`/api/notification/approvel`, data);
    if (result && result.status === 200) {
      handleCloseModel();
      notificationApi();
      handleClose();
    }
  };

  const handleClick = (data) => {
    setMeetingData(data)
    handleOpenModel();
  }

console.log(meetingData,"meetingData")

  return (
    <>
      {
        meetingData?.type !== "meeting_approvel" &&
        <ApprovalModel open={isOpen} handleClose={handleCloseModel} meetingData={meetingData} editNotification={editNotification} notification={notification} />
      }
      <ListItemButton
        sx={{
          py: 1.5,
          px: 2.5,
          mt: '1px',
          ...(notification.isUnRead && {
            bgcolor: 'action.selected',
          }),
        }}
        onClick={() => {
          if (meetingData?.type === "meeting_approvel") {
            editNotificationApproval();
          } else {
            handleClick(notification);
          }
        }}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
        </ListItemAvatar>
        {

        }
        <ListItemText
          primary={notification?.data?.message}
          style={{ textTransform: "capitalize" }}
          secondary={
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: 'flex',
                alignItems: 'center',
                color: 'text.disabled',
              }}
            >
              <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
              {fToNow(notification?.createdOn)}
            </Typography>
          }
        />
      </ListItemButton >
    </>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification?.data?.subject}
      {/* <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.description)}
      </Typography> */}
    </Typography>
  );

  if (notification?.type === 'meeting') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_chat.svg" />,
      title,
    };
  }
  return {
    avatar: notification?.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title,
  };
}
