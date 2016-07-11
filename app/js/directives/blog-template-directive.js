'use strict';

module.exports = function(app) {
  app.directive('blogTemplateDirective', function() {
    return {
      scope: {
        entry: '='
      },
      templateUrl: './views/templates/blog-template.html'
    };
  });
};
