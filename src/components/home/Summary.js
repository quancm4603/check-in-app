import React from "react";
import { Box, Typography, TextField } from "@mui/material";
import dayjs from "dayjs";

const Summary = ({ userData, selectedServices }) => {
  const formattedBirthday = userData.birthday
    ? dayjs(userData.birthday).format("YYYY-MM-DD")
    : "";

  const boldTextfieldStyle = {
    fontWeight: "bold",
    margin: "8px 0",
  };

  return (
    <Box>
      <Typography variant="h6">Summary:</Typography>
      <TextField
        id="outlined-basic-name"
        label="Name"
        variant="outlined"
        fullWidth
        value={userData.name}
        disabled
        style={boldTextfieldStyle}
      />
      <TextField
        id="outlined-basic-email"
        label="Email"
        variant="outlined"
        fullWidth
        value={userData.email}
        disabled
        style={boldTextfieldStyle}
      />
      <TextField
        id="outlined-basic-birthday"
        label="Birthday"
        variant="outlined"
        fullWidth
        value={formattedBirthday}
        disabled
        style={boldTextfieldStyle}
      />
      <TextField
        id="outlined-basic-phone"
        label="Phone"
        variant="outlined"
        fullWidth
        value={userData.phone}
        disabled
        style={boldTextfieldStyle}
      />
      <Typography>Selected Services: {selectedServices.join(", ")}</Typography>
    </Box>
  );
};

export default Summary;
