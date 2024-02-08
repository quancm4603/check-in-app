import React, { useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Info = ({ onInfoChange }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [birthdayError, setBirthdayError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateBirthday = (birthday) => {
    const currentDate = new Date();
    return birthday <= currentDate;
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setEmailError(validateEmail(newEmail) ? "" : "Invalid email format");
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setBirthdayError(validateBirthday(date) ? "" : "Invalid birthday");
  };

  useEffect(() => {
    // Call the onInfoChange callback with the updated information
    onInfoChange({
      name,
      email,
      birthday: selectedDate,
    });
  }, [name, email, selectedDate, onInfoChange]);

  return (
    <Box>
      <form style={{ marginBottom: "20px" }}>
        <TextField
          id="outlined-basic-name"
          label="Your Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={handleNameChange}
        />
      </form>
      <form style={{ marginBottom: "20px" }}>
        <TextField
          id="outlined-basic-email"
          label="E-mail"
          variant="outlined"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          error={!!emailError}
          helperText={emailError}
        />
      </form>
      <form style={{ marginBottom: "20px" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Birthday"
            value={selectedDate}
            onChange={handleDateChange}
            error={!!birthdayError}
            helperText={birthdayError}
          />
        </LocalizationProvider>
      </form>
    </Box>
  );
};

export default Info;
