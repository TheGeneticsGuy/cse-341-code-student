const express = require("express");
const app = express();
const { initDb, closeDb } = require("./db/connection"); // Let's import initDB so we can load the mongoDB
const path = require('path');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

//RENDER uses process.env.PORT, but this is so we can keep the local environment of 3000
const port = process.env.PORT || 3000;

// Express is middleware to parse JSON and url
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Configuration
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Initialize DB connection
initDb((err) => {
  if (err) {
    console.error("Failed to connect to DB:", err);
    process.exit(1); // Exit if this fails. It shouldn't, but maybe mongo is down??
  } else {
    // So this is set this way so routes ONLY becomes accessible if connection is made.
    app.use("/", require("./routes/index"));

    // Ok, let's start the server!! Including a start message for console clarity.
    app.listen(port, () => {
      console.log(`Database Connected and Server is running on port http://localhost:${port}`);
      console.log(`Swagger UI is at http://localhost:${port}/api-docs`);
    });
  }
});

// For handling shutdown - if I ever need. A little future-proofing
process.on("SIGINT", async () => {
  console.log("SIGINT signal received: closing MongoDB connection...");
  await closeDb();
  process.exit(0);
});
