import "../App.css";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";

const customIcon = new Icon({
  iconUrl: require("../images/placeholder.png"),
  iconSize: [38, 38] // size of the icon
});

const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};

export default function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    searchLocations();
  }, []);

  const searchLocations = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/get_contacts/");
      const data = await response.json();
      console.log(data);

      if (data.hasOwnProperty("contacts") && Array.isArray(data.contacts)) {
        const newLocations = data.contacts.map((element) => {
          let user = element.username;

          const [latitude, longitude] = element.address
            .split(",")
            .map((coord) => parseFloat(coord.trim()));
          return { latitude, longitude, user };
        });
        setLocations(newLocations);
      } else {
        console.error("Error fetching locations: Invalid data format");
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };