import Web3 from 'web3'; // Import Web3.js library
import React, { useState, useEffect } from 'react';
import { contractAbi, contractAddress, getConnectedAccount } from '../../components/Utils/config.js';
import "../../components/User/createlisting.css"
function CreateListing() {
  const [account, setAccount] = useState(null);
  const [location, setLocation] = useState({
    title: '',
    propertyMedia: '',
    propertyAddress: '',
    county: '',
    state: '',
    zip: '',
    country: '',
    latitude: '',
    longitude: '',
    city: '',
  });
  const [details, setDetails] = useState({
    sizeInFt2: 0,
    lotSizeInFt2: 0,
    rooms: 0,
    bathrooms: 0,
    garages: 0,
    bedrooms: 0,
    yearBuilt: 0,
    basement: false,
    homeownersAssociationFee: 0,
    listedIn: '',
    category: '',
    floors: 0,
    propertyStatus: '',
  });
  const [amenities, setAmenities] = useState({
    equippedKitchen: false,
    gym: false,
    laundry: false,
    mediaRoom: false,
    backYard: false,
    basketballCourt: false,
    frontYard: false,
    garageAttached: false,
    hotBath: false,
    pool: false,
  });
  const [utilities, setUtilities] = useState({
    centralAir: false,
    electricity: false,
    heating: false,
    naturalGas: false,
    ventilation: false,
    water: false,
  });
  const [otherFeatures, setOtherFeatures] = useState({
    chairAccessible: false,
    elevator: false,
    fireplace: false,
    smokeDetectors: false,
    washerAndDryer: false,
    wifi: false,
  });
  const [royaltyRate, setRoyaltyRate] = useState(0);
  const [legalJurisdiction, setLegalJurisdiction] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

   // Effect to get the connected account when the component mounts
   useEffect(() => {
    const fetchAccount = async () => {
      try {
        const connectedAccount = await getConnectedAccount();
        setAccount(connectedAccount);
      } catch (error) {
        console.error('Error getting connected account:', error);
      }
    };

    fetchAccount();
  }, []);

  const handleLocationChange = (event) => {
    setLocation({
      ...location,
      [event.target.name]: event.target.value,
    });
  };

  const handleDetailsChange = (event) => {
    setDetails({
      ...details,
      [event.target.name]:
        event.target.type === 'number'
          ? parseFloat(event.target.value)
          : event.target.value,
    });
  };

  const handleAmenitiesChange = (event) => {
    setAmenities({
      ...amenities,
      [event.target.name]: event.target.checked,
    });
  };

  const handleUtilitiesChange = (event) => {
    setUtilities({
      ...utilities,
      [event.target.name]: event.target.checked,
    });
  };

  const handleOtherFeaturesChange = (event) => {
    setOtherFeatures({
      ...otherFeatures,
      [event.target.name]: event.target.checked,
    });
  };

  const handleRoyaltyRateChange = (event) => {
    setRoyaltyRate(parseFloat(event.target.value));
  };

  const handleLegalJurisdictionChange = (event) => {
    setLegalJurisdiction(event.target.value);
  };

  const createListing = async () => {
    setLoading(true);

    try {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(contractAbi, contractAddress);

      
      // Convert boolean values to solidity boolean (true => 1, false => 0)
      const amenitiesArray = Object.values(amenities).map((value) =>
        value ? 1 : 0
      );

      const utilitiesArray = Object.values(utilities).map((value) =>
        value ? 1 : 0
      );

      const otherFeaturesArray = Object.values(otherFeatures).map((value) =>
        value ? 1 : 0
      );

      // Prepare the structured objects for the contract function
      const locationData = Object.values(location);
      const detailsData = Object.values(details);

      // Call the createListing function on your smart contract
      await contract.methods
      .createListing(
        {
          title: location.title,
          propertyMedia: location.propertyMedia,
          propertyAddress: location.propertyAddress,
          county: location.county,
          state: location.state,
          zip: location.zip,
          country: location.country,
          latitude: location.latitude,
          longitude: location.longitude,
          city: location.city,
        },
        {
          sizeInFt2: details.sizeInFt2,
          lotSizeInFt2: details.lotSizeInFt2,
          rooms: details.rooms,
          bathrooms: details.bathrooms,
          garages: details.garages,
          bedrooms: details.bedrooms,
          yearBuilt: details.yearBuilt,
          basement: details.basement,
          homeownersAssociationFee: details.homeownersAssociationFee,
          listedIn: details.listedIn,
          category: details.category,
          floors: details.floors,
          propertyStatus: details.propertyStatus,
        },
        {
          equippedKitchen: amenities.equippedKitchen,
          gym: amenities.gym,
          laundry: amenities.laundry,
          mediaRoom: amenities.mediaRoom,
          backYard: amenities.backYard,
          basketballCourt: amenities.basketballCourt,
          frontYard: amenities.frontYard,
          garageAttached: amenities.garageAttached,
          hotBath: amenities.hotBath,
          pool: amenities.pool,
        },
        {
          centralAir: utilities.centralAir,
          electricity: utilities.electricity,
          heating: utilities.heating,
          naturalGas: utilities.naturalGas,
          ventilation: utilities.ventilation,
          water: utilities.water,
        },
        {
          chairAccessible: otherFeatures.chairAccessible,
          elevator: otherFeatures.elevator,
          fireplace: otherFeatures.fireplace,
          smokeDetectors: otherFeatures.smokeDetectors,
          washerAndDryer: otherFeatures.washerAndDryer,
          wifi: otherFeatures.wifi,
        },
        royaltyRate,
        legalJurisdiction
      )
      .send({ from: account });
      
      // Reset form fields and errors
      setLocation({
        title: '',
        propertyMedia: '',
        propertyAddress: '',
        county: '',
        state: '',
        zip: '',
        country: '',
        latitude: '',
        longitude: '',
        city: '',
      });
      setDetails({
        sizeInFt2: 0,
        lotSizeInFt2: 0,
        rooms: 0,
        bathrooms: 0,
        garages: 0,
        yearBuilt: 0,
        basement: false,
        homeownersAssociationFee: 0,
        listedIn: '',
        category: '',
        floors: 0,
        propertyStatus: '',
      });
      setAmenities({
        equippedKitchen: false,
        gym: false,
        laundry: false,
        mediaRoom: false,
        backYard: false,
        basketballCourt: false,
        frontYard: false,
        garageAttached: false,
        hotBath: false,
        pool: false,
      });
      setUtilities({
        centralAir: false,
        electricity: false,
        heating: false,
        naturalGas: false,
        ventilation: false,
        water: false,
      });
      setOtherFeatures({
        chairAccessible: false,
        elevator: false,
        fireplace: false,
        smokeDetectors: false,
        washerAndDryer: false,
        wifi: false,
      });
      setRoyaltyRate(0);
      setLegalJurisdiction('');

      setErrorMessage('');

      // Emit an event or display a success message to the user
      console.log('Property listed for sale successfully');
    } catch (error) {
      console.error('Error listing property for sale:', error);
      setErrorMessage('Error listing property for sale');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Listing for Sale</h2>
      <div className="location-form">
  <input
    className="location-input"
    type="text"
    name="title"
    placeholder="Title"
    value={location.title}
    onChange={handleLocationChange}
  />
  <input
    className="location-input"
    type="text"
    name="propertyMedia"
    placeholder="Property Media"
    value={location.propertyMedia}
    onChange={handleLocationChange}
  />
  <input
    className="location-input"
    type="text"
    name="propertyAddress"
    placeholder="Property Address"
    value={location.propertyAddress}
    onChange={handleLocationChange}
  />
  <input
    className="location-input"
    type="text"
    name="county"
    placeholder="County"
    value={location.county}
    onChange={handleLocationChange}
  />
  <input
    className="location-input"
    type="text"
    name="state"
    placeholder="State"
    value={location.state}
    onChange={handleLocationChange}
  />
  <input
    className="location-input"
    type="text"
    name="zip"
    placeholder="Zip"
    value={location.zip}
    onChange={handleLocationChange}
  />
  <input
    className="location-input"
    type="text"
    name="country"
    placeholder="Country"
    value={location.country}
    onChange={handleLocationChange}
  />
  <input
    className="location-input"
    type="text"
    name="latitude"
    placeholder="Latitude"
    value={location.latitude}
    onChange={handleLocationChange}
  />
  <input
    className="location-input"
    type="text"
    name="longitude"
    placeholder="Longitude"
    value={location.longitude}
    onChange={handleLocationChange}
  />
  <input
    className="location-input"
    type="text"
    name="city"
    placeholder="City"
    value={location.city}
    onChange={handleLocationChange}
  />


        
        {/* Details Inputs */}
        <div className="details-form">
        <h2>Property Details</h2>
  <label className="details-label">
    Size (in sq. ft.):
    <input
      className="details-input"
      type="number"
      name="sizeInFt2"
      placeholder="Size"
      value={details.sizeInFt2}
      onChange={handleDetailsChange}
    />
  </label>
  <label className="details-label">
    Lot Size (in sq. ft.):
    <input
      className="details-input"
      type="number"
      name="lotSizeInFt2"
      placeholder="Lot Size"
      value={details.lotSizeInFt2}
      onChange={handleDetailsChange}
    />
  </label>
  <label className="details-label">
    Number of Rooms:
    <input
      className="details-input"
      type="number"
      name="rooms"
      placeholder="Number of Rooms"
      value={details.rooms}
      onChange={handleDetailsChange}
    />
  </label>
  <label className="details-label">
    Number of Bathrooms:
    <input
      className="details-input"
      type="number"
      name="bathrooms"
      placeholder="Number of Bathrooms"
      value={details.bathrooms}
      onChange={handleDetailsChange}
    />
  </label>
  <label className="details-label">
    Number of Garages:
    <input
      className="details-input"
      type="number"
      name="garages"
      placeholder="Number of Garages"
      value={details.garages}
      onChange={handleDetailsChange}
    />
  </label>
  <label className="details-label">
    Number of Bedrooms:
    <input
      className="details-input"
      type="number"
      name="bedrooms"
      placeholder="Number of Bedrooms"
      value={details.bedrooms}
      onChange={handleDetailsChange}
    />
  </label>
  <label className="details-label">
    Year Built:
    <input
      className="details-input"
      type="number"
      name="yearBuilt"
      placeholder="Year Built"
      value={details.yearBuilt}
      onChange={handleDetailsChange}
    />
  </label>
  <label className="details-label">
    Basement:
    <input
      className="details-checkbox"
      type="checkbox"
      name="basement"
      checked={details.basement}
      onChange={handleDetailsChange}
    />
  </label>
  <label className="details-label">
    Homeowners Association Fee:
    <input
      className="details-input"
      type="number"
      name="homeownersAssociationFee"
      placeholder="HOA Fee"
      value={details.homeownersAssociationFee}
      onChange={handleDetailsChange}
    />
  </label>
  <label className="details-label">
    Listed In:
    <input
      className="details-input"
      type="text"
      name="listedIn"
      placeholder="Listed In"
      value={details.listedIn}
      onChange={handleDetailsChange}
    />
  </label>
  <label className="details-label">
    Category:
    <input
      className="details-input"
      type="text"
      name="category"
      placeholder="Category"
      value={details.category}
      onChange={handleDetailsChange}
    />
  </label>
  <label className="details-label">
    Number of Floors:
    <input
      className="details-input"
      type="number"
      name="floors"
      placeholder="Number of Floors"
      value={details.floors}
      onChange={handleDetailsChange}
    />
  </label>
  <label className="details-label">
    Property Status:
    <input
      className="details-input"
      type="text"
      name="propertyStatus"
      placeholder="Property Status"
      value={details.propertyStatus}
      onChange={handleDetailsChange}
    />
  </label>
</div>

        
        {/* Add other details fields as needed */}
        
        <div className="amenities-form">
      <h2>Amenities</h2>
      <div className="amenities-checkboxes">
        <label className="amenity-checkbox">
          <input
            type="checkbox"
            name="equippedKitchen"
            checked={amenities.equippedKitchen}
            onChange={handleAmenitiesChange}
          />
          Equipped Kitchen
        </label>
        <label className="amenity-checkbox">
          <input
            type="checkbox"
            name="gym"
            checked={amenities.gym}
            onChange={handleAmenitiesChange}
          />
          Gym
        </label>
        <label className="amenity-checkbox">
          <input
            type="checkbox"
            name="laundry"
            checked={amenities.laundry}
            onChange={handleAmenitiesChange}
          />
          Laundry
        </label>
        <label className="amenity-checkbox">
          <input
            type="checkbox"
            name="mediaRoom"
            checked={amenities.mediaRoom}
            onChange={handleAmenitiesChange}
          />
          Media Room
        </label>
        <label className="amenity-checkbox">
          <input
            type="checkbox"
            name="backYard"
            checked={amenities.backYard}
            onChange={handleAmenitiesChange}
          />
          Backyard
        </label>
        <label className="amenity-checkbox">
          <input
            type="checkbox"
            name="basketballCourt"
            checked={amenities.basketballCourt}
            onChange={handleAmenitiesChange}
          />
          Basketball Court
        </label>
        <label className="amenity-checkbox">
          <input
            type="checkbox"
            name="frontYard"
            checked={amenities.frontYard}
            onChange={handleAmenitiesChange}
          />
          Frontyard
        </label>
        <label className="amenity-checkbox">
          <input
            type="checkbox"
            name="garageAttached"
            checked={amenities.garageAttached}
            onChange={handleAmenitiesChange}
          />
          Garage Attached
        </label>
        <label className="amenity-checkbox">
          <input
            type="checkbox"
            name="hotBath"
            checked={amenities.hotBath}
            onChange={handleAmenitiesChange}
          />
          Hot Bath
        </label>
        <label className="amenity-checkbox">
          <input
            type="checkbox"
            name="pool"
            checked={amenities.pool}
            onChange={handleAmenitiesChange}
          />
          Pool
        </label>
      </div>
    </div>
        
        {/* Utilities Inputs */}
        <div className="utilities-form">
      <h2>Utilities</h2>
      <div className="utilities-checkboxes">
        <label className="utility-checkbox">
          <input
            type="checkbox"
            name="centralAir"
            checked={utilities.centralAir}
            onChange={handleUtilitiesChange}
          />
          Central Air
        </label>
        <label className="utility-checkbox">
          <input
            type="checkbox"
            name="electricity"
            checked={utilities.electricity}
            onChange={handleUtilitiesChange}
          />
          Electricity
        </label>
        <label className="utility-checkbox">
          <input
            type="checkbox"
            name="heating"
            checked={utilities.heating}
            onChange={handleUtilitiesChange}
          />
          Heating
        </label>
        <label className="utility-checkbox">
          <input
            type="checkbox"
            name="naturalGas"
            checked={utilities.naturalGas}
            onChange={handleUtilitiesChange}
          />
          Natural Gas
        </label>
        <label className="utility-checkbox">
          <input
            type="checkbox"
            name="ventilation"
            checked={utilities.ventilation}
            onChange={handleUtilitiesChange}
          />
          Ventilation
        </label>
        <label className="utility-checkbox">
          <input
            type="checkbox"
            name="water"
            checked={utilities.water}
            onChange={handleUtilitiesChange}
          />
          Water
        </label>
      </div>
    </div>
        
        {/* Other Features Inputs */}
        
    <div className="other-features-form">
      <h2>Other Features</h2>
      <div className="other-features-checkboxes">
        <label className="other-feature-checkbox">
          <input
            type="checkbox"
            name="chairAccessible"
            checked={otherFeatures.chairAccessible}
            onChange={handleOtherFeaturesChange}
          />
          Chair Accessible
        </label>
        <label className="other-feature-checkbox">
          <input
            type="checkbox"
            name="elevator"
            checked={otherFeatures.elevator}
            onChange={handleOtherFeaturesChange}
          />
          Elevator
        </label>
        <label className="other-feature-checkbox">
          <input
            type="checkbox"
            name="fireplace"
            checked={otherFeatures.fireplace}
            onChange={handleOtherFeaturesChange}
          />
          Fireplace
        </label>
        <label className="other-feature-checkbox">
          <input
            type="checkbox"
            name="smokeDetectors"
            checked={otherFeatures.smokeDetectors}
            onChange={handleOtherFeaturesChange}
          />
          Smoke Detectors
        </label>
        <label className="other-feature-checkbox">
          <input
            type="checkbox"
            name="washerAndDryer"
            checked={otherFeatures.washerAndDryer}
            onChange={handleOtherFeaturesChange}
          />
          Washer and Dryer
        </label>
        <label className="other-feature-checkbox">
          <input
            type="checkbox"
            name="wifi"
            checked={otherFeatures.wifi}
            onChange={handleOtherFeaturesChange}
          />
          Wi-Fi
        </label>
      </div>
    </div>
        
        {/* Royalty Rate Input */}
        <div classname="royalty">
          Royalty rate:
        <input
          type="number"
          placeholder="Royalty Rate"
          value={royaltyRate}
          onChange={handleRoyaltyRateChange}
        />
        </div>
        
        {/* Legal Jurisdiction Input */}
        <input
          type="text"
          placeholder="Legal Jurisdiction"
          value={legalJurisdiction}
          onChange={handleLegalJurisdictionChange}
        />
      </div>
      <button onClick={createListing} disabled={loading}>
        {loading ? 'Creating Listing...' : 'Create Listing'}
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
  
}

export default CreateListing;
