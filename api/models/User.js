/**
 * User
 *
 * @description :: This represents a user of the online shop. A user can be a customer viewing products, an employee managing products or an administrator setting things up.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {

  schema: true,
  autoCreatedAt: true,
  autoUpdatedAt: true,

  attributes: {

    email: {
      type: 'email',
      required: true,
      unique: true
    },

    password: {
      type: 'string',
      required: true
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

    // Never output the (hashed) password
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }

  },

  beforeUpdate: function (values, next) {

    // Prevent user from overriding these attributes
    delete values.status;
    delete values.createdAt;
    delete values.updatedAt;

    CipherService.hashPassword(values);

    next();

  },

  beforeCreate: function (values, next) {

    // Prevent user from predefining these attributes
    delete values.createdAt;
    delete values.updatedAt;

    CipherService.hashPassword(values);

    next();

  }

};
