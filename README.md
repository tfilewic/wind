# Wind and Route Visualization

Trying to learn some frontend with React, Leaflet.js, JavaScript, and API Integration.

Web app to visualize wind along a .gpx route so I can decide where I want to ride my bike.

## Project will:
- [X] Display a map with Esri satellite imagery
- [X] Display a .gpx route 
- [X] Fetch routes from Strava API
- [X] Display wind direction and magnitude along the route with a scaled arrow
- [X] Fetch wind data from OpenWeatherMap
- [ ] Implement AWS Lambda as a backend proxy for secure API requests.
- [ ] Host frontend on AWS S3 & CloudFront
- [ ] Set up HTTPS with AWS Certificate Manager and CloudFront
- [ ] Use custom domain


## Technologies Used
- **React** – frontend framework for building the UI  
- **Leaflet.js** – mapping library for displaying routes and wind data  
- **Esri Satellite Imagery** – basemap  
- **@tmcw/togeojson** – converts .gpx files to GeoJSON  
- **GeoJSON** – data format for geographic information  
- **Strava API** – to fetch user .gpx routes  
- **OpenWeatherMap API** – to fetch wind data  
