import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import Header from "../components/Header";
import "leaflet/dist/leaflet.css";

const MapPage = () => {
  const location = useLocation();
  const countryName = location.state?.country || "World";
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [countryCenter, setCountryCenter] = useState([20, 0]); // Default: world center
  const [zoomLevel, setZoomLevel] = useState(2); // Default zoom for world view

  useEffect(() => {
    const loadCountryGeoJSON = async (country) => {
      try {
        const response = await fetch(
          `/countries/${country.toLowerCase()}.json`
        );
        if (!response.ok) throw new Error("Failed to load GeoJSON");
        const data = await response.json();
        setGeoJsonData(data);

        // Compute country center and zoom level
        const center = getCountryCenter(data);
        setCountryCenter(center);
        setZoomLevel(4); // Adjust the zoom level to focus on the country
      } catch (error) {
        console.error("Error loading GeoJSON:", error);
      }
    };

    if (countryName !== "World") {
      loadCountryGeoJSON(countryName);
    }
  }, [countryName]);

  const getCountryCenter = (geometry) => {
    if (!geometry || !geometry.features || geometry.features.length === 0) {
      console.error("Invalid geometry:", geometry);
      return [20, 0]; // Fallback to world center if geometry is invalid
    }

    // Access the coordinates of the first feature's polygon
    const coordinates = geometry.features[0].geometry.coordinates[0]; // Get the first polygon's coordinates
    return getPolygonCenter(coordinates);
  };

  const getPolygonCenter = (coords) => {
    let latSum = 0;
    let lngSum = 0;

    // Iterate over all coordinates and sum the latitudes and longitudes
    coords.forEach((coord) => {
      latSum += coord[1]; // Latitude is at index 1
      lngSum += coord[0]; // Longitude is at index 0
    });

    // Calculate the average
    const latCenter = latSum / coords.length;
    const lngCenter = lngSum / coords.length;

    return [latCenter, lngCenter];
  };

  // Only render the map once geoJsonData and countryCenter are available
  if (!geoJsonData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        backgroundColor: "#b8bfbf",
        textAlign: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Header />
      <h1>Maleria Predictions for {countryName}</h1>

      <MapContainer
        center={countryCenter}
        zoom={zoomLevel}
        style={{
          height: "500px",
          width: "100%",
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Highlight Country */}
        <GeoJSON
          data={geoJsonData}
          style={{
            color: "red", // Border color
            weight: 2, // Border thickness
            fillColor: "blue", // Fill color
            fillOpacity: 0.4, // Opacity of the fill
          }}
        />
      </MapContainer>
    </div>
  );
};

export default MapPage;
