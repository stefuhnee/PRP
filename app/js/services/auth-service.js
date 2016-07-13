'use strict';

module.exports = function(app) {

  app.factory('AuthService', function($http, $window) {
    let token = $window.localStorage.token;
    let username = $window.localStorage.username;
    const service = {};


    service.signUp = function(user) {
      return $http.post('http://localhost:8080/signup', user)
      .then((res)=> {
        token = res.data.token;
        $window.localStorage.token = token;
        $window.localStorage.username = user.username;
      });
    };

    service.logIn = function(user) {
      let base64Auth = btoa(user.username + ':' + user.password);
      let authString = 'Basic ' + base64Auth;

      return $http({
        url: 'http://localhost:8080/login',
        method: 'GET',
        headers: {
          authorization: authString
        }
      }).then((res)=> {
        token = res.data.token;
        $window.localStorage.token = token;
        $window.localStorage.username = user.username;

        return res;
      });
    };

    service.signOut = function() {
      token = $window.localStorage.token = null;
      user = $window.localStorage.username = null;
    };

    service.getToken = function() {
      return token;
    };

    return service;
  });
};
