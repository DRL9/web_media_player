import Koa from 'koa';
import * as fs from 'fs';
import koaStatic from 'koa-static';
import cors from '@koa/cors';
import mount from 'koa-mount';
import logger from 'koa-logger';

const app = new Koa();
app.use(cors());
app.use(logger());
const PORT = 8089;

const audioDir = '/home/yuanjun/Music/zard';

const staticApp = new Koa().use(koaStatic(audioDir));
const apiApp = new Koa().use(handleApi);
app.use(mount('/audios', staticApp));
app.use(mount('/api', apiApp));

/**
 *
 * @param ctx {Koa.Context}
 */
async function handleApi(ctx) {
  switch (ctx.path) {
    case '/list':
      const audioFileNames = (await fs.promises.readdir(audioDir)).filter(f => f.endsWith('mp3'));
      ctx.response.type = 'application/json';
      ctx.body = JSON.stringify(
        audioFileNames.map(file => ({
          title: file,
          src: ctx.request.protocol + '://' + ctx.host + '/audios/' + file,
        }))
      );
      break;
    default:
      break;
  }
}

app.listen(PORT, () => {
  console.log(`server start at ${PORT}`);
});
