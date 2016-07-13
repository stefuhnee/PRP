'use strict';

module.exports = function(app) {

  app.factory('AdminService', function($http, ErrorService) {
    const service = {};
    
    service.getAdmin = function(cb) {
      return $http.get('http://localhost:8080/admin')
      .then((res) => {
        service.user = res.data;
        cb();
      }, ErrorService.logError('Error on admin'));
    };

    return service;
  });
};
