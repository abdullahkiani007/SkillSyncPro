import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import admin from "../../../API/admin";
import Controller from "../../../API/index";

const JobPostingsByLocationMapChart = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await admin.fetchJobsByLocation();
      const data = response.data.locations;

      console.log("Job Postings by Location data:", data);
      // Fetch coordinates for each city
      const enrichedData = await Promise.all(
        data.map(async (entry) => {
          const { lat, lng } = await Controller.getCoordinates(entry._id);
          return { city: entry._id, count: entry.count, lat, lng };
        })
      );

      setLocations(enrichedData);
      console.log("Enriched data ", enrichedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching job postings by location data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="map-container h-[400px] w-full max-w-full">
      <MapContainer center={[20, 0]} zoom={2} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.lat, location.lng]}
            radius={Math.sqrt(location.count) * 2}
            fillColor="blue"
            color="blue"
            fillOpacity={0.5}
          >
            <Popup>
              {location._id}: {location.count} job postings
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default JobPostingsByLocationMapChart;
