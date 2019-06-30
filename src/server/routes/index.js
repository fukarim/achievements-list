const frontpage = require("./frontpage");

module.exports = app => {
  app.use(frontpage.routes());
};
