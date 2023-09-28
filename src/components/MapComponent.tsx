import { MapContainer, useMap } from "react-leaflet";

function MapComponent() {
  const map = useMap();
  console.log("map center:", map.getCenter());
  return null;
}

function MyMapComponent() {
  return (
    <MapContainer center={[50.5, 30.5]} zoom={13}>
      <MapComponent />
    </MapContainer>
  );
}

export default MyMapComponent;
