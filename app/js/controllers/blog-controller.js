'use strict';

module.exports = function(app) {
  app.controller('BlogController', ['$scope', '$http', '$location', 'AuthService', 'EntryService', function($scope, $http, $location, AuthService, EntryService) {
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
        this.entries = this.entries.filter((e) => {
          return e._id !== entry._id;
        });
      }, (err) => {
        $location.url('/login');
        console.log(err);
      });
    }.bind(this);

    this.updateEntry = function(entry) {
      console.log('updating');
      $http({
        method: 'PUT',
        data: entry,
        headers: {
          token: AuthService.getToken()
        },
        url: 'http://localhost:8080/blog'
      })
        .then(() => {
          this.entries = this.entries.map (e => {
            return e._id === this.entry._id ? this.entry : e;
          });
        }, (err) => {
          $location.url('/login');
          console.log(err);
        });
    };
  }]);
};
