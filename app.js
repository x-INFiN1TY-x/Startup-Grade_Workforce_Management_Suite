// Import required modules
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const multer = require("multer");
const fs = require("fs");

require("dotenv").config();

// Create Express app
const app = express();
const port = process.env.PORT || 5000;

// Parsing middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

app.use(express.json()); // Parse JSON data

// Serve static files
app.use(express.static("public"));

// Configure Handlebars as the templating engine
const handlebars = exphbs.create({ extname: ".hbs" });
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

const upload = multer({ dest: "uploads/" });

// Import and use routes from user.js
const routes = require("./server/routes/user");
app.use("/", routes);

// Start the server
app.listen(port, () => console.log(`Listening on port ${port}`));
