'use strict';

module.exports = function(app) {
  app.directive('profileAdminDirective', function() {
    return {
      scope: {
        user: '='
      },
      templateUrl: './views/'
    };
  });
};
