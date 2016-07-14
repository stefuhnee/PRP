'use strict';


module.exports = function(app) {

  const URL = process.env.URL || 'http://localhost:8080';

  app.controller('ProfileAdminController', ['$http', 'AuthService', 'AdminService', 'ErrorService', function($http, AuthService, AdminService, ErrorService) {
    this.$http = $http;

    this.admin = {};

    this.getAdmin = function(admin) {
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
        url: `${URL}/admin`
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
