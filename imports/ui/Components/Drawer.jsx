import React from 'react';
import styled from 'styled-components';
import { Link, Switch, Route } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import CodeIcon from '@material-ui/icons/Code';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import MergeTypeIcon from '@material-ui/icons/MergeType';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BarChartIcon from '@material-ui/icons/BarChart';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import TerrainIcon from '@material-ui/icons/Terrain';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TuneIcon from '@material-ui/icons/Tune';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import AssignmentIcon from '@material-ui/icons/Assignment';

const drawerWidth = 200;

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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  brand: {
    marginLeft: theme.spacing(2),
  },
  menuButton: {
    marginLeft: -3,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
    height: theme.spacing(1),
    width: '100%',
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
    minHeight: 48,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
}));

const logout = () => Meteor.logout();

export default function MiniDrawer({ children }) {
  const user = useTracker(() => Meteor.user());
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar variant="dense" className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon fontSize="medium" />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            {!open && 'CodeIQ'}
          </Typography>
          <Switch>
            <Route path="/golf">
              <Button variant="contained" color="default">
                Run code
              </Button>
            </Route>
          </Switch>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
          <Typography variant="h6" nowrap className={classes.brand}>
            CodeIQ
          </Typography>
        </div>
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
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
