const mysql = require("mysql2");
const multer = require("multer");
const AdmZip = require("adm-zip");
const fs = require("fs");
require("dotenv").config();
const yaml = require("js-yaml");
const path = require("path");

// destination folder for file uploads
const upload = multer({ dest: "uploads/" });
const yamlUpload = multer({ dest: "yamlfiles/" });
const uploadfol = multer({ dest: "uploads/" }).single("companyFolder");

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

//test
const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs.log" }),
  ],
  format: format.combine(format.timestamp(), format.json()),
});
//test

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // Use the connection
  connection.query(
    "SELECT * FROM user WHERE (first_name LIKE ? OR last_name LIKE ?) AND status = 'active'",
    ["%" + searchTerm + "%", "%" + searchTerm + "%"],
    (err, rows) => {
      if (!err) {
        res.render("viewresults", { rows });
      } else {
        console.log(err);
      }
    }
  );
};

// Render the add-user form
exports.form = (req, res) => {
  res.render("add-user");
};

exports.create = (req, res) => {
  // upload middleware to handle file uploads
  upload.array("file")(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.render("add-user", { alert: "Error uploading files." });
    }

    const { first_name, last_name, email, phone, comments } = req.body;
    console.log(req.body);

    const files = req.files; // Array of uploaded files

    const userFolder = `uploads/${last_name}`;

    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder);
    }

    // Move the uploaded files to the user's folder
    files.forEach((file) => {
      const namedfilePath = `${userFolder}/${first_name}`;
      if (!fs.existsSync(namedfilePath)) {
        fs.mkdirSync(namedfilePath);
      }

      const filePath = `${namedfilePath}/${file.originalname}`;

      fs.renameSync(file.path, filePath);
    });
    // Use the connection to insert a new user into the database
    connection.query(
      "INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?",
      [first_name, last_name, email, phone, comments],
      (err, rows) => {
        if (!err) {
          res.render("add-user", { alert: "User added successfully." });
        } else {
          console.log(err);
        }
        console.log("The data from user table: \n", rows);
      }
    );
  });
};

// Edit user
exports.edit = (req, res) => {
  // Use the connection to query for a specific user to edit
  connection.query(
    "SELECT * FROM user WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (!err) {
        res.render("edit-user", { rows });
      } else {
        console.log(err);
      }
      console.log("The data from user table: \n", rows);
    }
  );
};

// Update User
exports.update = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;

  // Use the connection to update a user in the database
  upload.array("file")(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.render("add-user", { alert: "Error uploading files." });
    }

    const { first_name, last_name, email, phone, comments } = req.body;
    console.log(req.body);

    const files = req.files; // Array of uploaded files

    const userFolder = `uploads/${last_name}`;

    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder);
    }

    // Move the uploaded files to the user's folder
    files.forEach((file) => {
      const namedFolderPath = `${userFolder}/${first_name}`;

      // Check if the named folder already exists
      if (fs.existsSync(namedFolderPath)) {
        // Remove the existing folder and its contents
        fs.rmSync(namedFolderPath, { recursive: true });
      }

      // Create the named folder
      fs.mkdirSync(namedFolderPath);

      const filePath = `${namedFolderPath}/${file.originalname}`;

      fs.renameSync(file.path, filePath);
    });

    // Use the connection to insert a new user into the database
    connection.query(
      "UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?",
      [first_name, last_name, email, phone, comments, req.params.id],
      (err, rows) => {
        if (!err) {
          // Use the connection to query for the updated user
          connection.query(
            "SELECT * FROM user WHERE id = ?",
            [req.params.id],
            (err, rows) => {
              // When done with the connection, release it
              if (!err) {
                res.render("edit-user", {
                  rows,
                  alert: `${first_name} has been updated.`,
                });
              } else {
                console.log(err);
              }
              console.log("The data from user table: \n", rows);
            }
          );
        } else {
          console.log(err);
        }
        console.log("The data from user table: \n", rows);
      }
    );
  });
};

// Delete User
exports.delete = (req, res) => {
  // Hide a record by updating the status field
  const userId = parseInt(req.params.id);

  if (isNaN(userId)) {
    // Redirect to the page stored in req.params.id
    return res.redirect(`/${req.params.id}`);
  }
  let NumID = req.params.id;
  connection.query(
    "UPDATE user SET status = ? WHERE id = ?",
    ["removed", NumID],
    (err, rows) => {
      if (!err) {
        let removedUser = encodeURIComponent("User successfully removed.");
        res.redirect("/?removed=" + removedUser);
      } else {
        console.log(err);
      }
      console.log("The data from user table are: \n", rows);
    }
  );
};

// View a specific user
exports.viewall = (req, res) => {
  // Use the connection to query for a specific user to view
  connection.query(
    "SELECT * FROM user WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (!err) {
        res.render("view-user", { rows });
      } else {
        console.log(err);
      }
    }
  );
};
//YAML upload - test code 1 - working model !

