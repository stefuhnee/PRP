'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');

const app = angular.module('BucketListApp', [ngRoute]);

require('./controllers')(app);
require('./directives')(app);
require('./services')(app);

app.config(function($provide, $httpProvider, $routeProvider){
  $provide.factory('ErrorInterceptor', function ($q) {
    return {
      responseError: function(rejection) {
        console.log('reject', rejection);
        return $q.reject(rejection);
      }
    };
  });

  $httpProvider.interceptors.push('ErrorInterceptor');
  $routeProvider
  .when('/', {
    templateUrl: './views/partials/home.html'
  })
  .when('/blog',{
    templateUrl: './views/partials/blog.html',
    controller: 'BlogController',
    controllerAs: 'bc'
  })
  .when('/blog-admin', {
    templateUrl: './views/partials/blog-admin.html',
    controller: 'BlogAdminController',
    controllerAs: 'bac'
  })
  .when('/login', {
    templateUrl: './views/partials/login.html',
    controller: 'AuthController',
    controllerAs: 'ac'
  })
  .when('/profile-admin', {
    templateUrl: './views/partials/profile-admin.html',
    controller: 'ProfileAdminController',
    controllerAs: 'pac'
  })
  .when('/profile', {
    templateUrl: './views/partials/profile.html',
    controller: 'ProfileController',
    controllerAs: 'pc'
  })
  .when('/signup', {
    templateUrl: './views/partials/signup.html',
    controller: 'AuthController',
    controllerAs: 'ac'
  });
});
