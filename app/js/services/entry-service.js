'use strict';

module.exports = function(app) {

  const URL = process.env.URL || 'http://localhost:8080';

  app.factory('EntryService', function($http, ErrorService) {
    const service = {};
    service.entries = [];

    service.getEntries = function(cb) {
      return $http.get(`${URL}/blog`)
      .then((res) => {
        service.entries = res.data;
        cb();
      }, ErrorService.logError('Error on Sign Up'));
    };

    service.pushEntry = function(cb) {
      return function(res) {
        let entry = res.data;
        service.entries.push(entry);
        cb();
      };
    };

    return service;
  });
};
