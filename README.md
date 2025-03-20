# Wind and Route Visualization

Trying to learn some frontend with React, Leaflet.js, JavaScript, and API Integration.

Web app to visualize wind direction along a .gpx route so I can decide where I want to ride my bike on a given day.

## Project will:
- [X] Display a map with Esri satellite imagery
- [X] Display a .gpx route 
- [X] Fetch routes from Strava API
- [X] Display wind direction and magnitude along the route
- [X] Fetch wind data from OpenWeatherMap
- [ ] Create custom arrow using L.divIcon that scales its length based on wind magnitude
- [ ] Implement AWS Lambda as a backend proxy for secure API requests.


## Technologies Used
- **React** – frontend framework for building the UI  
- **Leaflet.js** – mapping library for displaying routes and wind data  
- **Esri Satellite Imagery** – basemap  
- **@tmcw/togeojson** – converts .gpx files to GeoJSON  
- **GeoJSON** – data format for geographic information  
- **Strava API** – to fetch user .gpx routes  
- **OpenWeatherMap API** – to fetch wind data  
