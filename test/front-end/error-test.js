'use strict';
const angular = require('angular');
require('angular-mocks');
require('../app/js/client');

describe('error service tests', function() {
  let errorService;
  beforeEach(() => {
    angular.mock.module('BucketListApp');
    angular.mock.inject(function(ErrorService){
      errorService = ErrorService;
    });
  });
  it('should have test getErrors', () => {
    expect(typeof errorService.getErrors).toBe('function');
  });
  it('should test logErorr', () => {
    expect(typeof errorService.logErorr).toBe('function');
  });
  it('should test errors', () => {
    expect(Array.isArray(errorService.getErrors())).toBe(true);
  });
});
