
import 'dotenv/config'

import express from 'express';
import { createServer } from 'http';
import path from 'path';
import parser from 'body-parser';
import logger from 'morgan';
import methodOverride from 'method-override';
import apiRouter from './api/index.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(parser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'landing')));
app.use('/dashboard', express.static(path.join(__dirname, 'dashboard/build')));
app.use('/api', apiRouter);

if (app.get('env') == 'development') {
  app.locals.pretty = true;
}

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (_, response) => {
  response.sendFile(path.join(__dirname+'/dashboard/build/index.html'));
});

createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
