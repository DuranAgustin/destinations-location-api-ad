import express from "express";
import uniqid from "uniqid";

import destinationsDB from "../db.js";
import { filterDestinations } from "../Helpers/filters.js";
import {
  checkRequiredFields,
  isValidRequiredField,
} from "../Helpers/validators.js";
import { getPhotoURL } from "../Helpers/data_access.js";

const router = express.Router();

// https://tenor.googleapis.com/v2/search?key=AIzaSyCmqqhse3UwYRzXIlAZPxFfCBI1NJd12vc&q=lebron
// https://api-destinations-page.herokuapp.com/destinations
// https://api-destinations-page.herokuapp.com/destinations?country=france

// CREATE
// POST /destinations
// Needs/receives {location, destination, description}
// BOTH location and destination are required
// description is optional
// => Creates a new destination inside of destinationsDB
// function getUnsplashPhoto({ destName, locName }) {
//   // Use destName and locName as query parameters to get a photo related to them from the Unsplash API
//   const URL = `https://api.unsplash.com/search/photos?client_id=zPyO6m0ezgkOS-Tc0Co64-y6MqTXCULFL-TcXfxBrLc&query=${destName} ${locName}`;
// }
// console.log(express.text());

// WITH A PHOTO FROM UNSPLASH
router.post("/", checkRequiredFields, async (req, res) => {
  const { location, destination, description } = req.body;

  const photo = await getPhotoURL({ location, destination });

  const newDest = {
    location,
    destination,
    photo,
    description: description ? description : "",
  };

  const id = uniqid();
  destinationsDB[id] = newDest;
  res.send({ message: "success" });
});

// READ => DO THIS
// GET /destinations => send back the whole db
// GET /destinations?city=kajdkjakdjkajd => send filtered locations by city
// localhost:3000/destinations => the whole db of destinations
// localhost:3000/destinations?city=london => only send back destinations whose location is London
router.get("/", (req, res) => {
  //TODO Check for a city query parameter
  const city = req.query.city;

  filterDestinations({ city, destinationsDB, res });
});

// GET /destinations/city/:myCity
// localhost:3000/destinations/city/San Bernadino
router.get("/city/:myCity", (req, res) => {
  // log the city passed in the url as a named route parameter
  const city = req.params.myCity;

  filterDestinations({ city, destinationsDB, res });
});

// UPDATE
router.put(
  "/:id",
  (req, res, next) => {
    const location = req.body.location;

    if (location !== undefined && !isValidRequiredField(location)) {
      return res
        .status(400)
        .send({ error: "location is req and has to be valid text" });
    }
    const destination = req.body.destination;
    if (destination !== undefined && !isValidRequiredField(destination)) {
      return res
        .status(400)
        .send({ error: "destination is req and has to be valid text" });
    }
    next();
  },
  async (req, res) => {
    const id = req.params.id;
    const { location, destination, description } = req.body;

    let hasLocOrDestChanged = false;

    if (location) {
      destinationsDB[id].location = location;
      hasLocOrDestChanged = true;
    }
    if (destination) {
      destinationsDB[id].destination = destination;
      hasLocOrDestChanged = true;
    }
    if (hasLocOrDestChanged) {
      const { location, destination } = destinationsDB[id];
      const photo = await getPhotoURL({ location, destination });
      destinationsDB[id].photo = photo;
    }
    if (description) {
      destinationsDB[id].description = description;
      console.log(`description: ${description}`);
    }
    res.send({ message: "success" });
  }
);

// DELETE
//grab the id of the obj that was inputed
// delete operator.
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  // id.delete;
  delete destinationsDB[id];
  res.send(`deleteing: ${destinationsDB[id]}`);
});

export default router;
