'use strict';

module.exports = function(app) {
  app.controller('BlogAdminController', ['$http', 'AuthService', 'EntryService', function($http, AuthService, EntryService) {
    this.entries = [];
    this.$http = $http;

    function getDate() {
      let date = new Date();
      return (date.getMonth()+1) + ' ' + date.getDate() + ', ' + date.getFullYear();
    }

    this.addEntry = function(entry) {
      let date = getDate();
      entry.dateCreated = date;
      $http({
        method: 'POST',
        data: entry,
        headers: {
          token: AuthService.getToken()
        },
        url: 'http://localhost:3000/blog'
      })
      .then(EntryService.pushEntry(() => {
        this.entries = EntryService.entries;
      })), (err) => {
        console.log(err);
      };
    };
  }]);
};
