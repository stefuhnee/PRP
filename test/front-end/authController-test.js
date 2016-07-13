'use strict';

const angular = require('angular');
require('angular-mocks');
require('../../app/js/client.js');

describe('Controller Tests', () => {

  it('should run a test', () => {
    expect(true).toBe(true);
  });
});

describe('AuthController Test', () => {
  let ac;
  let $httpBackend;

  beforeEach(() => {
    angular.mock.module('BucketListApp');
    angular.mock.inject(function($controller, _$httpBackend_) {
      ac = new $controller('AuthController');
      $httpBackend = _$httpBackend_;
    });
  });

  afterEach(() => {
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should allow a user to sign up', () => {
    $httpBackend.expectPOST('http://localhost:8080/signup')
      .respond(200, {data: [{body: 'test user'}]});

    ac.signUp();
    console.log('tag', ac.newUser);
    $httpBackend.flush();

    expect(ac.newUser.body).toBe('test user');
  });

  // it('should allow a user to log in', () => {
  //   $httpBackend.expectGET('http://localhost:8080/login')
  //     .respond(200, {data: [{body: 'test user'}]});
  //
  //   ac.logIn();
  //   $httpBackend.flush();
  //
  //   expect()
  // });
});
