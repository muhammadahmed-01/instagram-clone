import React from "react";
import {createTheme} from "@mui/material/styles";
import Container from "@mui/material/Container";
import Notifications from "../../components/notifications"
import Layout from "../../components/layout";

export default function Messages() {
  return (
    <Layout>
      <Container sx={{float: "right"}}>
        <Notifications/>
      </Container>
    </Layout>
  );
}