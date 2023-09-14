// App.js
import UserContext from './components/Utils/UserContext.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './components/NavBar/firebase.js';
import LandingPage from './components/Landing/LandingPage.js';
import Footer from './components/Footer/Footer';
import './components/NavBar/Custom.css';
import PropertyList from './components/PropertyList/PropertyList';
import PropertyDetails from './components/PropertyDetails/PropertyDetails';
import SignInWithGoogle from './components/NavBar/GoogleSignIn';
import './components/NavBar/dash.css';
import NavigationBar from './components/NavBar/NavigationBar.js';
import Web3OnboardProviderWrapper from './components/Utils/web3.js';

function App() {
  const [user, setUser] = useState(null);
  const theme = createTheme();


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, photoURL } = user;
        setUser({ displayName, email, photoURL });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider theme={theme}>

    <UserContext.Provider value={user}>
      <Web3OnboardProviderWrapper>
        <Router>
        <NavigationBar />

          
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/properties" element={<PropertyList />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/sign-in" element={<SignInWithGoogle />} />
          </Routes>
          <Footer />
        </Router>
      </Web3OnboardProviderWrapper>
    </UserContext.Provider>
    </ThemeProvider>

  );
}

export default App;
