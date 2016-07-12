'use strict';

module.exports = function(app) {
  app.controller('BlogController', ['$http', '$location', 'AuthService', 'EntryService', function($http, $location, AuthService, EntryService) {
    this.entries = [];
    this.$http = $http;
    this.$location = $location;

    this.populate = function() {
      EntryService.getEntries(() => {
        this.entries = EntryService.entries;
      });
    };

    this.deleteEntry = function(entry) {
      $http({
        method: 'DELETE',
        headers: {
          token: AuthService.getToken()
        },
        url: `http://localhost:8080/blog/${entry._id}`
      })
      .then(() => {
        EntryService.getEntries(() => {
          this.entries = EntryService.entries;
        });
      });
    }, (err) => {
      $location.url('/login');
      console.log(err);
    };

    this.updateEntry = function(entry) {
      $http({
        method: 'PUT',
        data: entry,
        headers: {
          token: AuthService.getToken()
        },
        url: 'http://localhost:8080/blog'
      })
        .then(() => {
          EntryService.entries = EntryService.entries.map (e => {
            return e._id === this.entry._id ? this.entry : e;
          });
          EntryService.getEntries(() => {
            this.entries = EntryService.entries;
          });
        }, (err) => {
          $location.url('/login');
          console.log(err);
        });
    };
  }]);
};
