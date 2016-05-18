/**
 * isAuthenticated
 * @description :: Policy to inject user in req via JSON Web Token
 */
var passport = require('passport');

module.exports = function (req, res, next) {

  passport.authenticate('jwt', function (error, userID, info) {

    if (error) {
      return res.serverError(error);
    }

    if (!userID) {

      sails.log.debug('Authentication error (' + req.method + ' ' + req.path + '): ' + info.message);

      return res.unauthorized({
        status: 401,
        code: 'E_INVALID_AUTH_TOKEN',
        message: 'Missing or invalid authentication token.'
      });

    }

    User.findOne({id: userID}).exec(function (error, user) {

      if (error) {
        return next(error, false, {});
      }

      // The user corresponding to the token has been deleted
      if (!user) {
        return res.unauthorized({
          status: 401,
          code: 'E_INVALID_AUTH_TOKEN',
          message: 'Missing or invalid authentication token.'
        });
      }

      req.user = user;

      // Don't let the user define someone else as creator
      if (req.body) {
        req.body.createdBy = user.id;
      }

      next();

    });

  })(req, res);

};
