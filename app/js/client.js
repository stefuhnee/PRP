'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');
const app = angular.module('BucketListApp', [ngRoute]);

require('./controllers')(app);
require('./directives')(app);
require('./services')(app);

app.config(function($routeProvider){
  $routeProvider.when('/',{

  })
  .when('/blog-admin', {
    templateUrl: './views/partials/blog-admin.html',
    controller: '',
    controllerAS: ''
  })
  .when('/blog', {
    templateUrl: './views/partials/blog.html',
    controller: '',
    controllerAS: ''
  })
  .when('/login', {
    templateUrl: './views/partials/login.html',
    controller: '',
    controllerAS: ''
  })
  .when('/profile-admin', {
    templateUrl: './views/partials/profile-admin.html',
    controller: '',
    controllerAS: ''
  })
  .when('/profile', {
    templateUrl: './views/partials/profile.html',
    controller: '',
    controllerAS: ''
  })
  .when('/signup', {
    templateUrl: './views/partials/signup.html',
    controller: '',
    controllerAS: ''
  });
});
