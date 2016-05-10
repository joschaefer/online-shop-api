/**
 * ImageController
 *
 * @description :: Server-side logic for managing Images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var gm = require('gm');
var uuid = require('uuid');

module.exports = {

  create: function (req, res) {

    req.file('image').upload({
      maxBytes: 10000000,
      dirname: '../../uploads',
      saveAs: function (file, cb) {

        var ending;

        switch (file.headers['content-type']) {

          case 'image/jpeg':
            ending = 'jpg';
            break;
          case 'image/png':
            ending = 'png';
            break;
          case 'image/gif':
            ending = 'gif';
            break;
          default:
            ending = 'jpg';

        }

        var filename = uuid.v4() + '.' + ending;
        cb(null, filename);

      }
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

      var file = _.object(['name', 'ending', 'path'], splitFilePath(upload.fd))
        , filenameThumb    = buildFilename(file, 'thumb')
        , filenameMedium   = buildFilename(file, 'medium')
        , filenameLarge    = buildFilename(file, 'large')
        , filenameOriginal = buildFilename(file);

      Image.create({
        original: buildFileAddress(file)
      }).exec(function (err, image) {

        if (err) return res.serverError(err);

        // Generate thumbnail
        gm(filenameOriginal).resize(600, 450, '^').gravity('center').crop(600, 450).write(filenameThumb, function (err) {

          if (err) return res.serverError(err);

          Image.update(image.id, {
            thumb: buildFileAddress(file, 'thumb')
          }).exec(function (err) {
            if (err) return res.serverError(err);
          });

        });

        // Generate medium version
        gm(filenameOriginal).resize(800, 600).write(filenameMedium, function (err) {

          if (err) return res.serverError(err);

          gm(filenameMedium).size(function (err, size) {

            if (err) return res.serverError(err);

            Image.update(image.id, {
              width: size.width,
              height: size.height,
              medium: buildFileAddress(file, 'medium')
            }).exec(function (err) {
              if (err) return res.serverError(err);
            });

          });

        });

        // Generate large version
        gm(filenameOriginal).resize(1600, 1200).write(filenameLarge, function (err) {

          if (err) return res.serverError(err);

          Image.update(image.id, {
            large: buildFileAddress(file, 'large')
          }).exec(function (err) {
            if (err) return res.serverError(err);
          });

        });

        return res.created(image);

      });

    });

  }

};

function buildFileAddress(file, insertion) {

  var address = sails.getBaseurl() + '/uploads/' + file.name;

  if (insertion) {
    address += '-' + insertion;
  }

  address += '.' + file.ending;
  return address;

}

function buildFilename(file, insertion) {

  var filename = file.path + '/' + file.name;

  if (insertion) {
    filename += '-' + insertion;
  }

  filename += '.' + file.ending;
  return filename;

}

function splitFilePath(fullFilename) {
  var path = splitLast(fullFilename, '/');
  var result = splitLast(path[1], '.');
  result.push(path[0]);
  return result;
}

function splitLast(string, separator) {
  var parts = string.split(separator);
  var last = parts.pop();
  var first = parts.join(separator);
  return [first, last];
}
