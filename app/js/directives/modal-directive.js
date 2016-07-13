'use strict';

module.exports = function(app) {
  app.directive('modalDirective', function() {
    return {
      scope: {
        show: '='
      },
      replace: true, // Replace with the template below
      transclude: true, // we want to insert custom content inside the directive
      link: function(scope, element, attrs) {
        scope.directiveStyle = {};
        if (attrs.width)
          scope.directiveStyle.width = attrs.width;
        if (attrs.height)
          scope.directiveStyle.height = attrs.height;
        scope.hideModal = function() {
          scope.show = false;
        };
      },
      template: '...' // See below
    };
  });
};
