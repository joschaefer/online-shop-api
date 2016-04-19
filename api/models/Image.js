/**
 * Image.js
 *
 * @description :: This represents a product image with file paths for different variations (original, thumb, ...).
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    width: {
      type: 'integer',
      required: true,
      min: 0
    },

    height: {
      type: 'integer',
      required: true,
      min: 0
    },

    original: {
      type: 'string',
      required: true,
      url: true
    },

    thumb: {
      type: 'string',
      required: true,
      url: true
    }

  }

};
