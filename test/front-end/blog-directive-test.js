'use strict';
const angular = require('angular');
require('angular-mocks');
require('../../app/js/client');

const blogListTemplate = require('../../app/views/templates/blog-list-template.html');
const blogFullTemplate = require('../../app/views/templates/blog-full-view-template.html');


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

  it('should test blog full template', () => {
    $httpBackend.expectGET('./views/templates/blog-full-view-template.html')
      .respond(200, blogFullTemplate);

    $scope.test = 'test data';
    $scope.dateCreated = 'test date';
    $scope.content = 'test content';
    let element = angular.element('<blog-full-view-directive title="test" dateCreated="test date" content="test content" ></blog-full-view-directive>');
    element.data('$ngController', {});
    let link = $compile(element);
    let directive = link($scope);
    $scope.$digest();
    $httpBackend.flush();

    let h1 = directive.find('h1');
    let h1Text = h1.text();
    let h2 = directive.find('h2');
    let h2Text = h2.text();
    let p = directive.find('p');
    let pText = p.text();

    expect(h1Text).toBe('test data');
    expect(h2Text).toBe('test date');
    expect(pText).toBe('test content');

  });
});
