const express = require("express");
const app = express();
const routes = require("./routes/index");

// Ok, RENDER uses process.env.PORT, but we keep 3000 for LCOAL development. Phew!
const port = process.env.PORT || 3000;

// Tells express where to find the defined routes
app.use("/", routes);

// Starting the server... added messaging for clarity.
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
