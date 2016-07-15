'use strict';

const angular = require('angular');

require('angular-mocks');
require('../../app/js/client.js');

describe('Router Tests', () => {
  beforeEach(() => {
    angular.mock.module('BucketListApp');

  });

  it('should map routes to controllers', function() {
    angular.module('BucketListApp');
    angular.mock.inject(function($routeProvider) {

      expect($routeProvider.routes['/'].controller).toBe('AuthController');
      expect($routeProvider.routes['/'].templateUrl).toEqual('/views/partials/home.html');

      expect($routeProvider.routes['/blog'].controller).toBe('BlogController');
      expect($routeProvider.routes['/blog'].templateUrl).toEqual('/views/partials/blog.html');

      expect($routeProvider.routes['/blog-admin'].controller).toBe('BlogAdminController');
      expect($routeProvider.routes['/blog-admin'].templateUrl).toEqual('/views/partials/blog-admin.html');

      expect($routeProvider.routes['/profile'].controller).toBe('ProfileController');
      expect($routeProvider.routes['/profile'].templateUrl).toEqual('/views/partials/profile.html');

      expect($routeProvider.routes['/profile-admin'].controller).toBe('ProfileAdminController');
      expect($routeProvider.routes['/profile-admin'].templateUrl).toEqual('/views/partials/profile-admin.html');

      expect($routeProvider.routes[null].redirectTo).toEqual('/');
    });
  });
});
