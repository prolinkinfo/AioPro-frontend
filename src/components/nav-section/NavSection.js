import { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
  Box,
  List,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  ListItemButton,
  styled,
  useTheme,
  alpha,
} from '@mui/material';

// ----------------------------------------------------------------------

const ListSubheaderStyle = styled((props) => <ListSubheader disableSticky disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.overline,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(5),
    color: theme.palette.text.primary,
  })
);

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  '&:before': {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: 'none',
    position: 'absolute',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  active: PropTypes.func,
  isShow: PropTypes.bool,
  item: PropTypes.object,
};

function NavItem({ item, active, isShow }) {
  const theme = useTheme();
  const isActiveRoot = active(item?.path);
  const { title, path, icon, info, children } = item;
  const [open, setOpen] = useState(isActiveRoot);
  const [openSub, setOpenSub] = useState(false);
  const [openSupSub, setOpenSupSub] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    '&:before': { display: 'block' },
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  };

  const handleOpenSub = () => {
    setOpenSub((prev) => !prev);
  };
  const handleOpenSupSub = () => {
    setOpenSupSub((prev) => !prev);
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>

          <ListItemText disableTypography primary={title} />
          {info && info}

          {open ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children?.map((item, i) => {
              const { title, path, icon, nestedChildren } = item;
              const isActiveSub = active(path);

              if (nestedChildren) {
                return (
                  <>
                    <ListItemStyle
                      onClick={() => setOpenSub((pre) => (pre === i ? null : i))}
                      sx={{
                        ...(isActiveRoot && activeRootStyle),
                      }}
                    >
                      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>

                      <ListItemText disableTypography primary={title} />
                      {info && info}

                      {openSub === i ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
                    </ListItemStyle>

                    <Collapse in={openSub === i} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {nestedChildren?.map((items, index) => {
                          const { title, path } = items;
                          const isActiveSub = active(path);
                          return (
                            <ListItemStyle
                              key={index}
                              component={RouterLink}
                              to={path}
                              sx={{
                                ...(isActiveSub && activeSubStyle),
                              }}
                            >
                              <ListItemIconStyle>
                                <Box
                                  component="span"
                                  sx={{
                                    width: 4,
                                    height: 4,
                                    display: 'flex',
                                    borderRadius: '50%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: 'text.disabled',
                                    transition: (theme) => theme.transitions.create('transform'),
                                    ...(isActiveSub && {
                                      transform: 'scale(2)',
                                      bgcolor: 'primary.main',
                                    }),
                                  }}
                                />
                              </ListItemIconStyle>
                              {/* <ListItemIconStyle>{icon && icon}</ListItemIconStyle> */}

                              <ListItemText disableTypography primary={title} />
                            </ListItemStyle>
                          );
                        })}
                      </List>
                    </Collapse>
                  </>
                );
              }
              return (
                <ListItemStyle
                  key={title}
                  component={RouterLink}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'text.disabled',
                        transition: (theme) => theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: 'primary.main',
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle component={RouterLink} to={path}>
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  isShow: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  const { pathname } = useLocation();
  const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);

  return (
    <Box {...other}>
      {data?.map((list, index) => {
        return (
          <List disablePadding key={index}>
            <NavItem item={list} active={match} />
          </List>
        );
      })}
    </Box>
  );
}
