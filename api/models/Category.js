/**
 * Category.js
 *
 * @description :: This represents a category for products.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    title: {
      type: 'string',
      required: true,
      unique: true
    },

    products: {
      collection: 'product',
      via: 'category'
    }

  }

};
