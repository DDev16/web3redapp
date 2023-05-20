import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavBar/NavigationBar';
import LandingPage from './components/Landing/LandingPage.js';
import ThankYouPage from './components/ThankYouPage';
import Footer from './components/Footer/Footer';
import './Custom.css';
import { Web3Provider } from './web3Context';
import PropertyList from './components/PropertyList/PropertyList';
import PropertyDetails from './components/PropertyDetails/PropertyDetails';
import SignInWithGoogle from './components/NavBar/GoogleSignIn';

function App() {
  return (
    <Web3Provider>
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/thankyou" element={<ThankYouPage />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/sign-in" element={<SignInWithGoogle />} />
      </Routes>
      <Footer />
    </Router>
    </Web3Provider>
  );
}

export default App;
