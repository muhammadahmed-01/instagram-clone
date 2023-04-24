import React, {useContext, useState} from "react";
import {styled} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {Link, useNavigate} from "react-router-dom";
import {
  Avatar,
  Card,
  CardMedia,
} from "@mui/material";
import {
  Search,
  FavoriteBorder,
  AddBoxOutlined,
  Home,
  Message,
  Menu,
  Login,
  Logout
} from '@mui/icons-material';
import InstagramLogo from '../../instagram-logo.svg';

const drawerWidth = 245;

const Drawer = styled(MuiDrawer,
  {shouldForwardProp: (prop) => prop !== "open"})(({theme, open}) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));


export default function Index() {
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("userData"));
  const [username, setUsername] = useState(user?.email.split("@")[0])
  const PF = process.env.REACT_APP_PUBLIC_IMAGE_FOLDER;
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();

  const clickLogin = () => {
    navigate("/login")
  };

  const clickSignup = () => {
    navigate("/signup")
  };

  const clickLogout = () => {
    localStorage.removeItem("token")
    localStorage.setItem("userData", null);
    // setUser(null);
    navigate("/login")
    console.log("Logged out")
  }

  const clickProfile = () => {
    navigate(`/profile?username=${username}`);
  }

  return (
    <Drawer variant="permanent" open={true}
            sx={{height: "100vh", display: "inline-block"}}>
      <Card sx={{minHeight: "12vh"}}>
        <CardMedia
          component="img"
          sx={{
            objectFit: "contain", marginTop: "5vh", width: "10vw", height: "4vh"
          }}
          image={InstagramLogo}
          alt="Instagram"/>
      </Card>
      <List component="nav">
        <ListItemButton onClick={() => {
          navigate("/")
        }}>
          <ListItemIcon>
            <Home/>
          </ListItemIcon>
          <ListItemText primary="Home"/>
        </ListItemButton>
        <ListItemButton onClick={() => {
          navigate("/search")
        }}>
          <ListItemIcon>
            <Search/>
          </ListItemIcon>
          <ListItemText primary="Search"/>
        </ListItemButton>
        {/*<ListItemButton>*/}
        {/*  <ListItemIcon>*/}
        {/*    <ExploreOutlined/>*/}
        {/*  </ListItemIcon>*/}
        {/*  <ListItemText primary="Explore"/>*/}
        {/*</ListItemButton>*/}
        {/*<ListItemButton>*/}
        {/*  <ListItemIcon>*/}
        {/*    <Movie/>*/}
        {/*  </ListItemIcon>*/}
        {/*  <ListItemText primary="Reels"/>*/}
        {/*</ListItemButton>*/}
        <ListItemButton onClick={() => {
          navigate("/messages")
        }}>
          <ListItemIcon>
            <Message/>
          </ListItemIcon>
          <ListItemText primary="Messages"/>
        </ListItemButton>
        <ListItemButton onClick={() => {
          navigate("/notifications")
        }}>
          <ListItemIcon>
            <FavoriteBorder/>
          </ListItemIcon>
          <ListItemText primary="Notifications"/>
        </ListItemButton>
        <ListItemButton onClick={handleOpen}>
          <ListItemIcon>
            <AddBoxOutlined/>
          </ListItemIcon>
          <ListItemText primary="Create"/>
        </ListItemButton>
        <ListItemButton onClick={clickProfile}>
          <ListItemIcon>
            <Avatar
              src={
                user?.profilePic
                  ? PF + user.profilePic
                  : PF + "/noPic.jpg"
              }
              sx={{width: 24, height: 24}}/>
          </ListItemIcon>
          <ListItemText primary="Profile"/>
        </ListItemButton>
        <ListItemButton onClick={clickLogin}>
          <ListItemIcon>
            <Login/>
          </ListItemIcon>
          <ListItemText primary="Login"/>
        </ListItemButton>
        <ListItemButton onClick={clickSignup}>
          <ListItemIcon>
            <Logout/>
          </ListItemIcon>
          <ListItemText primary="Signup"/>
        </ListItemButton>
        <ListItemButton onClick={clickLogout}>
          <ListItemIcon>
            <Logout/>
          </ListItemIcon>
          <ListItemText primary="Logout"/>
        </ListItemButton>
      </List>
      <List sx={{marginTop: "auto", marginBottom: "5%"}}>
        <ListItemButton>
          <ListItemIcon>
            <Menu/>
          </ListItemIcon>
          <ListItemText primary="More"/>
        </ListItemButton>
      </List>
    </Drawer>
  )
}
