import React, { useState } from 'react';
import "./value.css";
function HomeValuation() {
  const [address, setAddress] = useState('');
  const [propertyValue, setPropertyValue] = useState(null);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const calculatePropertyValue = () => {
    // Replace this with an actual API call to get the property value based on the address
    // For demonstration purposes, we'll just set a random value.
    const randomValue = Math.floor(Math.random() * 1000000);
    setPropertyValue(randomValue);
  };

  return (
    <div className="home-valuation-container">
      <div className="home-valuation-divider-top"></div> {/* Divider above the container */}
      <h1>Whats The Value Of Your Home?</h1>
      <div>
        <label htmlFor="address">Enter your property address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={handleAddressChange}
          placeholder="E.g., 123 Main St, City, State"
        />
      </div>
      <div>
        <button onClick={calculatePropertyValue}>Calculate Property Value</button>
      </div>
      {propertyValue !== null && (
        <div>
          <p>Your estimated property value is: ${propertyValue}</p>
        </div>
      )}
      <div className="home-valuation-divider-bottom"></div> {/* Divider below the container */}
    </div>
  );
}

export default HomeValuation;