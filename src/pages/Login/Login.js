import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Alert from '@mui/material/Alert'
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from "yup"
import {IconButton, InputAdornment, Snackbar} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {ReactComponent as InstagramLogo} from '../../instagram-logo.svg';
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import {UserContext} from "../../utils/UserContext";

const theme = createTheme();

function Login() {
  const [error, setError] = useState("")
  const [showAlert, setShowAlert] = React.useState(false)
  const [values, setValues] = React.useState({
    amount: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const [user, setUser] = useContext(UserContext);

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .required("Please enter an email")
      .email("Enter a valid email"),
    password: yup
      .string("Enter your password")
      .required("Please enter a password")
      .min(6, 'Password is too short - should be minimum 6 chars')
      .max(50, 'Password is too long'),
  }).required();

  const {register, handleSubmit, getValues, formState: {errors}} = useForm(
    {resolver: yupResolver(validationSchema)});
  const email = register('email')
  const password = register('password')
  const navigate = useNavigate();

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

  const handleSignIn = async () => {
    try {
      setError("")
      axios.post("/api/auth/login",
        {email: getValues("email"), password: getValues("password")})
        .then(response => {
          setShowAlert(true);//if user has logged in successfully set showalert to true.
          console.log("response = ", response.data)
          // Store the token in localStorage
          localStorage.setItem('token', response.data.token);
          const userData = response.data.userData
          localStorage.setItem("userData", JSON.stringify(userData));
          console.log("userData = ", user)
          navigate("/");
        })
        .catch(error => {
          console.error(error);
        });
    } catch (err) {
      setError("Failed to login: " + err.message)
      setShowAlert(false);
    }
  };

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
          <InstagramLogo width={"12vw"} height={"10vh"}/>
          <form onSubmit={handleSubmit(handleSignIn, onError)} noValidate
                style={{marginTop: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
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
            </Grid>
            <Button type="submit" fullWidth variant="contained"
                    sx={{mt: 3, mb: 2}}>
              Login
            </Button>
            <Snackbar open={showAlert} autoHideDuration={6000}
                      onClose={handleClose}>
              <Alert onClose={handleClose} severity="success"
                     sx={{width: '100%'}}>
                Logged in successfully
              </Alert>
            </Snackbar>
            <Grid container justifyContent="center">
              <Grid item xs={12}>
                <Link variant="body2" href="/forgot-password">
                  {"Forgot password?"}
                </Link>
              </Grid>
            </Grid>
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
          <Typography>Don't have an account?&nbsp;</Typography>
          <Link sx={{textDecoration: "none"}} variant="body2" href="/src/pages/Signup/Signup">
            {"Sign up"}
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;