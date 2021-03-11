# Backend-MERN-LocationTracker

This is the backend to a web application that offers the possibility to save locations and add comments and images.  To be able to do this, the user must register and log in. For authentication I used the JSON Web Token and by using bcrypt.js the password is stored encrypted in the database. A visitor who is not logged in sees an overview of all registered users and can view their stored locations. The address, which is entered when creating a location, is automatically translated into coordinates by the Google Maps API and the location can be viewed on the map in 2D and 3D via satellite.

Techstack:
- Node
- Express
- JSON Web Token
- Bcrypt.js
- Axios
- Google Maps API
- Mongoose
- Multer
