import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '../AppStore';
import InfoIcon from '@mui/icons-material/Info';
import '../SideNav/StyleNavLink.css'
import InsightsIcon from '@mui/icons-material/Insights';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import ForumIcon from '@mui/icons-material/Forum';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(5)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
   
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
   
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

  
const SideNav = () => {
  // const theme = useTheme();
  const navigate = useNavigate();
    const open = useAppStore((state)=>state.dopen);
   
  return (
    <div className=' '>
       <Box className="" sx={{ display: 'flex', }}>
      <CssBaseline />
      <Drawer  variant="permanent" open={open} >
      <Box className="" height={60}  />
        <Divider />
        <List  sx={{backgroundColor:""}}>
        <NavLink   activeClassName='active' to={'/analytics'} >
            <ListItem disablePadding sx={{ display: 'block' }} onClick={()=>navigate('/analytics')} >
              <ListItemButton className='bg-black'
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 <InsightsIcon />
                </ListItemIcon>
                <ListItemText primary='Analytics' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            </NavLink>
            <NavLink activeClassName='active' to={'/company'}>
            <ListItem disablePadding sx={{ display: 'block' }} onClick={()=>navigate('/company')}>
              <ListItemButton 
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary='Company' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
              </NavLink>
              <NavLink activeClassName='active' to={'/user'}>
            <ListItem disablePadding sx={{ display: 'block' }} onClick={()=>navigate('/user')}>
              <ListItemButton 
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 < PersonIcon /> 
                </ListItemIcon>
                <ListItemText primary='User' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
              </NavLink>
              <NavLink to={'/support-ticket'}>
            <ListItem disablePadding sx={{ display: 'block' }} onClick={()=>navigate('/support-ticket')}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 <LocalActivityIcon  /> 
                </ListItemIcon>
                <ListItemText primary='Support Ticket' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            </NavLink>
            <NavLink to={'/external-request-view'}>
            <ListItem disablePadding sx={{ display: 'block' }} onClick={()=>navigate('/external-request-view')}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}

                >
               
                 <SlideshowIcon />
                </ListItemIcon>
                <ListItemText primary='External Request View' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            </NavLink>
            <NavLink to={'/internal-request-view'}>
            <ListItem disablePadding sx={{ display: 'block' }} onClick={()=>navigate('/internal-request-view')}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 <SlideshowIcon />
                </ListItemIcon>
                <ListItemText primary='Internal Request View' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            </NavLink>
            <NavLink to={'/secure-channel'}>
            <ListItem disablePadding sx={{ display: 'block' }} onClick={()=>navigate('/secure-channel')}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}

                >
                 <ForumIcon /> 
                </ListItemIcon>
                <ListItemText primary='Secure Channel' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            </NavLink>
            <NavLink to={'/logs'}>
            <ListItem disablePadding sx={{ display: 'block' }} onClick={()=>navigate('/logs')}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}

                >
                 <InfoIcon /> 
                </ListItemIcon>
                <ListItemText primary='Logs' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            </NavLink>
        </List>
      </Drawer>
    </Box>
    </div>
  )
}

export default SideNav;





