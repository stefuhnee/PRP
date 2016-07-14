module.exports = function(app) {
  app.directive('navDirective', function() {
    return {
      templateUrl: './views/templates/nav-template.html'
    };
  });
};
