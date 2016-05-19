/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var randomString = require('randomstring');

module.exports.bootstrap = function(cb) {

  User.findOne({ status: 'admin' }).exec(function (err, user) {

    if (!err && user) {
      sails.log.debug('At least one user with status "admin" exists.');
      return;
    }

    sails.log.warn('No user with status "admin" exists.');

    var email = 'admin@beispiel.de'
      , password = randomString.generate(12);

    User.create({
      email:    email,
      password: password,
      status:   'admin',
      active:   true
    }).exec(function (err, user) {

      if( err ) {
        sails.log.error('Error creating default admin user.');
        sails.log.error(err);
      } else {
        sails.log.warn('Default admin user created.');
        sails.log.warn('Email:    ' + user.email);
        sails.log.warn('Password: ' + password + "\n");
        sails.log.warn('Please change email and password of this admin asap!');
      }

    });

  });

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();

};
