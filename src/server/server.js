const Koa = require('koa');

const app = new Koa();

require("./middlewares")(app);
require("./routes")(app);

const port = process.env.PORT || 8080;

app.listen(port);
console.log(`Listen on ${port} port`);