/* eslint-disable import/no-duplicates */
/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
// hooks
import { useEffect } from 'react';
// @mui
import { Box, Drawer, } from '@mui/material';

import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useResponsive from '../../../hooks/useResponsive';

import navConfig from './config';
import UserConfig from './userconfig';


// components
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const user = JSON.parse(localStorage.getItem('user'));
const navigate = useNavigate()

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  const home =()=>{
    navigate('/dashboard/app')
  }

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex', cursor: "pointer" }} onClick={home}>
        {/* <img src="/assets/logo prolink.png" width={150}  /> */}
        <h2>AioPro</h2>
      </Box>

      {/* <Box sx={{ mb: 5, mx: 2.5 }}> */}
      {/* <Link underline="none"> */}
      {/* <StyledAccount>
            <Avatar src={account.photoURL} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {account.displayName}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {account.role}
              </Typography>
            </Box>
          </StyledAccount> */}
      {/* </Link> */}
      {/* </Box> */}

      {
        user.role === "user" ? <NavSection data={UserConfig} /> : <NavSection data={navConfig} />
      }


      <Box sx={{ flexGrow: 1 }} />

      {/* <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
          <Box
            component="img"
            src="/assets/illustrations/illustration_avatar.png"
            sx={{ width: 100, position: 'absolute', top: -50 }}
          />

          <Box sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h6">
              Get more?
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              From only $69
            </Typography>
          </Box>

          <Button href="https://material-ui.com/store/items/minimal-dashboard/" target="_blank" variant="contained">
            Upgrade to Pro
          </Button>
        </Stack>
      </Box> */}
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