exports.uploadYAML = async (req, res) => {
  // Middleware to handle file uploads for YAML file
  yamlUpload.single("yamlFile")(req, res, async (err) => {
    if (err) {
      logger.error("Error uploading files:", err);
      return res
        .status(400)
        .render("add-user", { alert: "Error uploading files." });
    }

    // Get the uploaded YAML file
    const yamlFile = req.file;
    logger.info("Received yaml:", yamlFile);

    // Validate if a YAML file was uploaded
    if (!yamlFile) {
      logger.error("No YAML file uploaded");
      return res
        .status(400)
        .render("add-user", { alert: "Please upload a YAML file." });
    }

    // Read file stream and parse YAML data
    const fileStream = fs.createReadStream(yamlFile.path);
    logger.info("Reading YAML file stream");

    // Initialize an empty buffer to store the data from the ReadStream
    let dataBuffer = Buffer.alloc(0);

    // Listen for 'data' events and append the data to the buffer
    fileStream.on("data", (chunk) => {
      dataBuffer = Buffer.concat([dataBuffer, chunk]);
    });

    // Listen for 'end' event to indicate the entire file has been read
    fileStream.on("end", async () => {
      let yamlData;
      let yamlString = dataBuffer.toString("utf8");

      try {
        // Parse the YAML data
        yamlData = await yaml.load(yamlString);
        logger.info("YAML data read");
        console.log(yamlData);
      } catch (err) {
        logger.error("Error parsing YAML:", err);
        return res
          .status(400)
          .render("add-user", { alert: "Error parsing YAML file." });
      }

      isValidYAML(yamlData);
      // Parse form data from YAML
      const formData = parseFormData(yamlData);
      // Render the add-user form with pre-filled data
      return res.render("add-user", formData);
    });
  });
};

// Utility functions
function isValidYAML(data) {
  if (
    data &&
    data.first_name &&
    data.last_name &&
    data.email &&
    data.phone &&
    data.comments
  ) {
    logger.debug("Valid YAML data");
    logger.info("YAML validation result: Valid");
    return true;
  } else {
    logger.debug("Invalid YAML data:", data);
    logger.info("YAML validation result: Invalid");
    return false;
  }
}

function parseFormData(data) {
  return {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    phone: data.phone,
    comments: data.comments,
  };
}

// exports.bulkImport = async (req, res) => {
//   let totalUsers = 0;
//   let failedUsers = 0;

//   uploadfol(req, res, async (err) => {
//     if (err) {
//       logger.error("Error uploading files:", err);
//       return res
//         .status(400)
//         .render("bulkimports", { alert: "Error uploading folder." });
//     }

//     const companyFolder = req.file;
//     logger.info("Received folder:", companyFolder);

//     // Validate folder upload
//     if (companyFolder.destination.endsWith(".zip")) {
//       logger.error("zip file not uploaded!");

//       return res
//         .status(400)
//         .render("bulkimports", { alert: "Please upload a folder to proceed." });
//     }

//     if (!companyFolder) {
//       logger.error("folder not uploaded  , try again");
//       return res
//         .status(400)
//         .render("bulkimports", { alert: "Please upload a folder to proceed." });
//     }

//     // Loop through folder contents
//     fs.readdir(companyFolder.path, (err, files) => {
//       if (err) {
//         return res.status(500).send("Error reading folder contents");
//       }

//       files.forEach((file) => {
//         let filePath = path.join(companyFolder.path, file);

//         // Read file to buffer
//         let fileBuffer = Buffer.alloc(0);
//         let stream = fs.createReadStream(filePath);

//         stream.on("data", (chunk) => {
//           fileBuffer = Buffer.concat([fileBuffer, chunk]);
//         });

//         stream.on("end", async () => {
//           // Parse YAML
//           let yamlString = fileBuffer.toString("utf8");
//           let yamlData;

//           try {
//             yamlData = await yaml.load(yamlString);
//             logger.info("YAML data read for file");
//             console.log(yamlData);
//           } catch (err) {
//             failedUsers++;
//             logger.error("Error parsing YAML:", err);
//             return res.status(400).render("bulkimports", {
//               alert: "Error parsing YAML file for this folder.",
//             });
//           }

//           // Validate YAML
//           if (!isValidYAML(yamlData)) {
//             failedUsers++;
//             return res.status(400).render("add-user", {
//               alert: "invalid YAML data received",
//             });
//           }

//           // Construct user data
//           var userData = parseFormData(yamlData);
//           console.log(userData);
//           // Execute INSERT query
//           connection.query(
//             "INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?",
//             [
//               yamlData.first_name,
//               yamlData.last_name,
//               yamlData.email,
//               yamlData.phone,
//               yamlData.comments,
//             ],
//             (err, rows) => {
//               if (err) {
//                 failedUsers++;
//                 console.log(err);
//               } else {
//                 totalUsers++;
//               }
//             }
//           );
//         });
//       });
//     });
//   });
//   res.render("bulkimports", {
//     alert: `Folder added successfully. Total users added: ${totalUsers}, Failed users: ${failedUsers}`,
//   });
// };

