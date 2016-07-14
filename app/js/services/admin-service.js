'use strict';

module.exports = function(app) {

  // const URL = process.env.URL || 'http://localhost:8080';

  app.factory('AdminService', function($http, $window, AuthService, ErrorService) {
    const service = {};
    service.admin = {};

    service.getAdmin = function(cb) {
      return $http({
        method: 'GET',
        headers: {
          admin: $window.localStorage.username,
          token: AuthService.getToken()
        },
        url: '/admin'
      })
      .then((res) => {
        service.admin = res.data;
        console.log(service.admin, 'admin in service');
        cb();
      }, ErrorService.logError('Error on admin'));
    };
    return service;
  });
};
