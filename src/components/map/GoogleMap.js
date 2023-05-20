import React, { useEffect, useRef } from 'react';
import useScript from './useScript';
import './GoogleMap.css';

const GoogleMap = ({ googleApiKey, center, zoom }) => {
  const mapRef = useRef(null);
  const isScriptLoaded = useScript(`https://maps.googleapis.com/maps/api/js?key=${googleApiKey}`);

  useEffect(() => {
    if (!mapRef.current || !isScriptLoaded) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
    });

    // Add your markers for houses for rent here

    return () => {
      // Clean up the map when the component is unmounted
      if (map) {
        window.google.maps.event.clearInstanceListeners(map);
      }
    };
  }, [center, zoom, isScriptLoaded]);

  return <div ref={mapRef} className="google-map"></div>;
};

export default GoogleMap;
