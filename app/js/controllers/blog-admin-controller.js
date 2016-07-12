'use strict';

module.exports = function(app) {
  app.controller('BlogAdminController', ['$http', '$location','AuthService', 'EntryService', function($http, $location, AuthService, EntryService) {
    this.entries = [];
    this.$http = $http;
    this.$location = $location;

    function getDate() {
      let date = new Date();
      return (date.getMonth()+1) + ' ' + date.getDate() + ', ' + date.getFullYear();
    }

    this.addEntry = function(entry) {
      console.log('addEntry');

      let date = getDate();

      entry.dateCreated = date;
      return $http({
        method: 'POST',
        data: entry,
        headers: {
          token: AuthService.getToken()
        },
        url: 'http://localhost:3000/blog/'
      })
      .then(EntryService.pushEntry(() => {
        console.log('pushEntry');
        this.entries = EntryService.entries;
      })
      ), (err) => {
        $location.url('/login');
        console.log(err);
      };
    };
  }]);
};
