import React from "react";
import { useState, useEffect } from "react";   //hook for storing parsed coords 
import { MapContainer, TileLayer, Polyline } from "react-leaflet";  //leaflet components
import "leaflet/dist/leaflet.css"; //leaflet css for map rendering
import RouteBox from "./components/RouteBox"; 
//import GpxParser from "./components/GpxParser"; //for parsing gpx files
import Recenter from "./components/Recenter"; //for recentering and rezooming map to fit route
import WindArrows from "./components/WindArrows"; 
import "./App.css";



let center = [50.931772, -114.115163];
let zoom = 15;

function App() {
  
  const [coordinates, setCoordinates] = useState(null); //store parsed gpx coordinates
  /*
  useEffect(() => localStorage.removeItem("stravaToken"), []);  //clear strava auth token
  console.log("cleared token-----------");
*/
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
        {coordinates && <WindArrows />}
        
      </MapContainer>   


      <RouteBox setCoordinates={setCoordinates} />

    </div>
  );
}

export default App;
