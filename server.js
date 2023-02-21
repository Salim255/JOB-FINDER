const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("Hello world"));

app.listen(5004, () => console.log("Server run on port 5004"));
