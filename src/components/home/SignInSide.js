import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.facebook.com/minhqnn">
        QuanCM
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // If the user is already logged in, redirect to the home page
  if (isLoggedIn) {
    navigate("/");
    return null; // You can also render a loading spinner or any other content
  }
  function saveTokenToLocalStorage(token) {
    const expirationTime = new Date().getTime() + token.expires_in * 1000;
    localStorage.setItem("access_token", token.access_token);
    localStorage.setItem("token_expiration", expirationTime);
  }

  const isTokenExpired = () => {
    // Check if the access token has expired
    const expirationTime = localStorage.getItem("token_expiration");
    return expirationTime && new Date().getTime() > expirationTime;
  };

  const handleTokenRefresh = async () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_expiration");
    setIsLoggedIn(true);
    navigate("/");
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Get email and password from the form
    const email = data.get("email");
    const password = data.get("password");

    // API endpoint and parameters
    const apiUrl = "https://checkin.trithanhsoft.com/connect/token";
    const apiParams = [
      {
        key: "client_id",
        value: "ro.client",
        description: "",
        type: "text",
        enabled: true,
      },
      {
        key: "client_secret",
        value: "secret",
        description: "",
        type: "text",
        enabled: true,
      },
      {
        key: "username",
        value: email,
        description: "",
        type: "text",
        enabled: true,
      },
      {
        key: "password",
        value: password,
        description: "",
        type: "text",
        enabled: true,
      },
      {
        key: "grant_type",
        value: "password",
        description: "",
        type: "text",
        enabled: true,
      },
      {
        key: "scope",
        value: "api.TTS",
        description: "",
        type: "text",
        enabled: true,
      },
    ];
    // Convert parameters to x-www-form-urlencoded format
    const body = new URLSearchParams();
    apiParams.forEach((param) => {
      body.append(param.key, param.value);
    });

    try {
      // Make the API call
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      // Save the access_token to localStorage
      saveTokenToLocalStorage(result.access_token);
      if (isTokenExpired()) {
        await handleTokenRefresh();
      }

      // alert(result.access_token);
      setIsLoggedIn(true); // Set isLoggedIn to true after successful login
      navigate("/");
      // console.log(result); // Handle the API response as needed
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "98vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid> */}
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
