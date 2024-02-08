import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Home from './components/home/Home';
import SignInSide from './components/home/SignInSide';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // UseEffect to check login status
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');

    // If the access token is available, set isLoggedIn to true
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div style={{ margin: '1vh' }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/signin"
            element={<SignInSide setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
