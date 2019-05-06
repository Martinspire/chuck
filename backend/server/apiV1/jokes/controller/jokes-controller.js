'use strict'
/**
 * Require our modules
 */
const config = require('../../../../config/config');
const request = require('request');

const self = module.exports = {
    /**
     * @name getTenRandomJokes
     * @description Get 10 random jokes from our service
     * @param callbackFunction Execute callback when we have a result to process. Will inject result as a parameter into the callback
     */
    getTenRandomJokes: (callbackFunction) => {
        const url = config.jokeUrl;

        // Use REQUEST module and parse the body if we have usable result. Execute result with callbackfunction
        request(url, (error, response, body) => {
            if (!error && response.statusCode == 200 && !!body) {
                callbackFunction(JSON.parse(body));
            } else {
                callbackFunction({
                    type: 'failed',
                    err: 'No jokes found!'
                });
            }
        }, err => {
            console.log("error in request", err);
            // Return the Error
            callbackFunction({
                type: 'failed',
                err: 'No jokes retrieved!'
            });
        });
    },
    /**
     * @name getRandomJoke
     * @description Return a random joke from service
     * @param callbackFunction Execute callback when we have a result to process. Will inject result as a parameter into the callback
     */
    getRandomJoke: (callbackFunction) => {
        const url = config.randomJokeUrl;

        // Use REQUEST module and parse the body if we have usable result. Execute result with callbackfunction
        request(url, (error, response, body) => {
            if (!error && response.statusCode == 200 && !!body) {
                callbackFunction(JSON.parse(body));
            } else {
                callbackFunction({
                    type: 'failed',
                    err: 'No joke found!'
                });
            }
        }, err => {
            console.log("error in request", err);
            // Return the Error
            callbackFunction({
                type: 'failed',
                err: 'No joke retrieved!'
            });
        });
    }
};