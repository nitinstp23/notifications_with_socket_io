// Require dependencies
var app        = require('express')();
var http       = require('http').Server(app);
var io         = require('socket.io')(http);
var morgan     = require('morgan');
var port       = 3000;
var secret     = 'very_secret_token';
var sticky     = require('sticky-session');
var bodyParser = require('body-parser');
var utility    = require('./lib/utility');
var News       = require('./lib/news');

// Configure express middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure socket.io middleware for authorization
io.use(utility.authorizeSocketClient);


// Routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/broadcast', function(req, res) {
  if (secret !== req.headers['x-access-token'])
    res.status(401).json({ error: 'Invalid x-access-token' });

  var news = new News(req.body);

  if (news.validate()) {
    io.emit('news', news.toJson());
    return res.sendStatus(200);
  } else {
    return res.status(500).json({ error: news.errors });
  }
});


// Socket.io event wiring
io.on('connection', function (socket) {
  console.log("Connected!");
  socket.emit('news', { username: 'nitin', message: 'Coming soon...' });
});


// Start server
sticky(http).listen(port, function() {
  console.log('Server listening at port %d', port);
});
