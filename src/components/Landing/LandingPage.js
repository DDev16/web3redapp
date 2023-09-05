import React from 'react';


import Home from '../Home/Index.jsx';
import PropertyList from '../PropertyList/PropertyList';
import HomeValuation from '../valuation/Valuation.js';
import NewListings from '../Newlistings/newlistings.js';


function LandingPage() {





 

  
  return (
   <div>
      <Home />
     <PropertyList />
     <HomeValuation />
     <NewListings />
     </div>
    
  );
}

export default LandingPage;