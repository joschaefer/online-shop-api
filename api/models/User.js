/**
 * User.js
 *
 * @description :: This represents a user of the online shop. A user can be a customer viewing products, an employee managing products or an administrator setting things up.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {

  // Force schema independently of app settings
  schema: true,

  attributes: {

    email: {
      type: 'email',
      required: true,
      unique: true
    },

    password: {
      type: 'string'
    },

    status: {
      type: 'string',
      enum: ['customer', 'employee', 'admin'],
      required: true,
      defaultsTo: 'customer'
    },

    active: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    },

    // Override toJSON instance method to remove password from output
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }

  },

  beforeCreate: function (values, next) {

    bcrypt.genSalt(sails.config.jwt.bcryptRounds, function (err, salt) {

      if (err) {
        return next(err);
      }

      bcrypt.hash(values.password, salt, function (err, hash) {

        if (err) {
          return next(err);
        }

        values.password = hash;
        next();

      });

    });

  },

  comparePassword: function (password, user, cb) {

    bcrypt.compare(password, user.password, function (err, match) {

      if (err) {
        cb(err);
      }

      if (match) {
        cb(null, true);
      } else {
        cb(err);
      }

    });

  }

};
