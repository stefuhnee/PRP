'use strict';

module.exports = function(app) {
  app.controller('ProfileController', ['$http', '$location', '$window', 'ProfileService', 'ErrorService', function($http, $location, $window, ProfileService, ErrorService) {
    this.$http = $http;
    this.$location = $location;
    this.login = $window.localStorage.token;

    this.profile = {};

    this.getProfile = function(url) {
      ProfileService.getProfile(url, () => {
        this.profile = ProfileService.profile;
        console.log(this.profile, 'this.profile');
        console.log(this.login, 'this.login');
      });
    };

    this.test = function() {
      console.log(this.login);
      console.log(this);
      console.log(typeof this.login);
    };

  }]);
};
