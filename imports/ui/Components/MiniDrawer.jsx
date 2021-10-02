import * as React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { Link, Switch, Route } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CodeIcon from '@mui/icons-material/Code';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BarChartIcon from '@mui/icons-material/BarChart';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import TerrainIcon from '@mui/icons-material/Terrain';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TuneIcon from '@mui/icons-material/Tune';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import DashboardIcon from '@mui/icons-material/Dashboard';

const drawerWidth = 240;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

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
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
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
}));

const logout = () => Meteor.logout();

export default function MiniDrawer({ children }) {
  const user = useTracker(() => Meteor.user());
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            CodeIQ
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
        </DrawerHeader>
        <Divider />
        {user ? (
          <List>
            <StyledLink to="/account">
              <ListItem button key="account">
                <ListItemIcon>
                  <AccountBoxIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItem>
            </StyledLink>
            <StyledLink to="/dashboard">
              <ListItem button key="dashboard">
                <ListItemIcon>
                  <DashboardIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </StyledLink>
            {Roles.userIsInRole(Meteor.userId(), 'admin') && (
              <StyledLink to="/admin">
                <ListItem button key="admin">
                  <ListItemIcon>
                    <SupervisorAccountIcon fontSize="medium" />
                  </ListItemIcon>
                  <ListItemText primary="Admin" />
                </ListItem>
              </StyledLink>
            )}
            <Divider />
            <StyledLink to="/battle">
              <ListItem button key="Battle">
                <ListItemIcon>
                  <CodeIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="Battle Royale" />
              </ListItem>
            </StyledLink>
            <StyledLink to="/golf">
              <ListItem button key="Golf">
                <ListItemIcon>
                  <GolfCourseIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="Code Golf" />
              </ListItem>
            </StyledLink>
            <StyledLink to="/duel">
              <ListItem button key="duel">
                <ListItemIcon>
                  <MergeTypeIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="Duel" />
              </ListItem>
            </StyledLink>
            <StyledLink to="/time-trial">
              <ListItem button key="time-trial">
                <ListItemIcon>
                  <HourglassEmptyIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="Time Trial" />
              </ListItem>
            </StyledLink>
            <StyledLink to="/practice">
              <ListItem button key="practice">
                <ListItemIcon>
                  <FitnessCenterIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="Practice" />
              </ListItem>
            </StyledLink>
            <Divider />
            <StyledLink to="/leaderboard">
              <ListItem button key="leaderboard">
                <ListItemIcon>
                  <BarChartIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="Leaderboard" />
              </ListItem>
            </StyledLink>
            <StyledLink to="/top-users">
              <ListItem button key="top-users">
                <ListItemIcon>
                  <TerrainIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="Top Users" />
              </ListItem>
            </StyledLink>
            <StyledLink to="/progress">
              <ListItem button key="progress">
                <ListItemIcon>
                  <TrendingUpIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="Progress" />
              </ListItem>
            </StyledLink>
            <Divider />
            <StyledLink to="/messages">
              <ListItem button key="messages">
                <ListItemIcon>
                  <MailIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="Messages" />
              </ListItem>
            </StyledLink>
            <StyledLink to="/settings">
              <ListItem button key="settings">
                <ListItemIcon>
                  <TuneIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            </StyledLink>
            <StyledLink to="/">
              <ListItem button key="logout" onClick={logout}>
                <ListItemIcon>
                  <MeetingRoomIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </StyledLink>
          </List>
        ) : (
          <List>
            <StyledLink to="/login">
              <ListItem button key="login">
                <ListItemIcon>
                  <FingerprintIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
            </StyledLink>
            <StyledLink to="/signup">
              <ListItem button key="signup">
                <ListItemIcon>
                  <AssignmentIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="Signup" />
              </ListItem>
            </StyledLink>
          </List>
        )}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
