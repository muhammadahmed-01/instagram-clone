import React, {useRef, useState} from 'react';
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Avatar,
  Stack,
  Typography,
  Link
} from '@mui/material';
import axiosInstance from "../../utils/axiosInstance"
import {useEffect} from "react";
import {useNavigate} from "react-router-dom"
import Layout from "../../components/layout"

const genders = [
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'custom',
    label: 'Custom',
  },
  {
    value: 'pnts',
    label: 'Prefer not to say',
  },
];

const ProfileForm = () => {
  const [formValues, setFormValues] = useState({
    fullName: '',
    username: 'abc',
    website: '',
    bio: '',
    email: '',
    phoneNumber: '',
    gender: 'pnts'
  });
  const filepickerRef = useRef(null);
  const navigate = useNavigate()

  const [postImage, setPostImage] = useState('');
  const [uploadedPostImage, setUploadedPostImage] = useState(null);

  const [formModified, setFormModified] = useState(false);
  const [formSuccess, setFormSuccess] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setFormModified(true)
  };

  const uploadPostImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      setUploadedPostImage(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
      setFormSuccess(false)
    }
    reader.onload = (readerEvent) => {
      setPostImage(readerEvent.target.result);
      setFormModified(true)
    };
  };

  const createFormData = () => {
    const formData = new FormData();
    formData.append('name', formValues.fullName);
    formData.append('website', formValues.website);
    formData.append('bio', formValues.bio);
    formData.append('email', formValues.email);
    formData.append('phoneNumber', formValues.phoneNumber);
    formData.append('gender', formValues.gender);
    formData.append('profile_pic', uploadedPostImage);
    return formData;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!uploadedPostImage) {
      alert('please upload your post image or video');
      return false;
    }
    const formData = createFormData()
    console.log("upload post image = ", uploadedPostImage)
    axiosInstance.post("/profile/uploadProfilePic", formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    }).then(response => {
      // console.log(response.data)
      setFormSuccess(true)
      window.location.reload()
    }).catch(error => {
      console.error(error)
    })
  };

  useEffect(() => {
    (async () => {
      axiosInstance.get('/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          const data = response.data;
          // console.log(JSON.stringify(data))
          setFormValues({
            ...formValues,
            fullName: data.name,
            website: data.website,
            gender: data.gender,
            bio: data.bio,
            phoneNumber: data.phoneNumber,
            email: data.email,
          });
          setPostImage(data.profilePic)
        })
        .catch(error => {
          console.error(error);
        });
    })()
  }, [])

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{
          flexDirection: "column",
          marginTop: "5vh",
          width: "50vw",
          marginLeft: "5vw",
        }}>
          <Grid item xs={12} md={9}>
            {postImage && <div className="create-post__image" onClick={() => filepickerRef.current.click()}>
              <div>
                {
                  formSuccess ? (
                    <Avatar
                      alt="Remy Sharp"
                      src={`http://localhost:3001/uploads/${postImage}`}
                      sx={{
                        width: "100px",
                        height: "100px", float: "left"
                      }}
                    />
                  ) : (
                    <Avatar
                      alt="Remy Sharp"
                      src={postImage}
                      sx={{
                        width: "100px",
                        height: "100px", float: "left"
                      }}
                    />
                  )
                }
              </div>
            </div>
            }
            {!postImage && <div onClick={() => filepickerRef.current.click()} className="create-post__image-picker">
              <p>Upload photos and videos here</p>
            </div>}
            <input
              style={{ display: 'none' }}
              onChange={uploadPostImage}
              ref={filepickerRef}
              type="file"
              hidden
            />
            <Stack sx={{marginLeft: "20%", height: "10vh"}}>
              <Stack direction="row">
                <Typography variant={"h5"} sx={{marginTop: "4vh", marginLeft: "1vw"}}>
                  {formValues.username}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              name="fullName"
              value={formValues.fullName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              label="Website"
              name={"website"}
              variant="outlined"
              value={formValues.website}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              label="Bio"
              name={"bio"}
              variant="outlined"
              value={formValues.bio}
              multiline
              rows={2}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              label="Email"
              name={"email"}
              variant="outlined"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              name={"phoneNumber"}
              value={formValues.phoneNumber}
              onChange={handleInputChange}
              inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              id="outlined-select-gender"
              select
              name={"gender"}
              label="Gender"
              defaultValue="male"
              helperText="Please select your gender"
              value={formValues.gender}
              onChange={handleInputChange}
            >
              {genders.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit"
                    disabled={!formModified}>
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
};

export default ProfileForm;
