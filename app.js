const createError = require('http-errors');
const compression = require('compression')
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/loginRouter');
const adminRouter = require('./routes/adminRouter');

const app = express();

app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'agenciabdesign',
  resave: true,
  saveUninitialized: true
}))

app.use(logger('dev'));

// transforma os dados das requisições em objetos
app.use(express.json());

// transforma os dados das requisições em objetos não aninhados
app.use(express.urlencoded({ extended: false }));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter)
app.use('/users', usersRouter);
app.use('/admin', adminRouter);


// Página de Erro 404
app.use((req, res, next) => {
  res.status(404).render('not-found',{pageData: {css: 'index.css', title: 'Error 404'}});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
