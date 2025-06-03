# Wind and Route Visualization

Trying to learn some frontend with React, Leaflet.js, and API Integration.

Web app to visualize wind along a .gpx route so I can decide where I want to ride my bike.

## Project will:
- [X] Display a map with Esri satellite imagery
- [X] Display a .gpx route 
- [X] Fetch routes from Strava API
- [X] Display wind direction and magnitude along the route with a scaled arrow
- [X] Fetch wind data from OpenWeatherMap
- [ ] Implement AWS Lambda as a backend proxy for secure API requests.
- [X] Host frontend on AWS S3 & CloudFront
- [X] Set up HTTPS with AWS Certificate Manager and CloudFront
- [X] Use custom domain configured via AWS Route 53
- [X] Automate deployment on push with GitHub Actions
- [X] Securely manage API keys with GitHub Secrets


## Technologies Used
- **React** – frontend framework for building the UI  
- **Leaflet.js** – mapping library for displaying routes and wind data  
- **Esri Satellite Imagery** – basemap  
- **@tmcw/togeojson** – converts .gpx files to GeoJSON  
- **GeoJSON** – data format for geographic information  
- **OAuth 2.0** – for authenticating with Strava
- **Strava API** – to fetch user .gpx routes  
- **OpenWeatherMap API** – to fetch wind data  
- **AWS S3** – for static site hosting
- **AWS CloudFront** – to enable HTTPS, custom domain hosting, and SPA routing
- **AWS Certificate Manager** – for HTTPS setup
- **AWS Route 53** – for DNS and custom domain setup
- **GitHub Actions** – for automating deployment to S3 and invalidating CloudFront cache on push  
- **GitHub Secrets** – to securely inject API keys during build
