'use strict';

module.exports = function(app) {
  app.directive('blogTemplateDirective', function() {
    return {
      templateUrl: './views/templates/blog-template.html'
    };
  });
};
