import Sidebar from "../../Sidebar";
import React from "react";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/material";
import Container from "@mui/material/Container";
import Notifications from "../../components/notifications"
const theme = createTheme()

export default function Messages() {
  return (
    <ThemeProvider theme={theme}>
      <Sidebar sx={{float: "left"}}/>
      <Container sx={{float: "right"}}>
        <Notifications/>
      </Container>
    </ThemeProvider>
  );
}