/**
 * User.js
 *
 * @description :: This represents a user of the online shop. A user can be a customer viewing products, an employee managing products or an administrator setting things up.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    email: {
      type: 'string',
      required: true,
      unique: true,
      email: true
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
    }

  }

};

