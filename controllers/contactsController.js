const { getDb } = require("../db/connection");
const { ObjectId } = require("mongodb"); // So I can query by ID.

// NOTE - Response codes I am using based on this standardized source:
// https://restfulapi.net/http-status-codes/

// GET /contacts - Retrieve all contacts if not specicying (basically the /contacts page)
const getAllContacts = async (req, res) => {
  try {
    const db = getDb();
    const allContacts = db.collection("contacts");
    const result = await allContacts.find({}).toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    // Just some good practice clean error reporting
    console.error("Error fetching all contacts:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error while fetching contacts" });
  }
};

// GET /contacts/{id} - For getting just a single contact by db unique ID (see the .rest for an example)
const getSingleContact = async (req, res) => {
  try {
    const db = getDb();
    const contactsCollection = db.collection("contacts");
    const contactId = req.params.id;

    // Validate the ID format before attempting to convert
    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: "Invalid Contact ID format." });
    }

    const objectId = new ObjectId(contactId); // Convert string ID to MongoDB ObjectId - IGNORE DEPRECATION WARNING
    // VSC is saying this method is deprecated but OFFICIAL documentation for MongoDB says this is correct, so ignore VSC deprecation warning.

    const result = await contactsCollection.findOne({ _id: objectId });

    res.setHeader("Content-Type", "application/json");
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Contact not found." });
    }
  } catch (error) {
    console.error(`Error fetching contact with ID ${req.params.id}:`, error);
    res
      .status(500)
      .json({ message: "Internal Server Error while fetching single contact" });
  }
};

// POST /contacts - Create a new contact
const createContact = async (req, res) => {
  try {
    const db = getDb();
    const contactsCollection = db.collection("contacts");

    // After reading the Error Responses, let's build a complex error response
    // Dynamic for each missing field - build to array, then create string by joining
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    const missingFields = [];

    if (!firstName) missingFields.push("firstName");
    if (!lastName) missingFields.push("lastName");
    if (!email) missingFields.push("email");
    if (!favoriteColor) missingFields.push("favoriteColor");
    if (!birthday) missingFields.push("birthday");

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}.`,
        missing: missingFields
      });
    }

    // If we got here, that means we have all items.
    const newContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    };

    const result = await contactsCollection.insertOne(newContact);

    // Note - 201 response code means something has been created successfully.
    if (result.acknowledged) {
      res.status(201).json({
        message: "Contact created successfully.",
        contactId: result.insertedId,
      });
    } else {
      res.status(500).json({ message: "Error creating contact." });
    }
  } catch (error) {
    console.error("Error creating contact:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error while creating contact." });
  }
};

// PUT /contacts/{id} - Update an existing contact
const updateContact = async (req, res) => {
  try {
    const db = getDb();
    const contactsCollection = db.collection("contacts");
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: "Invalid Contact ID format." });
    }
    const objectId = new ObjectId(contactId);
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    // According to documentation, a true PUT requires all content information as there
    // is a separate API called a "PATCH" for partial. A PUT replaces ALL. However, it
    // seems that you can technically use PUT like a PATCH and you don't need all.

    // Let's check that we received any information at all.
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No fields provided for update." });
    }

    const newContactInfo = {};
    if (firstName)
      newContactInfo.firstName = firstName;
    if (lastName)
      newContactInfo.lastName = lastName;
    if (email)
      newContactInfo.email = email;
    if (favoriteColor)
      newContactInfo.favoriteColor = favoriteColor;
    if (birthday)
      newContactInfo.birthday = birthday;

    // Ok, let's update
    const result = await contactsCollection.updateOne(
      { _id: objectId },
      { $set: newContactInfo }
    );

    if (result.matchedCount > 0) {
      // If modifiedCount is 0, it means the data sent was the same as existing data
      // Still, it's a successful "update" in that the resource matches the state.
      res.status(200).json({
        message: `Contact with ID ${contactId} updated successfully.`,
        updatedFields: Object.keys(newContactInfo),
        documentsMatched: result.matchedCount,
        documentsModified: result.modifiedCount
      });
    } else {
      res.status(404).json({ message: "Contact not found or no changes made." });
    }
  } catch (error) {
    console.error(`Error updating contact with ID ${req.params.id}:`, error);
    res
      .status(500)
      .json({ message: "Internal Server Error while updating contact." });
  }
};

// DELETE /contacts/{id} - Delete a contact
const deleteContact = async (req, res) => {
  try {
    const db = getDb();
    const contactsCollection = db.collection("contacts");
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: "Invalid Contact ID format." });
    }
    const objectId = new ObjectId(contactId);

    // Pretty straightforward, let's just delete with deleteOne
    const result = await contactsCollection.deleteOne({ _id: objectId });

    if (result.deletedCount > 0) {
      res.status(204).send(); // No body to send since it got deleted.
    } else {
      res.status(404).json({ message: "Contact not found." });
    }
  } catch (error) {
    console.error(`Error deleting contact with ID ${req.params.id}:`, error);
    res
      .status(500)
      .json({ message: "Internal Server Error while deleting contact." });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
};
