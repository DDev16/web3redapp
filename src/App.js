// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './components/NavBar/firebase.js';
import LandingPage from './components/Landing/LandingPage.js';
import Footer from './components/Footer/Footer';
import './components/NavBar/Custom.css';
import { Web3Provider } from './web3Context';
import PropertyList from './components/PropertyList/PropertyList';
import PropertyDetails from './components/PropertyDetails/PropertyDetails';
import SignInWithGoogle from './components/NavBar/GoogleSignIn';
import './components/NavBar/dash.css';
import UserContext from './components/Utils/UserContext.js';
import NavigationBar from './components/NavBar/NavigationBar.js';


function App() {
  const [user, setUser] = useState(null);

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
    <UserContext.Provider value={user}>
      <Web3Provider>
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
      </Web3Provider>
    </UserContext.Provider>
  );
}

export default App;
