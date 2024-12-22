"use client";
import axios from "axios";
import { useState, FormEvent } from "react";
import MapComponent from "../components/MapComponent";

interface LocationResponse {
  latitude: string;
  longitude: string;
}

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [locationData, setLocationData] = useState<LocationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = async (): Promise<void> => {
    try {
      const response = await axios.post("/api/location", { phoneNumber });
      if (!response.data) {
        throw new Error(`Error: ${response.status}`);
      }
      setLocationData(response.data);
      setError(null); // Clear previous errors
    } catch (error) {
      console.error("Failed to fetch location:", error);
      setError("Unable to fetch location. Please try again.");
    }
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }
    
    fetchLocation();
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <form className="flex gap-4 items-center" onSubmit={handleSubmit}>
            <label htmlFor="phone" className="sr-only">
              Phone number
            </label>
            <input
              id="phone"
              type="text"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="p-1 w-36 bg-blue-500 text-white rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
        {error && <p className="text-red-500 font-semibold">{error}</p>}
        {locationData ? (
          <MapComponent 
            latitude={Number(locationData.latitude)} 
            longitude={Number(locationData.longitude)} 
          />
        ) : (
          <p>No location loaded</p>
        )}
      </main>
    </div>
  );
}
