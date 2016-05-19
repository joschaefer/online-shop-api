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
      type: 'string'
    },

    medium: {
      type: 'string'
    },

    large: {
      type: 'string'
    },

    original: {
      type: 'string',
      required: true
    },

    toJSON: function() {

      var obj = this.toObject()
        , baseUrl = sails.config.app.baseUrl;

      if (obj.thumb) {
        obj.thumb = baseUrl + obj.thumb;
      }

      if (obj.medium) {
        obj.medium = baseUrl + obj.medium;
      }

      if (obj.large) {
        obj.large = baseUrl + obj.large;
      }

      obj.original = baseUrl + obj.original;

      return obj;

    }

  }

};
