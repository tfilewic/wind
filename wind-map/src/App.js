import React from "react";  //react
import { MapContainer, TileLayer } from "react-leaflet";  //leaflet components
import "leaflet/dist/leaflet.css"; //leaflet css for map rendering



let center = [50.931772, -114.115163];
let zoom = 15;

function App() {
  return (
    <div> 
      <MapContainer   
        center = {center} 
        zoom = {zoom} 
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>, Maxar, Earthstar Geographics'
        />
      </MapContainer>     
    </div>
  );
}

export default App;
