import { MapContainer, TileLayer } from "react-leaflet";
import Coord from "../types/MyMapComponentProps";

function MyMapComponent(props: Coord) {
  return (
    <MapContainer center={[props.lat, props.lon]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default MyMapComponent;
