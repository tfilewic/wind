/**
 * WindArrows.js
 * 
 * Divides the Leaflet map viewport into a grid based on its pixel size, 
 * and displays a wind arrow in the center of each cell.
 * Updates upon zoom or pan
 * 
 * @author tfilewic
 * @version 2025-03-15 
 */

import { useMap, Marker } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-rotatedmarker";

function WindArrows(){
    const map = useMap();   //get current Leaflet map
    const [gridPoints, setGridPoints] = useState([]);   //stores center coordinates of each cell
    

    useEffect(() => {

        const KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
        let debounceTimeout; //for debouncing updateGrid

        const updateGrid = () => {
            //get map bounds
            const bounds = map.getBounds(); //bounds of map
            const sw = bounds.getSouthWest();   //SW corner
            const ne = bounds.getNorthEast();   //NE corner

            //calculate cells 
            const cellSize = 150;   //cell dimension in pixels
            const mapSize = map.getSize(); //viewport size
            const rows = Math.ceil(mapSize.y / cellSize); //number of rows
            const columns = Math.ceil(mapSize.x / cellSize); //number of columns
            const latStep = (ne.lat - sw.lat) / rows;  //latitude increment per cell
            const lngStep = (ne.lng - sw.lng) / columns;  //latitude increment per cell

            //compute center point coordinates of cells
            const points = [];  //center coordinates of cells
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < columns; c++) {
                    points.push({
                        lat: sw.lat + latStep * (r + 0.5),
                        lng: sw.lng + lngStep * (c + 0.5)

                    });
                }
            }
            
            //fetch wind data from OpenWeatherMap API for each point
            Promise.all(
                points.map((point) =>
                    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${point.lat}&lon=${point.lng}&units=metric&appid=${KEY}`)
                    .then((res) => res.json())
                    .then((data) => ({
                        ...point,
                        windDirection: data.wind.deg,   //wind direction in degrees
                        windSpeed: data.wind.speed      //wind speed converted to km/h
                      }))
                    .catch(() => ({
                      ...point,
                      windDirection: null,
                      windSpeed: null
                    }))
                )
              ).then((updatedPoints) => {
                setGridPoints(updatedPoints);   //update state with grid points
              });
        };
        

        const updateGridDebounced = () => {
            clearTimeout(debounceTimeout); //clear timeout
            debounceTimeout = setTimeout(() => {
            updateGrid(); //call updateGrid after 200ms delay
            }, 200); //200ms debounce delay
        };

        updateGridDebounced();

        map.on("moveend", updateGridDebounced);  //update grid when pan/zoom ends
        updateGridDebounced();

        return () => {
            map.off("moveend", updateGrid); //cleanup listener when map is removed
            clearTimeout(debounceTimeout);  
        }

    }, [map]);


    //return a marker for each cell centerpoint coordinates
    return (
        <>
            {gridPoints.map((point, index) =>
                <Marker
                    key={index} //index as key for each marker
                    position={[point.lat, point.lng]}
                    icon={L.icon({
                        iconUrl: "arrow.png",
                        iconSize: [20, 30],
                        iconAnchor: [20, 20]
                    })}
                    rotationAngle={point.windDirection || 0 }    //rotate marker by wind direction
                    rotationOrigin="center center"  //rotate about center
                />
            )}
        </>
    )
}

export default WindArrows;