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

    
  });
});
