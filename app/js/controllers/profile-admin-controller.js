'use strict';

module.exports = function(app) {
  app.controller('ProfileAdminController', ['$http', '$location', 'AuthService', function($http, $location, AuthService) {

    this.updateProfile = function(user) {
      return $http({
        method: 'PUT',
        data: user,
        headers: {
          token: AuthService.getToken()
        },
        url: 'http://localhost:8080/signup'
      });
    };

  }]);
};
