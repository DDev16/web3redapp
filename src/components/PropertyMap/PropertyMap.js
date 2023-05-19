import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import styles from './PropertyMap.module.css';
import { googleApiKey } from '../../config.js';



const PropertyMap = ({ property }) => {
  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: property.latitude,
    lng: property.longitude,
  };

  return (
    <LoadScript googleApiKey={googleApiKey}>
      <div className={styles.mapContainer}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
          <Marker position={center} />
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default PropertyMap;
