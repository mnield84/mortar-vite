import React, { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import greenIconUrl from "../assets/green.png";
import redIconUrl from "../assets/red.png";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useQuery } from "react-query";

interface ICoordinate {
  latitude: number;
  longitude: number;
}

interface ApiResponse {
  Coords: {
    [key: string]: ICoordinate[];
  };
}

interface IGeocodingInfo {
  [key: string]: string;
}

const defaultZoom = 2;
const defaultCenter: L.LatLngExpression = [20, 0];

const ChangeView = ({
  center,
  zoom,
}: {
  center: L.LatLngExpression;
  zoom: number;
}) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const Map: React.FC = () => {
  const [mapCenter, setMapCenter] = useState<L.LatLngExpression>(defaultCenter);
  const [zoomLevel, setZoomLevel] = useState<number>(defaultZoom);
  const [geocodingInfo, setGeocodingInfo] = useState<IGeocodingInfo>({});

  const fetchCoordinates = async (): Promise<ApiResponse> => {
    const response = await fetch(
      "https://staging-mortar-tech-test-2im2.encr.app/coordinates",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.json();
  };

  const {
    data: apiResponse,
    isLoading,
    error,
  } = useQuery("coordinates", fetchCoordinates);

  useEffect(() => {
    if (apiResponse && apiResponse.Coords) {
      const coords = Object.values(apiResponse.Coords).flat();
      coords.forEach(async (coord) => {
        const address = await fetchGeoInfo(coord.latitude, coord.longitude);
        setGeocodingInfo((prev) => ({
          ...prev,
          [`${coord.latitude},${coord.longitude}`]: address,
        }));
      });
    }
  }, [apiResponse]);

  const handleContinentClick = useCallback(
    (continent: string) => {
      const continentCoords = apiResponse?.Coords[continent];
      if (continentCoords) {
        const latitudes = continentCoords.map((coord) => coord.latitude);
        const longitudes = continentCoords.map((coord) => coord.longitude);
        const centerLat = (Math.max(...latitudes) + Math.min(...latitudes)) / 2;
        const centerLng =
          (Math.max(...longitudes) + Math.min(...longitudes)) / 2;
        setMapCenter([centerLat, centerLng]);
        setZoomLevel(16); // Adjust zoom level as needed
      }
    },
    [apiResponse]
  );

  const getColorForLatitude = (latitude: number): string => {
    // Define thresholds for latitude
    const equatorProximityThreshold = 10; // Degrees from the equator

    if (Math.abs(latitude) < equatorProximityThreshold) {
      return "green"; // Close to equator
    }
    return "red"; // Far from equator
  };

  if (isLoading) return <p>Loading...</p>;
  if (error || !apiResponse || !apiResponse.Coords)
    return <p>An error has occurred</p>;

  const flatCoordinates = Object.values(apiResponse.Coords).flat();

  return (
    <div>
      <div>
        {Object.keys(apiResponse.Coords).map((continent) => (
          <button
            key={continent}
            onClick={() => handleContinentClick(continent)}
          >
            {continent}
          </button>
        ))}
      </div>
      <MapContainer
        center={mapCenter}
        zoom={zoomLevel}
        style={{ height: "100vh", width: "100%" }}
      >
        <ChangeView center={mapCenter} zoom={zoomLevel} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {flatCoordinates.map((coord: ICoordinate, index: number) => {
          const color = getColorForLatitude(coord.latitude);
          const iconUrl = color === "green" ? greenIconUrl : redIconUrl; // Add other conditions as necessary

          const icon = L.icon({
            iconUrl: iconUrl,
            iconSize: [25, 25],
            iconAnchor: [12, 41],
          });

          return (
            <Marker
              key={index}
              position={[coord.latitude, coord.longitude]}
              icon={icon}
            >
              {geocodingInfo[`${coord.latitude},${coord.longitude}`] && (
                <Popup>
                  {geocodingInfo[`${coord.latitude},${coord.longitude}`]}
                </Popup>
              )}
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;

const fetchGeoInfo = async (latitude: number, longitude: number) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.address
      ? `${data.address.road}, ${data.address.city}`
      : "Not found";
  } catch (error) {
    console.error("Error fetching geolocation data:", error);
    return "Error";
  }
};
