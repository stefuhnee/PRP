'use strict';

module.exports = function(app) {
  app.directive('blogFullViewDirective', function() {
    return {
      scope: {
        entry: '='
      },
      templateUrl: './views/templates/blog-full-view-template.html',
      require: '^ngController',
      link: function($scope, elem, attr, controller) {
        $scope.delete = controller.deleteEntry;
        $scope.update = controller.updateEntry;
      }
    };
  });
};
