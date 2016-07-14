'use strict';

module.exports = function(app) {
  app.controller('BlogAdminController', ['$http', '$location','AuthService', 'EntryService', 'ErrorService', function($http, $location, AuthService, EntryService, ErrorService) {
    this.entries = [];
    this.$http = $http;
    this.$location = $location;


    function getDate() {
      let date = new Date();
      return (date.getMonth()+1) + ' ' + date.getDate() + ', ' + date.getFullYear();
    }

    this.addEntry = function(entry) {

      let date = getDate();
      entry.dateCreated = date;

      return $http({
        method: 'POST',
        data: entry,
        headers: {
          token: AuthService.getToken()
        },
        url: '/blog/'
      })
      .then(EntryService.pushEntry(() => {
        this.entries = EntryService.entries;
      })
    ), ErrorService.logError('Error on Sign Up', () => {
      $location.url('/login');
    });
    };
  }]);
};
