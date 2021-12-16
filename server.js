const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const folkapiRoute = require('./routes/folkapi/route');
const { env } = require('process');
const server = express();

server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use('/folkapi', folkapiRoute);

// catch 404 and forward to error handler
server.use(function(req, res, next) {
  next(createError(404));
});

server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send('error');
});

const port = process.env.PORT || 3000;
  
server.listen(port, () => {
  console.log(`listening on ${env.PORT}`)
})
module.exports = server;
