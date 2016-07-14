'use strict';


module.exports = function(app) {

  // const URL = process.env.URL || 'http://localhost:8080';

  app.controller('ProfileAdminController', ['$http', '$location', '$window', 'AuthService', 'AdminService', 'ErrorService', function($http, $location, $window, AuthService, AdminService, ErrorService) {
    this.$http = $http;
    this.$location = $location;

    this.admin = {};

    this.getAdmin = function() {
      AdminService.getAdmin(() => {
        this.admin = AdminService.admin;
        console.log('controller admin', this.admin);
      });
    };

    this.updateProfile = function(user) {
      return $http({
        method: 'PUT',
        data: user,
        headers: {
          token: AuthService.getToken()
        },
        url: '/admin'
      })
      .then(() => {
        console.log('got here');
      }),
        ErrorService.logError('Error in updating profile');
    };
  }]);
};
