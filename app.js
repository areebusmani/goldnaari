
const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const api = require('./api');
require('dotenv').config();

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'landing')));
app.use('/dashboard', express.static(path.join(__dirname, 'dashboard/build')));
app.use('/api', api);

if (app.get('env') == 'development') {
  app.locals.pretty = true;
}

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/dashboard/build/index.html'));
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
