'use strict';

module.exports = function(app) {
  app.directive('blogListDirective', function() {
    return {
      scope: {
        entry: '='
      },
      templateUrl: './views/templates/blog-list-template.html'
    };
  });
};
