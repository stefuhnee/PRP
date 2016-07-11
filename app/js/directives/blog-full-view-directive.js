'use strict';

module.exports = function(app) {
  app.directive('blogViewDirective', function() {
    return {
      scope: {
        entry: '='
      },
      templateUrl: './views/templates/blog-view-template.html'
    };
  });
};
