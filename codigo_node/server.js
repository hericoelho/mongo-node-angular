const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/usersRoutes');
const solicitationsRoutes = require('./routes/solicitationsRoutes');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('./config/database'); //database configuration
var jwt = require('jsonwebtoken');
const app = express();
var cors = require('cors')

app.use(cors())

app.use(express.json());

app.set('secretKey', 'nodeRestApi'); // jwt secret token

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.json({ "teste": "Backend node+mongo+jwt" });
});

// public route
app.use('/api/users', authRoutes);

// private route
app.use('/api/users', validateUser, usersRoutes);
app.use('/api/solicitations', validateUser, solicitationsRoutes);

app.get('/favicon.ico', function (req, res) {
  res.sendStatus(204);
});

function validateUser(req, res, next) {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  jwt.verify(token, req.app.get('secretKey'), function (err, decoded) {
    if (err) {
      res.status(401).json({ status: "error", message: err.message, data: null });
    } else {
      // add user id to request      
      req.body.userId = decoded.id;
      next();
    }
  });

}
// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// handle errors
app.use(function (err, req, res, next) {
  console.log(err);

  if (err.status === 404)
    res.status(404).json({ message: "Não encontrado" });
  else
    res.status(500).json({ message: "Algo não ocrreu como deveria :( !!!" });
});


app.listen(3000, function () {
  console.log('Node server listening on port 3000');
});