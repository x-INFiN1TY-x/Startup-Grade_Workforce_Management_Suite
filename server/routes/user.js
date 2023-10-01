const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const multer = require("multer");
const fs = require("fs");

// Routes

// Home route: Display the list of users i.e home page for both the admin and the user
router.get("/", userController.view);

// Search route: Find users based on the search term
router.post("/", userController.find);

// Add User form route: Display the form for adding a new user
router.get("/adduser", userController.form);

// Create User route: Add a new user to the database
router.post("/adduser", userController.create);

// Edit User form route: Display the form for editing a specific user
router.get("/edituser/:id", userController.edit);

// Update User route: Update the details of a specific user in the database
router.post("/edituser/:id", userController.update);

// View User route: Display the details of a specific user
router.get("/viewuser/:id", userController.viewall);

// Upload YAML route: Handle the YAML file upload and render pre-filled form
router.post("/uploadyaml", userController.uploadYAML);

// Route to render the bulkimports page
router.get("/bulkimports", userController.bulkImportsPage);

// Bulk Import route: Handle the bulk import of users from a folder
router.post("/bulkimports", userController.bulkImport);

router.get("/Editdatabase", userController.Editdatabase);

router.get("/vieworg/:organizationName", userController.viewOrgEmployees);

// Delete User route: Remove a specific user from the database
router.get("/:id", userController.delete);

router.get("/del/:organizationName", userController.del);

module.exports = router;
