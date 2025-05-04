const { MongoClient } = require('mongodb');
require('dotenv').config(); // Make sure environment variables are loaded

const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error('ERROR: MONGODB_URI is not correctly defined');
}

const client = new MongoClient(uri);

let db; // this will hold database connection

// We need to initialize the DB
const initDb = async (callback) => {
    if (db) {
        console.log('Db is already initialized!');
        return callback(null, db);
    }
    try {
        await client.connect();
        // IMPORTANT: Make sure you specify the database name here
        // It should match the database name you used in Step 1 (e.g., 'contactsDB')
        // Or, if your connection string includes the database name after the '/',
        // you might be able to use client.db() without arguments, but explicitly is safer.
        const dbName = process.env.DB_NAME || 'contacts'; // Good practice to put DB name in .env too
        db = client.db(dbName);
        console.log(`Successfully connected to database: ${db.databaseName}`);
        callback(null, db);
    } catch (err) {
        callback(err);
    }
};

// Let's call the db as needed
const getDb = () => {
    if (!db) {
        throw new Error('Db not initialized');
    }
    return db;
};

// Not sure if I will use, but we can close the db as needed so it
// doesn't just sit in memory.
const closeDb = async () => {
    if (client) {
        await client.close();
        console.log('MongoDB connection closed.');
        db = null; // Reset db variable
    }
};

module.exports = {
    initDb,
    getDb,
    closeDb
};