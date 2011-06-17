
/**
 * Module dependencies.
 */
var cfn = require('./crawlie/db_fn');
var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'TPS [Transactions Per Second]'
  });
});

app.get('/test', function(req, res){

var D = new Date(),
d = cfn.dayofyear(D),
t = cfn.minofday(D),
city =  req.params.city;
if(!city || city == undefined) { var city = 'London'; }

  res.render('test', {
    title: '[Transactions Per Second] : ' +d +' > ' +t,
    city: city
  });

});

app.get('/uk/:city', function(req, res){
	
var D = new Date(),
d = cfn.dayofyear(D),
t = cfn.minofday(D),
city =  req.params.city;
citylist = { '0':'London', '1':'Manchester', '2':'Leeds', '3':'Oxford', '4':'Edinburgh' };
  res.render('test', {
    title: city,
    city: city,
	citylist: citylist
  });

});



app.listen(80);
console.log("Express server listening on port %d", app.address().port);