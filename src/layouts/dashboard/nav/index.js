/* eslint-disable import/no-duplicates */
/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
// hooks
import { useEffect } from 'react';
// @mui
import { Box, Drawer } from '@mui/material';

import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useResponsive from '../../../hooks/useResponsive';

import { adminConfig, nmConfig, bmConfig, zmConfig, rmConfig, tmConfig } from './config';

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
  const userRole = user?.role.toLowerCase();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  const home = () => {
    navigate(`${userRole}/dashboard/app`);
  };

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
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex', cursor: 'pointer' }} onClick={home}>
        <h2>AioPro</h2>
      </Box>

      {user.role === 'Hr' || user.role === 'Admin' ? (
        <NavSection data={adminConfig} />
      ) : user.role === 'National Manager' ? (
        <NavSection data={nmConfig} />
      ) : user.role === 'Branch Manager' ? (
        <NavSection data={bmConfig} />
      ) : user.role === 'Zonal Manager' ? (
        <NavSection data={zmConfig} />
      ) : user.role === 'Regional Manager' ? (
        <NavSection data={rmConfig} />
      ) : user.role === 'Territory Manager' ? (
        <NavSection data={tmConfig} />
      ) : null}

      <Box sx={{ flexGrow: 1 }} />
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
