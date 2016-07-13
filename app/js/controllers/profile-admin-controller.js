'use strict';

module.exports = function(app) {
  app.controller('ProfileAdminController', ['$http', '$location', 'AuthService', 'AdminService', 'ErrorService', function($http, $location, AuthService, AdminService, ErrorService) {
    this.$http = $http;
    this.$location = $location;

    this.user = {};
    this.test = 'test';

    this.getAdmin = function(user) {
      AdminService.getAdmin(() => {
        this.user = AdminService.user;
        console.log(this.user);
      });
    };

    this.updateProfile = function(user) {
      return $http({
        method: 'PUT',
        data: user,
        headers: {
          token: AuthService.getToken()
        },
        url: 'http://localhost:8080/admin'
      })
      .then(() => {
        console.log('got here');
      }),
        ErrorService.logError('Error in updating profile');
    };
  }]);
};
