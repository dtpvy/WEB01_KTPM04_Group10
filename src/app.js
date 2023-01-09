require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ImageKit = require('imagekit');
const uuid = require('uuid');
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const bookingRouter = require('./routes/booking');
const accountRouter = require('./routes/account');
const supportRouter = require('./routes/support');
const garageRouter = require('./routes/garage');

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars.engine({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, './views/layouts'),
    partialsDir: path.join(__dirname, './views/components'),
    helpers: require(path.join(__dirname, './helpers/handlebars')),
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/booking', bookingRouter);
app.use('/register', registerRouter);
app.use('/account', accountRouter);
app.use('/garage', garageRouter);
app.use('/support', supportRouter);

app.get('/create_table', (req, res) => {
  const models = require('./models');
  models.sequelize.sync().then(() => {
    res.send('create table successfully');
  });
});

const imagekit = new ImageKit({
  publicKey: 'public_xTbc2crb6gXYxB5gtKroms4tWCU=',
  privateKey: 'private_Qr0rq1pwvFbopF819AptlFr6fX8=',
  urlEndpoint: 'https://ik.imagekit.io/0o9nfg6a3',
});

app.get('/auth', (req, res) => {
  try {
    const token = req.query.token || uuid.v4();
    const expiration = req.query.expire || parseInt(Date.now() / 1000) + 60 * 10; // Default expiration in 10 mins

    const signatureObj = imagekit.getAuthenticationParameters(token, expiration);

    res.status(200).send(signatureObj);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
