/**
 * Image.js
 *
 * @description :: This represents a product image with file paths for different variations (original, thumb, ...).
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var cloudinary = require('cloudinary');

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

    filename: {
      type: 'string',
      required: true
    },

    toJSON: function() {

      var obj = this.toObject();

      obj.thumb    = cloudinary.url(obj.filename, { secure: true, width: 600,  height: 450, crop: 'thumb', gravity: 'center' });
      obj.medium   = cloudinary.url(obj.filename, { secure: true, width: 800,  height: 600  });
      obj.large    = cloudinary.url(obj.filename, { secure: true, width: 1600, height: 1200 });
      obj.original = cloudinary.url(obj.filename, { secure: true });

      delete obj.filename;

      return obj;

    }

  },

  beforeUpdate: function (values, next) {

    if (values.thumb && values.thumb.indexOf('http') === 0) {
      delete values.thumb;
    }

    if (values.medium && values.medium.indexOf('http') === 0) {
      delete values.medium;
    }

    if (values.large && values.large.indexOf('http') === 0) {
      delete values.large;
    }

    // Prevent user from overriding these attributes
    delete values.original;
    delete values.createdAt;
    delete values.updatedAt;

    next();

  }

};