exports.bulkImport = async (req, res) => {
  let totalUsers = 0;
  let failedUsers = 0;
  let validationError = false;

  uploadfol(req, res, async (err) => {
    if (err) {
      logger.error("Error uploading files:", err);
      validationError = true;
    }

    const companyFolder = req.file;
    logger.info("Received folder:", companyFolder);

    // Validate folder upload
    if (!companyFolder.originalname.endsWith(".zip")) {
      logger.error("Invalid folder: ZIP file not uploaded!");
      validationError = true;
    }

    if (!companyFolder) {
      logger.error("Folder not uploaded, try again");
      validationError = true;
    }

    // Continue processing only if there are no validation errors
    if (!validationError) {
      // Define the folder where you want to store the extracted contents
      const extractFolderPath = path.join(__dirname, "uploads");

      // Create the extracted folder if it doesn't exist
      if (!fs.existsSync(extractFolderPath)) {
        fs.mkdirSync(extractFolderPath);
      }

      // Unzip the uploaded file and save its contents to the designated location
      const zip = new AdmZip(companyFolder.path);
      zip.extractAllTo(extractFolderPath, true);

      // Get the name of the extracted folder
      const extractFolderName = companyFolder.filename.split(".zip")[0];

      // Create the path to the extracted folder
      const pathToExtractedFolder = path.join(
        extractFolderPath,
        extractFolderName
      );

      // Loop through extracted folder contents
      fs.readdir(pathToExtractedFolder, (err, files) => {
        if (err) {
          failedUsers++;
          logger.error("Error reading folder contents:", err);
        } else {
          files.forEach((file) => {
            let filePath = path.join(pathToExtractedFolder, file);

            // Read file to buffer
            let fileBuffer = Buffer.alloc(0);
            let stream = fs.createReadStream(filePath);

            stream.on("data", (chunk) => {
              fileBuffer = Buffer.concat([fileBuffer, chunk]);
            });

            stream.on("end", async () => {
              // Parse YAML
              let yamlString = fileBuffer.toString("utf8");
              let yamlData;

              try {
                yamlData = await yaml.load(yamlString);
                logger.info("YAML data read for file");
                console.log(yamlData);
              } catch (err) {
                failedUsers++;
                logger.error("Error parsing YAML:", err);
              }

              // Validate YAML
              if (isValidYAML(yamlData)) {
                // Construct user data
                var userData = parseFormData(yamlData);
                console.log(userData);
                // Execute INSERT query
                connection.query(
                  "INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?",
                  [
                    yamlData.first_name,
                    yamlData.last_name,
                    yamlData.email,
                    yamlData.phone,
                    yamlData.comments,
                  ],
                  (err, rows) => {
                    if (err) {
                      failedUsers++;
                      console.log(err);
                    } else {
                      totalUsers++;
                    }
                  }
                );
              } else {
                failedUsers++;
                logger.error("Invalid YAML data received");
              }
            });
          });
        }

        // Cleanup: Delete the uploaded zip file (if needed)
        fs.unlinkSync(companyFolder.path);

        // Send a response at the end of processing
        res.render("bulkimports", {
          alert: `Folder added successfully. Total users added: ${totalUsers}, Failed users: ${failedUsers}`,
        });
      });
    }
  });
};

// Render the bulkimports page
exports.bulkImportsPage = (req, res) => {
  console.log("working");
  res.render("bulkimports");
};

// View Users
exports.view = (req, res) => {
  // Use the connection to query for active users
  connection.query(
    'SELECT * FROM user WHERE status = "active"',
    (err, rows) => {
      // When done with the connection, release it
      if (!err) {
        let removedUser = req.query.removed;
        res.render("home", { rows, removedUser });
      } else {
        console.log(err);
      }
      console.log("The data from user table: \n", rows);
    }
  );
};

// Manage Database - Retrieve Organization Names
exports.Editdatabase = (req, res) => {
  // Use the connection to query for all organization names
  connection.query(
    'SELECT DISTINCT last_name FROM user WHERE status = "active"',
    (err, rows) => {
      // When done with the connection, release it
      if (!err) {
        let removedUser = req.query.removed;
        res.render("Editdatabase", { rows, removedUser });
      } else {
        console.log(err);
      }
    }
  );
};

exports.viewOrgEmployees = (req, res) => {
  const organizationName = req.params.organizationName;

  // Use the connection to query for all employees of the specified organization
  connection.query(
    "SELECT * FROM user WHERE last_name = ? AND status = 'active'",
    [organizationName],
    (err, rows) => {
      if (!err) {
        let removedUser = req.query.removed;

        res.render("viewresults", { rows, employees: rows });
      } else {
        console.log(err);
      }
    }
  );
};

// Delete org
exports.del = (req, res) => {
  let Orgname = req.params.organizationName;
  console.log(req.params.organizationName);
  connection.query(
    "UPDATE user SET status = ? WHERE last_name = ?",
    ["removed", Orgname],
    (err, rows) => {
      if (!err) {
        let removedUser = encodeURIComponent("Organization removed.");
        res.redirect("/Editdatabase/?removed=" + removedUser);
      } else {
        console.log(err);
      }
    }
  );
};
