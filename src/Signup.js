import logo from './logo.svg';
import './App.css';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Alert from '@mui/material/Alert'
import * as React from "react";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from "yup"
import {IconButton, InputAdornment, Snackbar} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import { ReactComponent as InstagramLogo } from './instagram-logo.svg';
import axios from "axios"
import {useNavigate} from "react-router-dom"

const theme = createTheme();

function App() {
  const [error, setError] = useState("")
  const [showAlert, setShowAlert] = React.useState(false)
  const [values, setValues] = React.useState({
    amount: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .required("Please enter an email")
      .email("Enter a valid email"),
    fullName: yup
      .string("Enter your full name")
      .required("Please enter full name"),
    // username: yup
    //   .string("Enter your username")
    //   .required("Please enter a username"),
    password: yup
      .string("Enter your password")
      .required("Please enter a password")
      .min(6, 'Password is too short - should be minimum 6 chars')
      .max(50, 'Password is too long'),
  }).required();

  const {register, handleSubmit, getValues, formState: {errors}} = useForm({resolver: yupResolver(validationSchema)});
  const email = register('email')
  const fullName = register('fullName')
  const username = register('username')
  const password = register('password')
  const navigate = useNavigate()

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowAlert(false);
  };

  const onError = (errors, e) => console.log(errors, e);

  const handleSignup = async (e) => {
    try {
      e.preventDefault()
      setError("")
      console.log("Signup called")
      await axios.post("http://localhost:3001/api/auth/signup", {name: getValues("fullName"), email: getValues("email"), password: getValues("password")})
      setShowAlert(true);//if user is sign up successfully set showalert to true.
      navigate("/login")
      // const Email = getValues('email')
      // const Password = getValues('password')
      // const object = {
      //   First_Name, Last_Name, Email, Password
      // };
      // await axios.post('/api/signup', object);
      // const timer = setTimeout(() => router.push("/"), 500);
      // return () => clearTimeout(timer);
    } catch (err) {
      setError("Failed to login: " + err.message)
      setShowAlert(false);
    }
  };

  // const Alert = React.forwardRef(function Alert(props, ref) {
  //   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  // });

  useEffect(() => {
    // Prefetch the login page
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid rgb(219, 219, 219)",
            padding: "4vh 2vw",
          }}
        >
          <InstagramLogo width={"12vw"} height={"10vh"} />
          <Typography component="h2" variant="h5">
            Sign up to see photos and videos from your friends.
            mobile num or email field
          </Typography>
          <form noValidate
                style={{marginTop: 3}}>
            {/*{error && < Alert severity="error" sx={{mb: 3}}>{error}</Alert>}*/}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Mobile Number or Email"
                  name="email"
                  autoComplete="email"
                  inputRef={email.ref}
                  error={errors.email}
                  onBlur={email.onBlur}
                  helperText={errors.email?.message}
                  onChange={email.onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="fullName"
                  label="Full Name"
                  autoComplete="fullName"
                  id="fullName"
                  inputRef={fullName.ref}
                  error={errors.fullName}
                  onBlur={fullName.onBlur}
                  helperText={errors.fullName?.message}
                  onChange={fullName.onChange}
                  variant="outlined"
                />
              </Grid>
              {/*<Grid item xs={12}>*/}
              {/*  <TextField*/}
              {/*    required*/}
              {/*    fullWidth*/}
              {/*    name="username"*/}
              {/*    label="Username"*/}
              {/*    autoComplete="username"*/}
              {/*    id="username"*/}
              {/*    inputRef={username.ref}*/}
              {/*    error={errors.username}*/}
              {/*    onBlur={username.onBlur}*/}
              {/*    helperText={errors.username?.message}*/}
              {/*    onChange={username.onChange}*/}
              {/*    variant="outlined"*/}
              {/*  />*/}
              {/*</Grid>*/}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  autoComplete="new-password"
                  id="standard-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  inputRef={password.ref}
                  error={errors.password}
                  onBlur={password.onBlur}
                  helperText={errors.password?.message}
                  onChange={password.onChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? <VisibilityOff/> :
                            <Visibility/>}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  People who use our service may have uploaded your contact information to Instagram. Learn More
                  By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .
                </Typography>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" onClick={handleSignup}
                    sx={{mt: 3, mb: 2}}>
              Sign up
            </Button>
            <Snackbar open={showAlert} autoHideDuration={6000}
                      onClose={handleClose}>
              <Alert onClose={handleClose} severity="success"
                     sx={{width: '100%'}}>
                Account created successfully
              </Alert>
            </Snackbar>
          </form>
        </Box>
        <Box sx={{
          marginTop: "2vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid rgb(219, 219, 219)",
          padding: "2vh 2vw"
        }}>
          {/*<Grid container spacing={2}>*/}
          {/*  <Grid item xs={12}>*/}
          <Typography>Have an account?&nbsp;</Typography>
          <Link sx={{textDecoration: "none"}} variant="body2" href="/login">
            {"Login"}
          </Link>
          {/*</Grid>*/}
          {/*</Grid>*/}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
