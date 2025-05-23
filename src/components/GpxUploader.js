/**
 * GpxUploader.js
 * 
 * Uploads and parses GPX files to extract route coordinates for mapping in Leaflet.js.
 * 
 * @author tfilewic
 * @version 2025-03-14 
 */

import { DOMParser } from "@xmldom/xmldom"; //reads gpx as xml
import { gpx } from "@tmcw/togeojson";  //converts gpx xml to geojson


function GpxUploader({ setCoordinates, setRouteUploaded }) {
    //handle file upload event
    const fileUpload = (uploadEvent) => { 
        
        const file = uploadEvent.target.files[0]; //get first uploaded file
        if (!file) return;  //validate

        //create file reader
        const reader = new FileReader();    

        //handle file read event
        reader.onload = (readEvent) => { 
            const text = readEvent.target.result;   //get file text as string
            const xml = new DOMParser().parseFromString(text, "text/xml");  //convert text to xml
            const geojson = gpx(xml);   //convert xml to gpx

        //get coordinates
        const longLatCoordinates = geojson.features[0].geometry.coordinates;  //extract geojson coordinates [long, lat]
        const latLongCoordinates = longLatCoordinates.map(coordinate => {   //map for use by leaflet.js
            return {
                lat: coordinate[1],
                lng: coordinate[0]
            };
        });

        //set coordinates
        setCoordinates(latLongCoordinates); //update state with parsed coordinates
        setRouteUploaded(true);
        //setFileUploaded(true);  //mark as uploaded
        };

    reader.readAsText(file);  //read file as text
    };


    return (
        <div className="upload-box">
            <input type="file" accept=".gpx" onChange={fileUpload} />
        </div>
    );

}

export default GpxUploader;

