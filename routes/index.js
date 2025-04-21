// This file is to define the URL paths and connects them to the controller functions.
// Basically, it's using this file as the main entry point for routes.

const express = require('express');
const router = express.Router();

// Getting the contorller
const nameController = require('../controllers/nameController');

// Define the route for the homepage and
// then when a GET response comes to '/' we will use the nameController.getName function.
router.get('/', nameController.getName);

module.exports = router;