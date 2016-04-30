/**
 * jwToken
 *
 * @description :: JSON Webtoken Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

var jwt = require('jsonwebtoken');

module.exports = {

  issue: function (payload) {
    return jwt.sign(payload, sails.config.jwt.secret, {
      expiresIn: sails.config.jwt.expiresIn
    });
  },

  verify: function (token, callback) {
    return jwt.verify(token, sails.config.jwt.secret, {}, callback);
  }

};
