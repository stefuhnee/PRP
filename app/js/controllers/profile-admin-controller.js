'use strict';


module.exports = function(app) {
  app.controller('ProfileAdminController', ['$http', 'AuthService', 'AdminService', 'ErrorService', function($http, AuthService, AdminService, ErrorService) {
    this.$http = $http;

    this.admin = {};

    this.getAdmin = function() {
      AdminService.getAdmin(() => {
        this.admin = AdminService.admin;
      });
    };

    this.updateProfile = function(updatedAdmin) {
      return $http({
        method: 'PUT',
        data: updatedAdmin,
        headers: {
          _id: this.admin._id,
          token: AuthService.getToken()
        },
        url: '/admin'
      })
      .then(() => {
        this.admin.avatar = updatedAdmin.avatar;
        this.admin.name = updatedAdmin.name;
        this.admin.description = updatedAdmin.description;
      }),
        ErrorService.logError('Error in updating profile');
    }.bind(this);
  }]);
};
