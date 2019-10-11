import { Request, RequestHandler } from 'express';
import * as fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { HelmetData } from 'react-helmet';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import paths from 'react-scripts/config/paths';
import App from '../App';
import { configureStore } from '../redux/store';

const html = fs.readFileSync(
  `${paths.appBuild}/index.html`,
  {
    encoding: 'utf8',
  },
);

const helmetContext: {
  helmet?: HelmetData;
} = {};

const renderRequest = async (request: Request): Promise<string> => {
  const store = await configureStore({});

  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={request.baseUrl}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </Provider>,
  );
};

const wrapHtml = (renderedPage: string): string => html.replace('<div id="root"></div>', `<div id="root">${renderedPage}</div>`);

const injectHelmet = (payload: string): string => {
  const { helmet } = helmetContext;

  return helmet ? payload.replace('<title></title>', (helmet.title.toString() + helmet.meta.toString())) : payload;
};

const renderer: RequestHandler = async (request, response): Promise<void> => {
  response.header('Content-Type', 'text/html; charset=utf-8');

  const renderedRequest = await renderRequest(request);
  const fullHtmlBody = injectHelmet(wrapHtml(renderedRequest));

  response.send(fullHtmlBody);
};


export default renderer;
