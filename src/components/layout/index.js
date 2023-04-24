import React from "react";
import {
  Box,
} from "@mui/material";
import Index from "../sidebar"
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
const theme = createTheme()

export default function Layout({children}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Box sx={{display: 'flex'}}>
        <Index/>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '95vh',
            overflow: 'auto',
            marginLeft: '3vw',
            marginTop: '5vh'
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
