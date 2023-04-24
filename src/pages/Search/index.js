import React, {useState} from "react";
import {
  Container,
  Avatar,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "../../utils/axiosInstance"
import Layout from "../../components/layout";

export default function Search() {
  const [users, setUsers] = useState([])

  const handleSearch = async (e) => {
    const q = e.target.value;
    if (q.length === 0) {
      setUsers([])
    } else {
      const res = await axios.get(`/api/profile/search?username=${q}`)
      // console.log(res.data)
      setUsers(res.data)
    }
  }

  return (
    <Layout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '90vh',
          overflow: 'auto',
          marginLeft: '13vw',
          marginTop: '5vh',
        }}
      >
        <TextField
          sx={{width: '50vw'}}
          type={"text"}
          placeholder={"Enter something to search..."}
          onChange={(e) => handleSearch(e)}
        />
        <ul style={{listStyleType: "none", padding: 0}}>
          {users.map(user => (
            <li key={user._id}>
              <Container sx={{
                height: "20vh", display: "flex",
                alignItems: "center"
              }}>
                <Avatar
                  alt="Remy Sharp"
                  src={`http://localhost:3001/uploads/${user.profilePic}`}
                  sx={{
                    width: "4.5vw",
                    height: "8vh",
                  }}
                />
                <Stack sx={{marginLeft: "2vw"}}>
                  <Stack direction="row"
                         sx={{
                           width: "20vw", height: "6vh", alignItems: "center"
                         }}>
                    <Typography>
                      {user.name}
                    </Typography>
                  </Stack>
                </Stack>
              </Container>
            </li>
          ))}
        </ul>
      </Box>
    </Layout>
  )
}