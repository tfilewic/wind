import React from "react";
import { useState } from "react";   //hook for storing parsed coords 
import { MapContainer, TileLayer, Polyline } from "react-leaflet";  //leaflet components
import "leaflet/dist/leaflet.css"; //leaflet css for map rendering
import GpxParser from "./components/GpxParser"; //for parsing gpx files
import Recenter from "./components/Recenter"; //for recentering and rezooming map to fit route
import "./App.css";



let center = [50.931772, -114.115163];
let zoom = 15;

function App() {
  
  const [coordinates, setCoordinates] = useState(null); //store parsed gpx coordinates

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

      {coordinates && <Polyline positions={coordinates} color="orange" />}
      {coordinates && <Recenter coordinates={coordinates} />}

      </MapContainer>   


      {/* GPX Parser: Pass setCoordinates so it updates state */}
      <GpxParser setCoordinates={setCoordinates} />

    </div>
  );
}

export default App;
