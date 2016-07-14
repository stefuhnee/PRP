'use strict';

module.exports = function(app) {
  app.controller('ProfileController', ['$http', '$location', 'AdminService', 'ErrorService', function($http, $location, AdminService, ErrorService) {
    this.$http = $http;
    this.$location = $location;

    this.user = {};

    this.getUser = function(user) {
      AdminService.getAdmin(() => {
        this.user = AdminService.admin;
      });
    };
  });
};
