const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contactsController");

// GET all contacts
router.get("/", contactsController.getAllContacts);

// GET single contact by ID
// Note: ':id' is a route parameter. I found that Express makes it available in req.params.id
router.get("/:id", contactsController.getSingleContact);

// Maybe add POST, DEL, PUT parameters later here? Future project prob...

module.exports = router;
