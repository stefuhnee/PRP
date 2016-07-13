'use strict';
const angular = require('angular');
require('angular-mocks');
require('../../app/js/client');

const blogListTemplate = require('../../app/views/templates/blog-list-template.html');
const blogFullTemplate = require('../../app/views/templates/blog-full-view-template.html');
const blogTemplate = require('../../app/views/templates/blog-template.html');

describe('directive test', () => {
  let $httpBackend;
  let $scope;
  let $compile;

  beforeEach(() => {
    angular.mock.module('BucketListApp');
    angular.mock.inject(function(_$httpBackend_, $rootScope, _$compile_) {
      $scope = $rootScope.$new();
      $compile = _$compile_;
      $httpBackend = _$httpBackend_;
    });
  });

  it('should test a blog list', () => {
    $httpBackend.expectGET('./views/templates/blog-list-template.html')
      .respond(200, blogListTemplate);

    $scope.entry = 'test data';
    let element = angular.element('<blog-list-directive entry="entry"></blog-list-directive>');
    let link = $compile(element);
    let directive = link($scope);
    $scope.$digest();
    $httpBackend.flush();

    let li = directive.find('li');

    expect(li);
  });
});
