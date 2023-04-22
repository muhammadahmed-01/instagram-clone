import {Avatar, Box, Container, IconButton, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";
// import {useAuth} from "../contexts/AuthContext";

export default function Suggestions() {
  // const {currentUser} = useAuth()
  return (
    <>
      <Container disableGutters={true} sx={{
        width: '25vw',
        // border: '0.1vw solid gray',
        padding: "2vh 1vh",
        borderRadius: "0.5vw",
        display: "inline-block",
        marginLeft: '2vw',
      }}>
        <Stack direction={"row"}
               justifyContent="space-between"
               alignItems="center"
        >
          <Avatar sx={{width: 56, height: 56}}></Avatar>
          <Stack direction={"column"}>
            {/*<Link href={"#"}>{currentUser.displayName}</Link>*/}
            <Typography>{"Muhammad Ahmed"}</Typography>
          </Stack>
          <Link to={"#"} style={{textDecoration: 'none', color: "#0095f6"}}>{"Switch"}</Link>
        </Stack>
        <Stack direction={"row"}
               justifyContent="space-between"
               alignItems="center"
               sx={{paddingTop: "2vh"}}
        >
          <Typography>{"Suggestions For You"}</Typography>
          <Link to={"#"}>{"See All"}</Link>
        </Stack>
        <Stack direction={"column"}>
          {/*The following box will be a loop*/}
          <Stack direction={"row"}
                 justifyContent="space-between"
                 alignItems="center"
                 sx={{paddingTop: "2vh"}}>
            <Avatar></Avatar>
            <Stack direction={"column"}>
              <Link to={"#"}>{"raahim_yousufzai"}</Link>
              <Typography variant={"caption"}>{"Followed by ahmed.azhar2299 + 14 more"}</Typography>
            </Stack>
            <Link to={"#"} style={{textDecoration: 'none', color: "#0095f6"}}>{"Follow"}</Link>
          </Stack>
          <Stack direction={"row"}
                 justifyContent="space-between"
                 alignItems="center"
                 sx={{paddingTop: "2vh"}}>
            <Avatar></Avatar>
            <Stack direction={"column"}>
              <Link to={"#"}>{"raahim_yousufzai"}</Link>
              <Typography variant={"caption"}>{"Followed by ahmed.azhar2299 + 14 more"}</Typography>
            </Stack>
            <Link to={"#"} style={{textDecoration: 'none', color: "#0095f6"}}>{"Follow"}</Link>
          </Stack>
          <Stack direction={"row"}
                 justifyContent="space-between"
                 alignItems="center"
                 sx={{paddingTop: "2vh"}}>
            <Avatar></Avatar>
            <Stack direction={"column"}>
              <Link to={"#"}>{"raahim_yousufzai"}</Link>
              <Typography variant={"caption"}>{"Followed by ahmed.azhar2299 + 14 more"}</Typography>
            </Stack>
            <Link to={"#"} style={{textDecoration: 'none', color: "#0095f6"}}>{"Follow"}</Link>
          </Stack>
          <Stack direction={"row"}
                 justifyContent="space-between"
                 alignItems="center"
                 sx={{paddingTop: "2vh"}}>
            <Avatar></Avatar>
            <Stack direction={"column"}>
              <Link to={"#"}>{"raahim_yousufzai"}</Link>
              <Typography variant={"caption"}>{"Followed by ahmed.azhar2299 + 14 more"}</Typography>
            </Stack>
            <Link to={"#"} style={{textDecoration: 'none', color: "#0095f6"}}>{"Follow"}</Link>
          </Stack>
          <Stack direction={"row"}
                 justifyContent="space-between"
                 alignItems="center"
                 sx={{paddingTop: "2vh"}}>
            <Avatar></Avatar>
            <Stack direction={"column"}>
              <Link to={"#"}>{"raahim_yousufzai"}</Link>
              <Typography variant={"caption"}>{"Followed by ahmed.azhar2299 + 14 more"}</Typography>
            </Stack>
            <Link to={"#"} style={{textDecoration: 'none', color: "#0095f6"}}>{"Follow"}</Link>
          </Stack>
        </Stack>
        <Box>
          {/*This will display the footer*/}
        </Box>
        <Box>
          {/*This will display the copyrights*/}
        </Box>
      </Container>
    </>
  )
}