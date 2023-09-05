import React, { useState } from 'react';
import '../../components/Newlistings/newlistings.css'; // Import your CSS file for styling
import REimage from "../../components/assets/real-estate-image-1.jpg"

function NewListings() {
  // Define state to hold the list of NFT real estate listings
  const [listings, setListings] = useState([
    {
      price: "$519,990",
      address: "3232 SHEIK DR, LAKE HAVASU CITY, AZ 86404",
      bedrooms: "3 BD",
      bathrooms: "2 BA",
      sqft: "1,503 SQFT",
      agent: "EXP REALTY",
      imageUrl: REimage, // Replace with the actual image URL
    },
    {
        price: "$519,990",
        address: "3232 SHEIK DR, LAKE HAVASU CITY, AZ 86404",
        bedrooms: "3 BD",
        bathrooms: "2 BA",
        sqft: "1,503 SQFT",
        agent: "EXP REALTY",
        imageUrl: REimage, // Replace with the actual image URL
      },
      {
        price: "$519,990",
        address: "3232 SHEIK DR, LAKE HAVASU CITY, AZ 86404",
        bedrooms: "3 BD",
        bathrooms: "2 BA",
        sqft: "1,503 SQFT",
        agent: "EXP REALTY",
        imageUrl: REimage, // Replace with the actual image URL
      },
      {
        price: "$519,990",
        address: "3232 SHEIK DR, LAKE HAVASU CITY, AZ 86404",
        bedrooms: "3 BD",
        bathrooms: "2 BA",
        sqft: "1,503 SQFT",
        agent: "EXP REALTY",
        imageUrl: REimage, // Replace with the actual image URL
      },
      {
        price: "$519,990",
        address: "3232 SHEIK DR, LAKE HAVASU CITY, AZ 86404",
        bedrooms: "3 BD",
        bathrooms: "2 BA",
        sqft: "1,503 SQFT",
        agent: "EXP REALTY",
        imageUrl: REimage, // Replace with the actual image URL
      },
      {
        price: "$519,990",
        address: "3232 SHEIK DR, LAKE HAVASU CITY, AZ 86404",
        bedrooms: "3 BD",
        bathrooms: "2 BA",
        sqft: "1,503 SQFT",
        agent: "EXP REALTY",
        imageUrl: REimage, // Replace with the actual image URL
      },
      {
        price: "$519,990",
        address: "3232 SHEIK DR, LAKE HAVASU CITY, AZ 86404",
        bedrooms: "3 BD",
        bathrooms: "2 BA",
        sqft: "1,503 SQFT",
        agent: "EXP REALTY",
        imageUrl: REimage, // Replace with the actual image URL
      },
    // Add more mock listings as needed
  ]);
  return (
    <div>
      <h1>New NFT Real Estate Listings</h1>

      <div className="listings-grid">
        {/* Display the mock NFT real estate listings as enhanced cards */}
        {listings.map((listing, index) => (
          <div className="listing-card" key={index}>
            <div className="card-header">
              <img src={listing.imageUrl} alt={listing.address} />
              <h2>{listing.address}</h2>
            </div>
            <div className="card-body">
              <p className="price">{listing.price}</p>
              <p className="details">{listing.bedrooms} | {listing.bathrooms} | {listing.sqft}</p>
              <p className="agent">Listed with {listing.agent}</p>
            </div>
            <button className="view-button">View</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewListings;