'use strict';

module.exports = function(app) {
  app.controller('AuthController', function($location, AuthService) {
    this.goHome = function() {
      $location.url('/');
    };

    this.signOut = function() {
      AuthService.signOut()
      .then((res) => {
        console.log(res);
        $location.url('/');
      }), (err) => {
        console.log(err);
      };
    };

    this.signUp = function(user) {
      AuthService.signUp(user)
      .then((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });
    };

    this.logIn = function(user) {
      AuthService.logIn(user)
      .then((res) => {
        console.log(res, 'Sign in res');
      }, (err) => {
        console.log(err, 'failed sign in');
        $location.path('/signup');
      });
    };
  });
};
