/**
 * Recenter.js
 * 
 * Recenters and rezooms map based on gpx coordinates
 * 
 * @author tfilewic
 * @version 2025-03-15 
 */

import { useMap } from "react-leaflet";

function Recenter({ coordinates }) {
    const map = useMap();

    if (!coordinates || coordinates.length < 1) return;

        //calculate bounds of coordinates
        const bounds = coordinates.map(coordinate => [coordinate.lat, coordinate.lng]); 

        //adjust map to fit bounds
        map.fitBounds(bounds, { padding: [50, 50] });


    return null;
}

export default Recenter;