/**
 * StravaCallback.js
 * 
 * Strava OAuth callback component
 * Extracts access token from url, stores it in localstorage, then redirects user back to main app
 * 
 * @author tfilewic
 * @version 2025-03-15 
 */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//TODO move to backend to keep private
const ID = 152265;
const SECRET = "8ec94d8c8b04b7df75d8727b01e2d39d7c09991c"


function StravaCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");  //search current url for auth code

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
        if (data.access_token) {
          localStorage.setItem("stravaToken", data.access_token);
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