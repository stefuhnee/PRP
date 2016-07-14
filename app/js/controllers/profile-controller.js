'use strict';

module.exports = function(app) {
  app.controller('ProfileController', ['$http', '$location', 'ProfileService', 'ErrorService', function($http, $location, ProfileService, ErrorService) {
    this.$http = $http;
    this.$location = $location;

    this.profile = {};

    this.getProfile = function(url) {
      ProfileService.getProfile(url, () => {
        this.profile = ProfileService.profile;
        console.log(this.profile, 'this.profile');
      });
    };

  }]);
};
