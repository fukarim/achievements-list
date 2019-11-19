module.exports = app => {
  app.use(require("./achievements").routes());
  app.use(require("./frontpage").routes());
};
