'use strict';

module.exports = function(app) {
  require('./blog-full-view-directive')(app);
  require('./blog-list-directive')(app);
  require('./blog-template-directive')(app);
};
