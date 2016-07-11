'use strict';

module.exports = function(app) {
  require('auth-controller')(app);
  require('blog-admin-controller')(app);
  require('blog-controller')(app);
  require('profile-admin-controller')(app);
  require('profile-controller')(app);
};
