// components/MapComponent.tsx
import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

interface MapProps {
  latitude: number;
  longitude: number;
}

const MapComponent: React.FC<MapProps> = ({ latitude, longitude }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GEOLOCATION_API_KEY || "", // Use environment variable
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
  
    <GoogleMap
      center={{ lat: latitude, lng: longitude }}
      zoom={10}
      mapContainerStyle={{ width: "100%", height: "400px" }}
    >
      <Marker position={{ lat: latitude, lng: longitude }} />
    </GoogleMap>
  );
};

export default MapComponent;
