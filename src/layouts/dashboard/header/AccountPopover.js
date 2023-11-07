import { useEffect, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import { Link, useNavigate } from 'react-router-dom';
import Jwt from 'jwt-decode';
import { toast } from 'react-toastify';
import account from '../../../_mock/account';
import { getsingleuser } from '../../../service/api';
// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [userAction, setUserAction] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role.toLowerCase();
  const userRole = role === 'admin' ? 'admin' : role === 'hr' ? 'hr' : role === 'national manager' ? 'nm' : '';

  const MENU_OPTIONS = [
    {
      label: 'Profile',
      icon: 'eva:home-fill',
      path: `/${userRole}/dashboard/user/view/${user?.id}`,
    },
    {
      label: 'Setting',
      icon: 'eva:person-fill',
      path: `/${userRole}/dashboard/user/view/${user?.id}`,
    },
    {
      label: 'Meeting',
      icon: 'eva:person-fill',
      path: `/${userRole}/dashboard/event/${user?.id}`,
    },
  ];

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const navigate = useNavigate();

  const logout = () => {
    try {
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      console.error('Error while navigating:', error);
    }
  };

  // const checkTokenExpiration = () => {
  const token = localStorage.getItem('token'); // Retrieve the token from local storage (or session)
  if (token) {
    try {
      const decodedToken = Jwt(token);
      const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
      if (decodedToken.exp < currentTime) {
        logout();
        toast.error('Token has expired');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  // };

  const fetchdata = async () => {
    const result = await getsingleuser(`/api/users`, user?.id);
    setUserAction(result);
    if (result && result.status === 200) {
      setUserDetails(result.data);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [userAction]);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={userDetails?.avatar} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap style={{ textTransform: 'capitalize' }}>
            {`${user?.userName}`}
          </Typography>
          {/* <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.emailAddress}
          </Typography> */}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option, index) => (
            <MenuItem key={index + 1} onClick={handleClose}>
              <Link to={option.path} style={{ textDecoration: 'none', color: 'black' }}>
                {option.label}
              </Link>
            </MenuItem>
          ))}
        </Stack>
        {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

        <MenuItem onClick={logout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
