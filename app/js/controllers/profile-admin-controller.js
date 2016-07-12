'use strict';

module.exports = function(app) {
  app.controller('ProfileAdminController', ['$http', '$location', 'AuthService', 'EntryService', function($http, $location, AuthService, EntryService) {

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
