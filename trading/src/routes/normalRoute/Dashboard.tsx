import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
// import Box from "@material-ui/core/Box";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
// import Badge from "@material-ui/core/Badge";
import Container from '@material-ui/core/Container';
// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
// import Link from "@material-ui/core/Link";
import MenuIcon from '@material-ui/icons/Menu';
import styled from 'styled-components';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { MainListItems } from '@components/layout/listLtems';
import ContentsRouter from '@routes/ContentsRouter';
import Modal from '@mui/material/Modal';
import { logoutActions } from '@redux/reducers/authReducer';
import { RootState } from '@redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import PrivateSetting from '@containers/Dashboard/privateSettingContainer';
import { CommonButtonContainer } from '../../containers/common/ButtonContainer';
import 'animate.css';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
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
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Btro_core',
  },
  loginIcon: {
    // flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    zIndex: 0,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));
export const Balloon = styled.div`
  position: absolute;
  top: 17.3rem;
  left: 14rem;
  z-index: 4;
  width: 26rem;
  height: 3rem;
  background: #adb6c4;
  border-radius: 15px;
  animation: 'bounce';
  animation-duration: 3s;
  :after {
    border-top: 15px solid #adb6c4;
    border-left: 15px solid transparent;
    border-right: 0px solid transparent;
    border-bottom: 0px solid transparent;
    content: '';
    position: absolute;
    top: 7px;
    left: -13px;
  }
`;
export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [settingOpen, setSettingOpen] = useState(false);
  const [search, setsearch] = useState('');
  const dispatch = useDispatch();
  const apiKey = useSelector((state: RootState) => state.auth.apiKey);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleSettingOpen = () => setSettingOpen(true);
  const handleSettingClose = () => setSettingOpen(false);
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('click button');
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearch(e.target.value);
  };
  const handleKeyPress = () => {
    console.log('press key: ', search);
  };
  const handleLogout = () => {
    dispatch(logoutActions.request());
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
        style={{ background: '#294c60' }}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden,
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            tradingbot
          </Typography>
          <IconButton color="inherit" className={classes.loginIcon}>
            <AccountCircleIcon />
          </IconButton>
          {/* <Button variant="contained" color="primary">
            Login
          </Button> */}
          <CommonButtonContainer
            title="LOGOUT"
            color="white"
            onClick={handleLogout}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems handleSettingOpen={handleSettingOpen} />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <ContentsRouter />
      </main>
      <Modal open={settingOpen} onClose={handleSettingClose}>
        <PrivateSetting handleClose={handleSettingClose} />
      </Modal>
      {apiKey && (
        <Balloon>
          <div style={{ margin: '1rem 0rem 0rem 0.5rem' }}>
            Private Setting에서 API Key를 등록해야만 진행이 가능합니다.
          </div>
        </Balloon>
      )}
    </div>
  );
}
