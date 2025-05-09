const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contactsController");

// GET all contacts
router.get("/", contactsController.getAllContacts);

// GET single contact by ID
// Note: ':id' is a route parameter. I found that Express makes it available in req.params.id
router.get("/:id", contactsController.getSingleContact);

// POST - Create a new contact
router.post("/", contactsController.createContact);

// PUT - Update a contact by ID (contacts/:id)
router.put("/:id", contactsController.updateContact);

// DELETE - Delete a contact by ID (/contacts/:id)
router.delete("/:id", contactsController.deleteContact);

module.exports = router;
