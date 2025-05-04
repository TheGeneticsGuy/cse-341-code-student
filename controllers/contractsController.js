const { getDb } = require('../db/connection');
const { ObjectId } = require('mongodb'); // So I can query by ID.

// GET /contacts - Retrieve all contacts if not specicying (basically the /contacts page)
const getAllContacts = async (req, res) => {
    try {
        const db = getDb();
        const allContacts = db.collection('contacts');
        const result = await allContacts.find({}).toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        // Just some good practice clean error reporting
        console.error("Error fetching all contacts:", error);
        res.status(500).json({ message: 'Internal Server Error while fetching contacts' });
    }
};

// GET /contacts/{id} - For getting just a single contact by db unique ID (see the .rest for an example)
const getSingleContact = async (req, res) => {
    try {
        const db = getDb();
        const contactsCollection = db.collection('contacts');
        const contactId = req.params.id;

        // Validate the ID format before attempting to convert
        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ message: 'Invalid Contact ID format.' });
        }

        const objectId = new ObjectId(contactId); // Convert string ID to MongoDB ObjectId - IGNORE DEPRECATION WARNING
        // VSC is saying this method is deprecated but OFFICIAL documentation for MongoDB says this is correct, so ignore VSC deprecation warning.

        const result = await contactsCollection.findOne({ _id: objectId });

        res.setHeader('Content-Type', 'application/json');
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Contact not found.' });
        }
    } catch (error) {
        console.error(`Error fetching contact with ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Internal Server Error while fetching single contact' });
    }
};

module.exports = {
    getAllContacts,
    getSingleContact
};