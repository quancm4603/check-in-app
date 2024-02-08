import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Phone from "./Phone";
import Info from "./Info";
import Services from "./Services"; // Import the Services component
import Summary from "./Summary";

const Home = () => {
  const navigate = useNavigate(); // Get navigate function from react-router-dom
  const [step, setStep] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set initial state based on login status
  const [isPhoneFilled, setIsPhoneFilled] = useState(false);
  const [phone, setPhone] = useState("");
  const [infoData, setInfoData] = useState({
    name: "",
    email: "",
    birthday: "",
  });
  const [selectedServices, setSelectedServices] = useState([]);
  const [showServices, setShowServices] = useState(false);
  const defaultTheme = createTheme();

  // UseEffect to check login status
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    // If the access token is not available, redirect to the login page
    if (!accessToken) {
      console.log("User is not logged in");
      navigate("/signin"); // Adjust the route path based on your setup
      setIsLoggedIn(false); // Set isLoggedIn state to false
    }
  }, [navigate]);

  const handleNext = () => {
    if (step === 1) {
      if (isPhoneFilled) {
        setStep(2);
      } else {
        console.log("Phone number is not filled");
      }
    } else if (step === 2) {
      setStep(3);
      setShowServices(true);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const handleBack = () => {
    if (step === 1) {
      // Handle logic for going back from the first step
    } else if (step === 2) {
      setStep(1);
      setShowServices(false);
    } else if (step === 3) {
      setStep(2);
      setShowServices(false);
    } else if (step === 4) {
      setStep(3);
    }
  };

  const handleCancel = () => {
    console.log("Cancel button clicked");
  };

  const handlePhoneChange = (phone) => {
    setPhone(phone);
    setIsPhoneFilled(phone.length >= 11);
  };

  const handleInfoChange = (info) => {
    setInfoData(info);
  };

  const handleServiceSelect = (selected) => {
    setSelectedServices(selected);
  };

  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_expiration");
    setIsLoggedIn(false);
    navigate("/signin");
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
              height: "70vh",
            }}
          >
            {isLoggedIn ? (
              <>
                {step === 1 && (
                  <Phone
                    onNext={handleNext}
                    onBack={handleBack}
                    onCancel={handleCancel}
                    onPhoneChange={handlePhoneChange}
                  />
                )}
                {step === 2 && <Info onInfoChange={handleInfoChange} />}
                {step === 3 && showServices && (
                  <Services onSelect={handleServiceSelect} />
                )}
                {step === 4 && (
                  <Summary
                    userData={{ ...infoData, phone }}
                    selectedServices={selectedServices}
                  />
                )}
              </>
            ) : (
              <p>Loading...</p> // You can render a loading indicator or message
            )}
          </Box>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              height: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleSignOut} // Add this line for the Sign Out button
              >
                Sign Out
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button variant="outlined" color="primary" onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={step === 1 ? !isPhoneFilled : false}
              >
                {step === 4 ? "Submit" : "Next"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Home;
