import { default as axios } from "axios";
import express from "express";
import cors from "cors";

const server = express(); // This server is deaf
const URL = "destinationsDB";

//server.listen(8000); // Told the server to listen on port 3000
const PORT = 8000;

//just to conole to make sure it is listening
server.listen(PORT, () => {
  console.log(`Server listening on port:${PORT}`);
});

server.use(cors());

server.get("/destinations", (req, res) => {
  console.log("middleware hit"); //is always hit
  //send it to the next line
  res.send(destinationsDB);
});

const destinationsDB = {
  123456: {
    destination: "Eiffel Tower",
    location: "Paris",
    photo:
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  234567: {
    destination: "Big Ben",
    location: "London",
    photo:
      "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
  },
};
