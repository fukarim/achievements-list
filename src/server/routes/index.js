const frontpage = require("./frontpage");
const achievements = require("./achievements");

module.exports = app => {
  app.use(achievements.routes());
  
  app.use(frontpage.routes());
};
