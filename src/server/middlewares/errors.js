exports.init = app => app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    ctx.set('X-Content-Type-Options', 'nosniff');
    const preferredType = ctx.accepts('html', 'json');

    if (e.status) {
      ctx.status = e.status;
      ctx.body = preferredType === 'json' ? {error: e.message} : {fail: e.message};
      return;
    }

    if (e.name === 'ValidationError') {
      ctx.status = 400;

      const errors = Object.keys(e.errors).reduce((resultHash, current) => {
        resultHash[current] = e.errors[current].message
      }, {});

      ctx.body = preferredType === 'json' ? {errors} : {fail:"Incorrect data."};
      return;
    }

    ctx.body = {fail: "Error 500"};
    ctx.status = 500;
  }
});
