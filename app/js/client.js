'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');
const app = angular.module('BucketListApp', [ngRoute]);

require('./controllers')(app);
require('./directives')(app);
require('./services')(app);

app.config(function($routeProvider){
  $routeProvider.when('/',{
    templateUrl: './views/partials/blog.html',
    controller: 'BlogController',
    controllerAS: 'bc'
  })
  .when('/blog-admin', {
    templateUrl: './views/partials/blog-admin.html',
    controller: 'BlogAdminController',
    controllerAS: 'bac'
  })
  .when('/login', {
    templateUrl: './views/partials/login.html',
    controller: 'AuthController',
    controllerAS: 'ac'
  })
  .when('/profile-admin', {
    templateUrl: './views/partials/profile-admin.html',
    controller: 'ProfileAdminController',
    controllerAS: 'pac'
  })
  .when('/profile', {
    templateUrl: './views/partials/profile.html',
    controller: 'ProfileController',
    controllerAS: 'pc'
  })
  .when('/signup', {
    templateUrl: './views/partials/signup.html',
    controller: 'AuthController',
    controllerAS: 'ac'
  });
});
