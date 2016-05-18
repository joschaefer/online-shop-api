var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports = {

  /**
   * Hash the password field of the passed user.
   */
  hashPassword: function (user) {
    if (user.password) {
      user.password = bcrypt.hashSync(user.password);
    }
  },

  /**
   * Compare user password hash with unhashed password
   * @returns boolean indicating a match
   */
  comparePassword: function (password, user) {
    return bcrypt.compareSync(password, user.password);
  },

  /**
   * Create a token based on the passed user
   * @param user
   */
  createToken: function (user) {

    return jwt.sign({
        userID: user.id
      },
      sails.config.jwt.secret,
      {
        algorithm: sails.config.jwt.algorithm,
        expiresIn: sails.config.jwt.expiresIn,
        issuer: sails.config.jwt.issuer,
        audience: sails.config.jwt.audience
      }
    );

  }

};
