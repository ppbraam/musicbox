import express from 'express';
import expressStaticGzip from 'express-static-gzip';
import paths from 'react-scripts/config/paths';
import defaultHeaders from './defaultHeaders';
import renderer from './renderer';
import compression from 'compression';

const httpServer = express();
const compress = compression();

httpServer.use(defaultHeaders);

/**
 * Serve static files
 */
httpServer.use(
  expressStaticGzip(paths.appBuild, {
    enableBrotli: true,
    index: false,
    orderPreference: ['br', 'gzip'],
    serveStatic: {
      maxAge: '31536001',
    },
  }),
);

/**
 * React renderer
 */
httpServer.get('/', compress, renderer);
httpServer.get('*', compress, renderer);


export default async (port: number): Promise<void> => {
  try {
    await httpServer.listen(port);

    console.log(`server listening on ${port}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
