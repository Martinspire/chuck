'use strict';
/**
 * Require our modules
 */
const express = require('express');
// Set the App
const app = express();
// Add CORS
const cors = require('cors');
// Require our Main API Router
const apiV1 = require('./apiV1/router');

const healthcheck = require('./healthcheck/healthcheck');
const login = require('./authentication/login/login');
const verify = require('./authentication/verify/verify');
const caching = require('./caching/caching');
// Require our Global Middleware
require('./middleware/middleware')(app);

// use CORS on all paths, so localhost:3000 can be used on the frontend when run locally
app.use(cors());
/**
 * Generic API's
 */

// Use protected Endpoints
app.use('/*', require('./authentication/protected-endpoints/protected-endpoints'));

// Login
app.use('/login', login);

// Verify Login
app.use('/login/verify', verify);

// Healthcheck
app.use('/healthcheck', healthcheck);

// Caching
app.use('/cache', caching);

// Add all the API - Version 1
app.use('/api/v1', apiV1); // added jokes routing to api

// Error Handler
require('./errorhandler/errorhandler')(app); // fixed errorhandler to actually return an error, even when no status has been sent

// Export the app
module.exports = app;