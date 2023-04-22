import React, {useEffect} from "react";
import {
  Container,
  Avatar,
  Stack,
  Typography,
  Button,
  Tabs,
  Tab,
  Box,
  ImageList,
  ImageListItem
} from "@mui/material";
// import {Link} from "react-router-dom";
import Sidebar from "./Sidebar"
import Feed from "./Feed"
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {useContext} from "react";
import {UserContext} from "./UserContext";
const theme = createTheme()

export default function Home() {
  // const [user, setUser] = useContext(UserContext);
  // console.log("user = ", user);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Box sx={{display: 'flex'}}>
        <Sidebar/>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '95vh',
            overflow: 'auto',
            marginLeft: '13vw',
            marginTop: '5vh'
          }}
        >
          <Feed/>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
