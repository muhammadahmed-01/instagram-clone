import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  ImageListItem,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from "react-router-dom"
import {
  MoreHorizOutlined,
  Favorite,
  FavoriteBorder,
  Message,
  Send,
  BookmarkBorderOutlined,
  InsertEmoticonOutlined
} from '@mui/icons-material';
import {createTheme} from "@mui/material/styles";
import {useState} from "react";
import axios from "../../utils/axiosInstance";

export default function Index({
                               postId, username, url, caption, likes, comments,
                               timestamp
                             }) {
  const [commentsArr, setCommentsArr] = useState(comments)
  const [comment, setComment] = useState('')
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [unlikeAllowed, setUnlikeAllowed] = useState(likes.some(
    (like) =>
      like._id.toString() === userData.id.toString()
  ));

  const [likesArr, setLikesArr] = useState(likes)

  const configData = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }

  const postComment = async (evt) => {
    evt.preventDefault()
    const res = await axios.post(`/api/comments/`, {
      postId: postId,
      content: comment,
    }, configData);
    // console.log("res = ", res)

    setCommentsArr(res.data[0].comments)
    setComment('')
  }

  const handleLike = async () => {
    if (unlikeAllowed === true) {
      try {
        const res = await axios.delete('/api/like/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          data: {
            postId: postId,
          },
        });
        setLikesArr(res.data);
        setUnlikeAllowed(false)
      } catch (err) {
        console.log(err.response.data);
      }
    } else {
      try {
        try {
          const res = await axios.post(`/api/like/`, {
              postId: postId,
              userId: userData.id
            },
            configData);
          setLikesArr(res.data);
        } catch (err) {
          console.error(err.message);
        }
        setUnlikeAllowed(true)
      } catch (err) {
        console.log(err.response.data);
      }
    }
  }

  return (
    <Container disableGutters={true} sx={{
      marginTop: '5vh',
      width: '35vw',
      border: '0.1vw solid gray',
      padding: "0 0 0 0",
      borderRadius: "0.5vw",
      display: "inline-block",
      marginBottom: "4vh !important",
      margin: 0
    }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        sx={{padding: "2vh 1vh"}}
      >
        <Avatar sx={{display: "border-box"}}/>
        <Link to={`/profile?username=${username}`} sx={{display: "inline-block"}}> {username} </Link>
        <IconButton aria-label="options">
          <MoreHorizOutlined/>
        </IconButton>
      </Stack>
      <Divider/>
      <ImageListItem sx={{width: '100%'}}>
        <img
          src={url}
          alt={'image'}
          loading="lazy"
        />
      </ImageListItem>
      <Box>
        <IconButton onClick={() => handleLike()}>
          {unlikeAllowed ? <Favorite/> : <FavoriteBorder/>}
        </IconButton>
        <IconButton>
          <Message/>
        </IconButton>
        <IconButton>
          <Send/>
        </IconButton>
        <IconButton sx={{float: 'right'}}>
          <BookmarkBorderOutlined/>
        </IconButton>
      </Box>
      <Stack direction="row" sx={{padding: "0vw 0.5vw"}}>
        <Typography>{likesArr.length > 0 ? likesArr.length + ' likes' :
          '0 likes'}</Typography>
      </Stack>
      <Stack direction="row" sx={{padding: "0.5vh 0.5vw"}}>
        <Typography sx={{fontWeight: 'bold'}}>{username}&nbsp;</Typography>
        <Typography>{caption}</Typography>
      </Stack>
      <Stack direction={"column"}>
        {commentsArr && commentsArr.map((comment) => (
          <Stack key={comment._id} direction="row"
                 sx={{padding: "0.5vh 0.5vw"}}>
            <Typography
              sx={{fontWeight: 'bold'}}>{comment.user.name}&nbsp;</Typography>
            <Typography>{comment.text}</Typography>
          </Stack>
        ))}
      </Stack>
      <Stack direction={"row"} sx={{padding: "1vh 0.5vw"}}>
        <Typography variant="caption">{new Date(
          timestamp).getHours()}&nbsp;{"HOURS AGO"}</Typography>
      </Stack>
      <Divider/>
      <TextField
        type="Text"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{width: "100%"}}
        InputProps={{
          startAdornment: (<InputAdornment position="start">
            <IconButton sx={{margin: 0, padding: 0}}>
              <InsertEmoticonOutlined/>
            </IconButton>
          </InputAdornment>), endAdornment: (<InputAdornment position={"end"}>
            <Button variant={"contained"} disabled={!comment} type={"submit"}
                    onClick={postComment}>{"Post"}</Button>
          </InputAdornment>)
        }}>
      </TextField>
    </Container>
  )
}