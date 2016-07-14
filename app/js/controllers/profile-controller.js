'use strict';

module.exports = function(app) {
  app.controller('ProfileController', ['$http', '$location', 'ProfileService', function($http, $location, ProfileService) {
    this.$http = $http;
    this.$location = $location;

    this.profile = {};

    this.getProfile = function(url) {
      ProfileService.getProfile(url, () => {
        this.profile = ProfileService.profile;
      });
    };

  }]);
};
