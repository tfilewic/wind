/**
 * StravaCallback.js
 * 
 * Strava OAuth callback component
 * Extracts access token from url, stores it in localstorage, then redirects user back to main app
 * 
 * @author tfilewic
 * @version 2025-03-15 
 */

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";




function StravaCallback() {
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return; //stop if request already sent
    hasFetched.current = true; //mark request as sent


    const code = new URLSearchParams(window.location.search).get("code");  //search current url for auth code
    const ID = Number(process.env.REACT_APP_STRAVA_ID);
    const SECRET = process.env.REACT_APP_STRAVA_SECRET;


    console.log("Strava ID:", ID);                    //DEBUG
    console.log("Strava Secret:", SECRET);                    //DEBUG
    console.log("Auth Code:", code);                    //DEBUG


    if (code) {
        //exchange code for token
        fetch("https://www.strava.com/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({

            client_id: ID, 
            client_secret: SECRET,
            code: code,
            grant_type: "authorization_code"
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log("Strava API Response:", data);                    //DEBUG

        if (data.access_token) {
          localStorage.setItem("stravaToken", data.access_token);
          console.log("Stored Strava Token:", localStorage.getItem("stravaToken"));                    //DEBUG
        }
      })
      .finally(() => {
        navigate("/"); //redirect home
      });
    } else {
      navigate("/"); //redirect home
    }
  }, [navigate]);

  return <div>Loading...</div>; //display loading message
}

export default StravaCallback;