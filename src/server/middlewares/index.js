module.exports = function (app) {
  require('./static').init(app);
  if (process.env.NODE_ENV === 'development') {
    require('./logger').init(app);
  }
  require('./errors').init(app);
};