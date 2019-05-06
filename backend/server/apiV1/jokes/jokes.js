'use strict';
/**
 * Require our Modules
 */
const jokes = require('express').Router();
const logger = require('../../utils/logger');
const controller = require('./controller/jokes-controller');

// Get 10 random jokes - full path: localhost:300/api/v1/jokes/random/10
jokes.get('/random/10', (req, res) => {
    // run controller function to get 10 random jokes and use callback function as parameter to handle response
    controller.getTenRandomJokes((response) => {
        if (!!response && response.type === 'success') {
            res.status(200).json(response);
        } else if (!!response && response.type === 'failed') {
            res.status(400).json(response);
        } else {
            // Return the Error
            res.status(400).json({
                type: 'failed',
                err: 'No jokes retrieved!'
            });
        }
    });
});

// Get random joke - full path: localhost:300/api/v1/jokes/random
jokes.get('/random', (req, res) => {
    // run controller function to get 10 random jokes and use callback function as parameter to handle response
    controller.getRandomJoke((response) => {
        if (!!response && response.type === 'success') {
            res.status(200).json(response);
        } else if (!!response && response.type === 'failed') {
            res.status(400).json(response);
        } else {
            // Return the Error
            res.status(400).json({
                type: 'failed',
                err: 'No joke retrieved!'
            });
        }
    });
});

// Export the jokes
module.exports = jokes;