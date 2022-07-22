export function checkRequiredFields(req, res, next) {
  // const location = req.body.location;
  // const destination = req.body.destination;
  // const description = req.body.description;
  const { location, destination, description } = req.body;

  if (!isValidRequiredField(location) || !isValidRequiredField(destination)) {
    //falsy values
    return res.status(400).send({
      error:
        "location and destination are both required and have to be valid text",
    });
  }
  next();
}

export function isValidRequiredField(field) {
  if (!field || typeof field !== "string") {
    //falsy values
    return false;
  }

  return true;
}
