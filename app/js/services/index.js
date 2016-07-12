'use strict';

module.exports = function(app) {
  require('./auth-service')(app);
  require('./entry-service')(app);
  require('./error-service')(app);
};
