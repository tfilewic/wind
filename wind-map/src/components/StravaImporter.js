/**
 * StravaImporter.js
 * 
 * Buttons to upload gpx files or import routes from strava
 * 
 * @author tfilewic
 * @version 2025-03-15 
 */

import React, { useState, useEffect } from "react";
import polyline from "@mapbox/polyline";


//gets coordinates from the route summary polyline
function decodePolyline(encoded) {
    return polyline.decode(encoded).map(([lat, lng]) => ({ lat, lng }));
}
  

function StravaImporter({ setCoordinates, setRouteUploaded }) {

//    const [authenticated, authenticate] = useState(null);  //if there exists a strava authentication token
    const [routes, getRoutes] = useState([]);  //collection of strava routes
    const [loaded, load] = useState(false);  //if route is loaded

    const token =  sessionStorage.getItem("stravaToken");
    console.log("token " + token);
/*
    //check for a Strava token in localStorage
    useEffect(() => {
        console.log("Retrieved Token in StravaImporter:", token); // Debugging
        if (token) {
            authenticate(true);
        } else {
            authenticate(false);
        }
    }, []);
*/
    //fetch user routes
    useEffect(() => {
        if (token) {
          fetch('https://www.strava.com/api/v3/athlete/routes', { //api call to fetch routes
            headers: { 'Authorization': `Bearer ${token}` } //add token to header
          })
            .then(res => res.json())    //convert response to json
            .then(data => {
                getRoutes(data);   //update state with routes
                load(true);   //flag as loaded
            })
            .catch(err => {
                console.log("error in routes");
                console.error(err); //log errors
                sessionStorage.removeItem("stravaToken");
            }); 
        }
      }, [token]);


    //redirect to Strava OAuth endpoint
    if (!token) {
        return (
            <button onClick={() =>
                (window.location.href =
                    "https://www.strava.com/oauth/authorize?client_id=" + 
                    process.env.REACT_APP_STRAVA_ID + 
                    "&redirect_uri=http://localhost:3000/auth/strava/callback&response_type=code&scope=read,activity:read")
            }>
            Authenticate with Strava
            </button>
        )
    }

    //display loading message until routes are loaded
    if (!loaded) {
        return <div>Loading routes...</div>;
    }

    //display list of all routes
    return  (
        <div className="route-grid">
            {routes.map(route => (
                <button 
                    key={route.id} 
                    className="route-button"
                    onClick={() => {
                        setCoordinates(decodePolyline(route.map.summary_polyline));
                        setRouteUploaded(true);
                    }}
                >
                    <img 
                        src={route.map_urls.url} 
                        alt={route.name} 
                        className="route-thumbnail"
                    />
                    <p>{route.name}</p>
                </button>
            ))}
        </div>
    );
}

export default StravaImporter;