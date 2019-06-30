const serve = require('koa-static');

exports.init = app => {
  const maxage = process.env.NODE_ENV === 'production' ? 3600000 : 0;

  app.use(serve("static", {maxage}));
  app.use(serve("public", {maxage}));
}
