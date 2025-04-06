/**
 * RouteBox.js
 * 
 * Buttons to upload gpx files or import routes from strava
 * 
 * @author tfilewic
 * @version 2025-04-05 
 */

import React, { useState, useEffect } from "react";
import GpxUploader from "./GpxUploader"; 
import StravaImporter from "./StravaImporter";

function RouteBox({ setCoordinates }) {

    const [mode, setMode] = useState(null);  //null (choose mode), upload, or strava
    const [routeUploaded, setRouteUploaded] = useState(false);  //if a route is uploaded
    const token = sessionStorage.getItem("stravaToken")

    //redirecting to Strava OAuth
    if (!token && !routeUploaded && mode === "strava") {
        return  <StravaImporter setCoordinates={setCoordinates} setRouteUploaded={setRouteUploaded} />
    };
    
    //show upload-box
    return (
        !routeUploaded && <div className="upload-box">

            {/* no mode selected- show two option buttons */}
            {!routeUploaded && !mode && (
                <>  
                    <button onClick={() => setMode("strava")}> 
                        {token ? "Import route from Strava" : "Authenticate with Strava"} 
                    </button>
                    <button onClick={() => setMode("upload")}>Upload GPX File</button>
                </>
            )}

            {/* strava is selected- show StravaImporter */}
            {!routeUploaded && mode === "strava" && (
            <StravaImporter setCoordinates={setCoordinates} setRouteUploaded={setRouteUploaded} />
            )}

            {/* upload is selected- show GpxUploader */}
            {!routeUploaded && mode === "upload" && (
            <GpxUploader setCoordinates={setCoordinates} setRouteUploaded={setRouteUploaded} />
        )}

        </div>
    );
}

export default RouteBox;