'use strict';

module.exports = function(app) {
  app.controller('BlogAdminController', ['$http', 'AuthService', 'EntryService', function($http, AuthService, EntryService) {
    this.entries = [];
    this.$http = $http;

    this.addEntry = function(entry) {
      $http({
        method: 'POST',
        data: entry,
        headers: {
          token: AuthService.getToken()
        },
        url: 'http://localhost:3000/entry'
      })
      .then(EntryService.pushEntry(() => {
        this.entries = EntryService.entries;
      })), (err) => {
        console.log(err);
      };
    };

  }]);
};
