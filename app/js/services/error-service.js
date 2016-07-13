'use strict';

module.exports = function(app) {
  app.factory('ErrorService', function($location) {
    const service = {};
    const errors = [];

    service.logError = function(message, cb) {
      return function(err) {
        errors.push(message);
        console.log(err);
        cb();
        // $location.url('/login');
      };
    };

    service.getErrors = function() {
      return errors;
    };

    return service;
  });
};
