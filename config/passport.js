/**
 * Passport authentication settings
 * (sails.config.jwt)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.http.html
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports.jwt = {

  expiresIn: '1d',
  secret: process.env.tokenSecret || '|2fl*)@k4,X{My{Vp6E/hD:|.~3P^3-S[]KUtkJzBLt$-r_zRyF5J<IkIlCZ<tFv',
  algorithm: 'HS256',
  issuer: 'localhost',
  audience: 'localhost'

};

/**
 * Triggers when user authenticates via local strategy
 */
function _onLocalStrategyAuth(email, password, next) {

  User.findOne({email: email}).exec(function (error, user) {

    if (error) {
      return next(error, false, {});
    }

    if (!user) {
      return next(null, false, {
        code: 'E_USER_NOT_FOUND',
        message: 'User `' + email + '` not found'
      });
    }

    if (!CipherService.comparePassword(password, user)) {
      return next(null, false, {
        code: 'E_WRONG_PASSWORD',
        message: 'Password is wrong'
      });
    }

    return next(null, user, {});

  });

}

/**
 * Triggers when user authenticates via JWT strategy
 */
function _onJwtStrategyAuth(payload, next) {
  var userID = payload.userID;
  return next(null, userID, {});
}

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: false
}, _onLocalStrategyAuth));

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: module.exports.jwt.secret,
  issuer: module.exports.jwt.issuer,
  audience: module.exports.jwt.audience,
  passReqToCallback: false
}, _onJwtStrategyAuth));
