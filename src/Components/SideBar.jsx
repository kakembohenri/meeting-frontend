import * as React from "react"
import { Link, Navigate } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from "@mui/material/Button";
import { Box, useMediaQuery } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import { useMemo, useState } from "react";
import { Dashboard, People, PowerSettingsNew, Person, PanTool, Groups, Campaign } from "@mui/icons-material";
import ViewProfile from "./ViewProfile";
import ChangePassword from "./ChangePassword";
import { useSendLogOutMutation } from "../services/authApiSlice";
import { useDispatch } from "react-redux";
import { logout } from "../services/authSlice";
import { useNavigate } from "react-router-dom";

const SideBar = () => {

  const theme = useTheme();

  const navigate = useNavigate()

  const [sendLogOut, {isLoading, isSuccess}] = useSendLogOutMutation();

  const dispatch = useDispatch()

  const width = useMediaQuery('(min-width:600px)')

  const [open, setOpen] = React.useState(true);
  const [profile, setProfile] = React.useState(false) 
  const [password, handlePassword] = React.useState(false)

  // Current path
  const currentPath = window.location.pathname.slice(1)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

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



  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'wrap',
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

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    height: 'fit-content',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));


    React.useEffect(() => {
      if(width){
        setOpen(() => true)
      }else{
        setOpen(() => false)
      }
    }, [width])

    const handleLogout = async() => {
      await sendLogOut();
      dispatch(logout())
      navigate("/login")
    }


  return (
    <>
    {/* Modals */}
      <Modal sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }} open={profile} onClose={() => setProfile(false)}>
        <>
          <ViewProfile setProfile={setProfile} />
        </>
      </Modal>
      <Modal sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }} open={password} onClose={() => handlePassword(false)}>
        <>
          <ChangePassword handlePassword={handlePassword} />
        </>
      </Modal>
    {/* End Modals */}
      <AppBar position="fixed" open={open}>
          <Toolbar sx={{ justifyContent: "space-between", background: "#35013f" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', justifyContent: "flex-end", width: '100%' }}>
              
              <Box className="menu" sx={{ position: "relative", display: "flex", alignItems: "center" }}>
                <Typography sx={{ display: "flex", alignItems: "center" }}>
                  <Person />
                  Profile
                </Typography>
                <Paper className="menu-list" elevation={3} sx={{ position: "absolute", top: "2rem",  flexDirection: "column" }}>
                  <Button onClick={() => setProfile(true)}>View</Button>
                  <Button onClick={() => handlePassword(true)}>Change Password</Button>
                </Paper>
              </Box>

                <Button sx={{color:"#fff", margin: "0 0.4rem"}} onClick={() => handleLogout()}>
                  <PowerSettingsNew />
                  Logout
                </Button>

            </Box>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open} sx={{ ".MuiDrawer-paper": {
          background: "#99ddcc"
        },   }}>
          <DrawerHeader>
            {open ? (
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>

            ): (
              <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              
            >
              <MenuIcon />
            </IconButton>
            
            )}
             
          </DrawerHeader>
          <Divider />
          {/* <Box> */}

          
          <List sx={{ display: 'flex', flexDirection:'column', justifyContent: 'space-evenly', height: '100%' }}>
            {['Dashboard', 'Users', 'Attendee', 'Meetings', 'Guest-preachers'].map((text, index) => (
              <Link className='nav-links' key={text} to={`/${text === 'Dashboard' ? 'dashboard' : text === 'Users' ? 'users': text === 'Attendee' ? 'attendee' : text === 'Guest-preachers' ? 'guest' : text === 'Meetings' && 'meetings'}`}>
              <ListItem  disablePadding className={`${(currentPath === "dashboard" && text === 'Dashboard') && 'active-link'} ${(currentPath === "users" && text === 'Users') && 'active-link'} ${(currentPath === "attendee" && text === 'Attendee') && 'active-link'} ${(currentPath === "meetings" && text === 'Meetings') && 'active-link'} ${(currentPath === "guest" && text === 'Guest-preachers') && 'active-link'}` }>
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
                    {text === "Dashboard" ? 
                    <Dashboard className={`${currentPath == 'dashboard' && 'icon-color'}`} /> 
                    : text === "Users" ? <People className={`${currentPath == 'users' && 'icon-color'}`} /> 
                    : text === "Attendee" ? <PanTool className={`${currentPath == 'attendee' && 'icon-color'}`} />
                    : text === "Meetings" ? <Groups className={`${currentPath == 'meetings' && 'icon-color'}`} />
                    : text === "Guest-preachers" && <Campaign className={`${currentPath == 'guest' && 'icon-color'}`} /> }
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>

              </Link>
            ))}
          </List>
          <Divider />
          {/* <List>
            {['Guest-preachers', 'Invites', 'Settings'].map((text, index) => (
              <Link className='nav-links' key={text} to={`/${text == 'Loans-Active' ? 'loans-active':'loan-applications'}`}>
              <ListItem key={text} disablePadding className={`${(currentPath == "loans-active" && text == 'Loans-Active') && 'active-link'} ${(currentPath == "loan-applications" && text == 'Loan Applications') && 'active-link'}` }>
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
                    {index % 2 === 0 ? <Business className={`${currentPath == 'loans-active' && 'icon-color'}`} /> : <Business className={`${currentPath == 'loan-applications' && 'icon-color'}`} />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
              </Link>
            ))}
          </List> */}
          {/* </Box> */}
        </Drawer>
    </>
  )
}
export default SideBar