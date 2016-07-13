'use strict';

module.exports = function(app) {
  app.controller('BlogController', ['$http', '$location', 'AuthService', 'EntryService', 'ErrorService', function($http, $location, AuthService, EntryService, ErrorService) {
    this.entries = [];
    this.editing = false;
    this.$http = $http;
    this.$location = $location;
    this.modalShown = false;

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
      }, ErrorService.logError('Error on Sign Up', () => {
        this.modalShown = true;
      }));
    }.bind(this);

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
          this.entries = this.entries.map ((e) => {
            return e._id === entry._id ? entry : e;
          });
        }, ErrorService.logError('Error on Sign Up', () => {
          this.modalShown = true;
        }));
    }.bind(this);
  }]);
};
