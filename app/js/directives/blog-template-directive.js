'use strict';

module.exports = function(app) {
  app.directive('blogTemplateDirective', function() {
    return {
      templateUrl: './views/templates/blog-template.html',
      require: '^^ngController',
      link: function($scope, elem, attr, controller) {
        $scope.add = controller.addEntry;
      }
    };
  });
};
