'use strict';


module.exports = function(app) {
  app.controller('ProfileAdminController', ['$http', '$location', '$window', 'AuthService', 'AdminService', 'ErrorService', function($http, $location, $window, AuthService, AdminService, ErrorService) {
    this.$http = $http;
    this.$location = $location;

    this.admin = {};

    this.getAdmin = function(admin) {
      AdminService.getAdmin(() => {
        this.admin = AdminService.admin;
        console.log('admin on load', this.admin);
      });
    };

    this.updateProfile = function(updatedAdmin) {
      console.log('admin',updatedAdmin);
      return $http({
        method: 'PUT',
        data: updatedAdmin,
        headers: {
          _id: this.admin._id,
          token: AuthService.getToken()
        },
        url: 'http://localhost:8080/admin'
      })
      .then(() => {
        console.log('got here', updatedAdmin);
        this.admin.avatar = updatedAdmin.avatar;
        this.admin.name = updatedAdmin.name;
        this.admin.description = updatedAdmin.description;
      }),
        ErrorService.logError('Error in updating profile');
    }.bind(this);
  }]);
};
