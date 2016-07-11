'use strict';

module.exports = function(app) {

  app.factory('EntryService', function($http) {
    const service = {};
    service.entries = [];

    service.getEntries = function() {
      return $http.get('http://localhost:3000/blog')
      .then((res) => {
        service.entries = res.data;
      }, (err) => {
        console.log(err);
      });
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
