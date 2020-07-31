import Koa from 'koa';

const app = new Koa();
const PORT = 8089;

app.use(async ctx => {
  switch (ctx.path) {
    case '/api':
      await handleApi(ctx);
      break;
    default:
      break;
  }
});

/**
 *
 * @param ctx {Koa.Context}
 */
async function handleApi(ctx) {
  ctx.body = 'hello';
}

app.listen(PORT, () => {
  console.log(`server start at ${PORT}`);
});
