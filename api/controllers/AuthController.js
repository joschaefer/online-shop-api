/**
 * AuthController
 *
 * @description :: Server-side logic for managing user authorizations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

/**
 * Triggers when user authenticates via passport
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} error Error object
 * @param {Object} user User profile
 * @param {Object} info Info if some error occurs
 * @private
 */
function _onPassportAuth(req, res, error, user, info) {

  if (error) {
    return res.serverError(error);
  }

  if (!user) {
    sails.log.debug('Authentication error (' + req.method + ' ' + req.path + '): ' + info.message);
    return res.unauthorized({
      status: 401,
      code: 'E_WRONG_CREDENTIALS',
      message: 'Missing or wrong credentials.'
    });
  }

  sails.log.debug('Authentication successful for user `' + user.email + '`.');

  return res.ok({
    token: CipherService.createToken(user),
    user: user
  });

}

module.exports = {

  /**
   * Log in by local strategy in passport
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  login: function (req, res) {
    passport.authenticate('local', _onPassportAuth.bind(this, req, res))(req, res);
  }

};
