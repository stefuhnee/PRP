'use strict';

module.exports = function(app) {
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
        cb();
      }, ErrorService.logError('Error on admin'));
    };
    return service;
  });
};
