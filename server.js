// Require dependencies
var app        = require('express')();
var http       = require('http').Server(app);
var io         = require('socket.io')(http);
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var port       = 3000;
var secret     = 'very_secret_token';

// Log requests to the console
app.use(morgan('dev'));

// Configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware for authorization
io.use(function(socket, next) {
  var handshakeData = socket.request;

  if (handshakeData._query['foo'] !== 'bar') {
    console.log('Unauthorized');
    console.log('Invalid secret: ' + handshakeData._query['foo']);
    return next(new Error('not authorized'));
  }
  next();
});

// GET index
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// POST broadcast_news
app.post('/broadcast', function(req, res) {
  if (secret !== req.headers['x-access-token'])
    return res.sendStatus(401);

  io.emit('news', {username: req.body.username, message: req.body.news});
  res.sendStatus(200);
});

// Socket.io event handler
io.on('connection', function (socket) {
  console.log("Connected!");
  socket.emit('news', { username: 'nitin', message: 'Coming soon...' });
});

http.listen(port, function() {
  console.log('Listening on *:' + port);
});
