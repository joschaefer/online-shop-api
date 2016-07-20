/**
 * ImageController
 *
 * @description :: Server-side logic for managing Images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var cloudinary = require('cloudinary');

module.exports = {

  create: function (req, res) {

    req.file('image').upload({
      maxBytes: 10000000
    }, function whenDone(err, uploads) {

      if (err) {
        return res.serverError(err);
      }

      // If no files were uploaded, respond with an error
      if (uploads.length === 0) {
        return res.badRequest('No file was uploaded');
      }

      // Only consider one file per POST request
      var upload = uploads[0];

      // Upload image via Cloudinary
      cloudinary.uploader.upload(upload.fd, function(result) {

        sails.log.info(result);

        Image.create({
          filename: result.public_id,
          height:   result.height,
          width:    result.width
        }).exec(function (err, image) {
          if (err) return res.serverError(err);
          return res.created(image);
        });

      });

    });

  }

};
