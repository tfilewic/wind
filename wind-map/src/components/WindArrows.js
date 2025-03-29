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

import { useMap, Marker, Tooltip } from "react-leaflet";
import React, { useEffect, useState } from "react";
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
                    fetch(`https://pro.openweathermap.org/data/2.5/weather?lat=${point.lat}&lon=${point.lng}&units=metric&appid=${KEY}`)
                    .then((res) => res.json())
                    .then((data) => ({
                        ...point,
                        windDirection: data.wind.deg,   //wind direction in degrees
                        windSpeed: data.wind.speed * 3.6    //wind speed converted to km/h
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


    //calculates arrow length by wind speed
    function getArrowLength(speed) {
        if (speed < 5) {
            return 15;   //floor length at 3km/hr
        } else if (speed <= 15) {   //3:1 up to 15km/hr
            return speed * 3;
        } else if (speed <= 30) {   //2:1 from 15-30km/hr
            return (15 * 3) + ((speed - 15) * 2);
        } else if (speed <= 90) {   //1:1 from 30-90km/hr
            return (15 * 3) + ((30 - 15) * 2) + ((speed - 30) * 1);
        } else if (speed > 90) {
            return 135; //ceiling length at 90km/hr
        }
    }

    //calculates arrow width by wind speed
    function getArrowWidth(speed) {
        if (speed < 5) {
            return 10;   //floor width at 3km/hr
        } else if (speed <= 10) {   //2:1 up to 10km/hr
            return speed * 2;
        } else if (speed <= 30) {   //1:1 from 00-30km/hr
            return (20) + ((speed - 10) * 0.5);
        } else if (speed > 30) {
            return 32; //ceiling width at 30km/hr
        }
    }



    //return a scaled arrow marker for each cell centerpoint coordinates
    return (
        <>
            {gridPoints.map((point, index) => 
                <div key={index}>
                    <Marker
                        position={[point.lat, point.lng]}
                        icon={L.icon({
                            iconUrl: "arrow.png",
                            iconSize: [getArrowWidth(point.windSpeed), getArrowLength(point.windSpeed)],
                            iconAnchor: [20, 20]
                        })}
                        rotationAngle={point.windDirection || 0 }    //rotate marker by wind direction
                        rotationOrigin="center center"  //rotate about center
                    />
                    <Marker
                        position={[point.lat, point.lng]}
                        icon={L.divIcon({
                            className: "wind-speed-label",
                            iconSize: [30, 30],
                            iconAnchor: [15, 15],
                            html: `<div style="font-size:15px; color:white; font-weight:bold;">${Math.round(point.windSpeed)}</div>`
                        })}
                    />
                    
                </div>
            )}
        </>
    )     
}

export default WindArrows;