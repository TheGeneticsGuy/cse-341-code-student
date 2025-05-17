// This file is to define the URL paths and connects them to the controller functions.
// Basically, it's using this file as the main entry point for routes.
const express = require("express");
const router = express.Router();

// Controller for Week 1 routes
const nameController = require("../controllers/nameController");

// GET / route uses the original getName controller
router.get("/", nameController.getName);

// --- New routes for Contacts API - adding this for fun---
router.get("/welcome", (req, res) => {
  res.send("Welcome to the Contacts API!");
});

// Use the contacts routes for any path starting with /contacts
router.use("/contacts", require("./contacts"));

module.exports = router;
