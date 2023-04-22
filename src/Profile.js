import React, {useContext, useEffect} from "react";
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
import {createTheme, ThemeProvider} from "@mui/material/styles";
import PropTypes from "prop-types";
import axios from "./axiosInstance"
import {useLocation, useNavigate} from "react-router-dom";
import {UserContext} from "./UserContext";
const theme = createTheme()

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          {/*<ImageList sx={{ width: "100%", height: "100%", overflowY: "hidden" }} cols={3} rowHeight={164}>*/}
          {/*  {itemData.map((item) => (*/}
          {/*    <ImageListItem key={item.img}>*/}
          {/*      <img*/}
          {/*        src={`${item.img}?fit=crop&auto=format`}*/}
          {/*        srcSet={`${item.img}?fit=crop&auto=format&dpr=2 2x`}*/}
          {/*        alt={item.title}*/}
          {/*        loading="lazy"*/}
          {/*      />*/}
          {/*    </ImageListItem>*/}
          {/*  ))}*/}
          {/*</ImageList>*/}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ProfilePage() {
  // const classes = useProfilePageStyles();
  const [value, setValue] = React.useState(0);
  const [username, setUsername] = React.useState("");
  const [profilePic, setProfilePic] = React.useState("");
  const [numOfPosts, setNumOfPosts] = React.useState();
  const [numOfFollowers, setNumOfFollowers] = React.useState();
  const [numOfFollowing, setNumOfFollowing] = React.useState();
  // const [userData, setUserData] = React.useState("");
  const PF = process.env.REACT_APP_PUBLIC_IMAGE_FOLDER;
  const [followStatus, setFollowStatus] = React.useState("");
  // const [user, setUser] = useContext(UserContext);
  const currentUser = JSON.parse(localStorage.getItem("userData"));
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate()
  // const num_of_posts = "darkshadowft";
  // const num_of_followers = "darkshadowft";
  // const num_of_following = "darkshadowft";
  // const full_name = "darkshadowft";

  const configData = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get('username');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function editProfile(){
    navigate("/profile-edit")
  }

  async function toggleFollowUser(){
    if (followStatus === "Follow"){
      const res = await axios.post("/api/users/follow", {followerUsername: paramValue}, configData)
      console.log(res.data)
      if (res.data.message === "User followed successfully"){
        setFollowStatus("Following")
      }
    }
    else {
      const res = await axios.delete("/api/users/unfollow", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: {
          followingUsername: paramValue
        }
      });
      console.log(res.data)
      if (res.data.message === "User unfollowed successfully"){
        setFollowStatus("Follow")
      }
    }

  }

  const createPost = () => {
    // Example data for creating a new post
    const postData = {
      user: user,
      image: 'https://plus.unsplash.com/premium_photo-1670493557623-d0c91a65b633?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=408&q=80',
      caption: 'the sun shines brightly through the trees in the snow',
      likes: [],
      comments: [],
    };

// Make a POST request to create a new post using Axios
    axios.post("/api/posts", postData)
      .then(response => {
        // Handle successful response here
        console.log(response.data);
      })
      .catch(error => {
        // Handle errors here
        console.error(error);
      });
  }

  // const value = "posts"

  useEffect(() => {
    (async () => {
      axios.get(`/api/profile/email?username=${paramValue}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          const data = response.data;
          setUser(data)
          // console.log(JSON.stringify(data))
          setUsername(data?.email.split("@")[0]);
          setProfilePic(data?.profilePic);
          setNumOfPosts(data?.posts.length);
          setNumOfFollowers(data?.followers.length);
          setNumOfFollowing(data?.following.length);

          if (data?.followers.includes(currentUser.id)){
            setFollowStatus("Following")
          }
          else {
            setFollowStatus("Follow")
          }
        })
        .catch(error => {
          console.error(error);
        });
    })()
  }, [paramValue])

  return (
    <ThemeProvider theme={theme}>
      <Sidebar sx={{float: "left"}}/>
      <Container sx={{float: "right"}}>
        <Container sx={{
          height: "20vh", display: "flex",
          justifyContent: "center", alignItems: "center"
        }}>
          {/*<Button onClick={() => createPost()}>Create a post</Button>*/}
          <Avatar
            alt="Remy Sharp"
            src={
              user?.profilePic
                ? PF + user.profilePic
                : PF + "/noPic.jpg"
            }
            sx={{
              width: "9vw",
              height: "16vh",
            }}
          />
          <Stack sx={{marginLeft: "2vw"}}>
            <Stack direction="row"
                   sx={{width: "20vw", height: "6vh", alignItems: "center"}}>
              <Typography>
                {username}
              </Typography>
              {
                paramValue !== currentUser.email.split("@")[0] ? (
                  <Button variant={"outlined"} size={"medium"} sx={{
                    marginLeft: "2vw", backgroundColor: "#efefef", color: "black",
                    borderColor: "#efefef", borderRadius: "0.5vw"
                  }} onClick={() => toggleFollowUser()}>
                    {followStatus}
                  </Button>
                ) : null
              }
              {
                paramValue === currentUser.email.split("@")[0] ? (
                  <Button variant={"outlined"} size={"medium"} sx={{
                    marginLeft: "2vw", backgroundColor: "#efefef", color: "black",
                    borderColor: "#efefef", borderRadius: "0.5vw"
                  }} onClick={editProfile}>
                    Edit profile
                  </Button>
                ) : null
              }
            </Stack>
            <Stack direction="row" sx={{
              width: "20vw", height: "4vh", justifyContent: "space-between"
            }}>
              <Typography>
                {numOfPosts}&nbsp;{"post"}
              </Typography>
              <Typography>
                {numOfFollowers}&nbsp;{"followers"}
              </Typography>
              <Typography>
                {numOfFollowing}&nbsp;{"following"}
              </Typography>
            </Stack>
            <Stack direction={"row"} sx={{height: "4vh"}}>
              <Typography>
                {user?.name}
              </Typography>
            </Stack>
          </Stack>
        </Container>
        <Container>
          <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Tabs value={value} onChange={handleChange} centered
                  aria-label="basic tabs example">
              <Tab label="Posts" {...a11yProps(0)}/>
              <Tab label="Saved" {...a11yProps(1)}/>
              {/*<Tab label="Item Three" {...a11yProps(2)}/>*/}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            Posts
          </TabPanel>
          <TabPanel value={value} index={1}>
            Saved
          </TabPanel>
          {/*<TabPanel value={value} index={2}>*/}
          {/*  Item Three*/}
          {/*</TabPanel>*/}
        </Container>
      </Container>
    </ThemeProvider>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
];