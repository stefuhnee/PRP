'use strict';

module.exports = function(app) {
  app.factory('ErrorService', function($location, $window) {
    const service = {};
    const errors = [];

    service.logError = function(message) {
      return function(err) {
        errors.push(message);
        console.log(err);
        $location.url('/');
        $window.alert('Please log in to continue');
      };
    };

    service.getErrors = function() {
      return errors;
    };

    return service;
  });
};
