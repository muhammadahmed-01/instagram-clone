import {Grid} from "@mui/material";
import Post from '../post'
import {useEffect, useState} from "react";
import axios from "../../utils/axiosInstance";
import Suggestions from "../suggestions";

export default function Index() {
  const [posts, setPosts] = useState([])

  const configData = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }

  useEffect(() => {
    axios.get('/api/posts', configData)
      .then(response => {
        // console.log("posts data = ", response.data); // handle response data
        setPosts(response.data)
      })
      .catch(error => {
        console.error(error); // handle error
      });
  }, [])

  return (<>
    <Grid container rowSpacing={1} sx={{
      width: "70vw !important",
      marginLeft: "9vw !important"}}
          columnSpacing={{xs: 1, sm: 1, md: 1}}>
      <Grid item xs={6}>
        {/*<Stack direction={"row"}*/}
        {/*       justifyContent="space-around"*/}
        {/*       alignItems="center"*/}
        {/*       sx={{*/}
        {/*         width: '35vw',*/}
        {/*         border: '0.1vw solid gray',*/}
        {/*         borderRadius: "0.5vw",*/}
        {/*         marginBottom: '2vh',*/}
        {/*         marginRight: '0',*/}
        {/*         padding: "1vh 0.5vw",*/}
        {/*         height: '10vh'*/}
        {/*       }}>*/}
        {/*  /!*<Avatar></Avatar>*!/*/}
        {/*  /!*<Avatar></Avatar>*!/*/}
        {/*  /!*<Avatar></Avatar>*!/*/}
        {/*  /!*<Avatar></Avatar>*!/*/}
        {/*  /!*<Avatar></Avatar>*!/*/}
        {/*</Stack>*/}
        {posts.map((post) => (
          <Post key={post._id} postId={post._id} username={post.user.name} url={post.image} caption={post.caption}
                likes={post.likes} comments={post.comments} timestamp={post.createdAt}/>
        ))}
      </Grid>
      <Grid item xs={4} sx={{marginLeft: "3vw !important"}}>
        <Suggestions/>
      </Grid>
    </Grid>
  </>)
}