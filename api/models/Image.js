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
      min: 0
    },

    height: {
      type: 'integer',
      min: 0
    },

    thumb: {
      type: 'string',
      url: true
    },

    medium: {
      type: 'string',
      url: true
    },

    large: {
      type: 'string',
      url: true
    },

    original: {
      type: 'string',
      required: true,
      url: true
    },

    toJSON: function() {

      var obj = this.toObject()
        , baseUrl = sails.config.app.baseUrl;

      obj.thumb    = baseUrl + obj.thumb;
      obj.medium   = baseUrl + obj.medium;
      obj.large    = baseUrl + obj.large;
      obj.original = baseUrl + obj.original;

      return obj;

    }

  }

};
