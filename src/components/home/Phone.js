import React, { useState, useEffect } from 'react';
import { Box, Fab, TextField } from '@mui/material';

const Phone = ({ onNext, onCancel, onPhoneChange }) => {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleNumberClick = (number) => {
        if (phoneNumber.length < 12) {
            if (phoneNumber.length === 2) {
                setPhoneNumber(`(${phoneNumber + number})`);
            } else {
                setPhoneNumber(phoneNumber + number);
            }
        }
    };

    const handleClear = () => {
        setPhoneNumber('');
    };

    const handleDelete = () => {
        setPhoneNumber(phoneNumber.slice(0, -1));
    };

    useEffect(() => {
        // Call the onPhoneChange callback with the updated phone number
        onPhoneChange(phoneNumber);
    }, [phoneNumber, onPhoneChange]);

    const isValidPhoneNumber = () => {
        // Implement your phone number validation logic here
        return phoneNumber.length >= 11;
    };

    return (
        <Box>
            <form style={{ marginBottom: '20px' }}>
                <TextField id="outlined-basic" label="Phone Number" variant="outlined" value={phoneNumber} />
            </form>
            <Box sx={{ bgcolor: '#ffff', height: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', marginBottom: '10px' }}>
                {[1, 2, 3].map((number, index) => (
                    <Fab key={index} color="primary" onClick={() => handleNumberClick(number)}>
                        {number}
                    </Fab>
                ))}
            </Box>
            <Box sx={{ bgcolor: '#ffff', height: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', marginBottom: '10px' }}>
                {[4, 5, 6].map((number, index) => (
                    <Fab key={index} color="primary" onClick={() => handleNumberClick(number)}>
                        {number}
                    </Fab>
                ))}
            </Box>
            <Box sx={{ bgcolor: '#ffff', height: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', marginBottom: '10px' }}>
                {[7, 8, 9].map((number, index) => (
                    <Fab key={index} color="primary" onClick={() => handleNumberClick(number)}>
                        {number}
                    </Fab>
                ))}
            </Box>
            <Box sx={{ bgcolor: '#ffff', height: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', marginBottom: '10px' }}>
                <Fab color="secondary" onClick={handleClear}>
                    Clear
                </Fab>
                {[0].map((number, index) => (
                    <Fab key={index} color="primary" onClick={() => handleNumberClick(number)}>
                        {number}
                    </Fab>
                ))}
                <Fab color="error" onClick={handleDelete}>
                    Delete
                </Fab>
            </Box>
        </Box>
    );
};

export default Phone;
