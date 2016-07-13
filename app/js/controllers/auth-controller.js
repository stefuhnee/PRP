'use strict';

module.exports = function(app) {
  app.controller('AuthController', function($location, AuthService, ErrorService) {
    this.goHome = function() {
      $location.url('/');
    };

    this.signOut = function() {
      AuthService.signOut()
      .then((res) => {
        console.log(res);
        $location.url('/');
      }, ErrorService.logError('Error on Sign Out'));
    };

    this.signUp = function(user) {
      AuthService.signUp(user)
      .then((res) => {
        console.log(res);
      },ErrorService.logError('Error on Sign Up'));
    };

    this.logIn = function(user) {
      AuthService.logIn(user)
      .then((res) => {
        console.log(res, 'Sign in res');
      }, ErrorService.logError('Error on Sign OUt', () => {
        $location.url('/signup');
      }));
    };
  });
};
