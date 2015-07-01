'use strict';

var HttpResponse  = require('./response');

/**
 * Responsible for making HTTP requests and managing client state
 *
 * @param {ServerProfile} profile
 * @param {Object} options
 * @param {Object} request library
 */
module.exports = function HttpClient(user, options, request) {
  if(!options) options = { json: true };
  if(!request) request = require('request');

  /**
   * Sends a GET request
   */
  this.get = function(url, query, done) {
    if (arguments.length == 2) {
      done = query;
      query = {};
    }

    request.get(
      user.buildUrl(url),
      user.buildOptions(query),
      handleResponse(done)
    );
  };

  /**
   * Sends a PUT request
   */
  this.put = function(url, data, done) {
    request.put(
      user.buildUrl(url),
      user.buildOptions({}, data),
      handleResponse(done)
    );
  };

  /**
   * Sends a POST request
   */
  this.post = function(url, data, done) {
    request.post(
      user.buildUrl(url),
      user.buildOptions({}, data),
      handleResponse(done)
    );
  };

  /**
   * Sends a DELETE request
   */
  this.del = function(url, done) {
    request.del(
      user.buildUrl(url),
      user.buildOptions(),
      handleResponse(done)
    );
  };

  /**
   * Returns a response handler that converts
   * res,body into a single HttpResponse object
   *
   * @param {Function} done
   * @return {Function}
   */
  var handleResponse = function(done) {
    return function(err, res, body) {
      if(err) return done(err);
      return done(null, new HttpResponse(res, body));
    };
  };

};
