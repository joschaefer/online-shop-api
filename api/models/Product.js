/**
 * Product.js
 *
 * @description :: This represents a product with a characteristic title and product number, an image and a category. A product can be active (= visible to customers) or not.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    title: {
      type: 'string',
      required: true
    },

    number: {
      type: 'string',
      required: true,
      unique: true
    },

    image: {
      model: 'image',
      required: true
    },

    category: {
      model: 'category',
      required: true
    },

    active: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    }

  },

  beforeUpdate: function (values, next) {

    // Prevent user from overriding these attributes
    delete values.createdAt;
    delete values.updatedAt;

    next();

  }

};
