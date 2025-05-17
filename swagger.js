const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

let host;
let schemes;

if (NODE_ENV === 'production') {
    host = process.env.PROD_HOST || 'cse-341-topping.onrender.com'; // Falling back to Render just in case
    schemes = ['https'];
} else {
    // Local testing
    host = `localhost:${PORT}`;
    schemes = ['http'];
}

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API for managing contacts. Built with Node.js, Express, and MongoDB.',
        version: '1.0.0',
        contact: {
            name: 'Aaron Topping',
            email: 'codingasahobby@proton.me'
        }
    },
    host: host,
    schemes: schemes,
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: 'Contacts',
            description: 'Operations related to contacts'
        },
        {
            name: 'General',
            description: 'General API information and welcome messages'
        }
    ],

    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
        }
    },
    // Schemas defined as components - This is how you define it explicitly without
    // having swagger try to infer the schemas.
    components: {
        schemas: {
            Contact: {
                type: 'object',
                properties: {
                    _id: { type: 'string', example: '605c72ef2f98ed42f8a3d2f7' },
                    firstName: { type: 'string', example: 'Aaron' },
                    lastName: { type: 'string', example: 'Topping' },
                    email: { type: 'string', example: 'aaron.topping@example.com' },
                    favoriteColor: { type: 'string', example: 'Blue' },
                    birthday: { type: 'string', format: 'date', example: '1990-01-15' }
                },
                required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday']
            },
            NewContact: {  // no id yet for new contact
                type: 'object',
                properties: {
                    firstName: { type: 'string', example: 'Jane' },
                    lastName: { type: 'string', example: 'Doe' },
                    email: { type: 'string', example: 'jane.doe@example.com' },
                    favoriteColor: { type: 'string', example: 'Green' },
                    birthday: { type: 'string', format: 'date', example: '1992-05-20' }
                },
                required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday']
            }
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

// This is how we generate the Swagger AutoGen now
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger JSON file has been generated at ' + outputFile);
});