'use strict';
const angular = require('angular');
require('angular-mocks');
require('../../app/js/client');

describe('entry service tests', function() {
  let entryService;
  beforeEach(() => {
    angular.mock.module('BucketListApp');
    angular.mock.inject(function(EntryService){
      entryService = EntryService;
    });
  });
  it('should have test getEntries', () => {
    expect(typeof entryService.getEntries).toBe('function');
  });
  it('should test pushEntry', () => {
    expect(typeof entryService.pushEntry).toBe('function');
  });
  it('should test entries', () => {
    expect(Array.isArray(entryService.getEntries())).toBe(false);
  });
});
