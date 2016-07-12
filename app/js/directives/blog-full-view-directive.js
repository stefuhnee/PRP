'use strict';

module.exports = function(app) {
  app.directive('blogFullViewDirective', function() {
    return {
      scope: {
        entry: '='
      },
      templateUrl: './views/templates/blog-full-view-template.html'
    };
  });
};
