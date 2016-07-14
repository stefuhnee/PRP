'use strict';

const angular = require('angular');
require('angular-mocks');
require('../../app/js/client.js');

describe('Controller Tests', () => {

  describe('blogController Test', () => {
    let bc;
    let $httpBackend;

    beforeEach(() => {
      angular.mock.module('BucketListApp');
      angular.mock.inject(function($controller, _$httpBackend_) {
        bc = new $controller('blogController');
        $httpBackend = _$httpBackend_;
      });
    });

    afterEach(() => {
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.verifyNoOutstandingExpectation();
    });

    it('should have entries array', () => {
      expect(Array.isArray(bc.entries)).toBe(true);
    });

    // it('should allow a user to sign up', () => {
    //   $httpBackend.expectGET('http://localhost:8080/signup')
    //     .respond(200, {data: [{body: 'test user'}]});
    //
    //   bc.signUp();
    //   console.log('tag', ac.newUser);
    //   $httpBackend.flush();
    //
    //   expect(ac.newUser.body).toBe('test user');
  });
});
