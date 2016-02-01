'use strict';

var express = require('express');
var morgan = require ('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
//Redis returns a function, so you need to do the additional param to run the method properly
//simple no sql database
//really dumb, but great for small things

var RedisStore = require('connect-redis')(session);
var passport = require('passport');
//returns the strategy object so we can proceed with o auth
var GitHubStrategy = require('passport-github').Strategy;

var ghConfig = require('./secret/oauth-github.json');
ghConfig.callbackURL = 'http://localhost:8080/signin/github/callback';

var ghStrategy = new GitHubStrategy(ghConfig, 
	function(accessToken, refreshToken, profile, done) {
		console.log('Authentication Successful!');
		//will always be available through req.user
		console.dir(profile);
		done(null, profile);
	});
	
var cookieSigSecret = process.env.COOKIE_SIG_SECRET;
//double check that a value was passed through
if(!cookieSigSecret) {
	console.error('Please set COOKIE_SIG_SECRET');
	process.exit(1);
}

//create the express application
var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(session ({
	secret:cookieSigSecret,
	resave: false, 
	saveUninitialized: false,
	store: new RedisStore()
}));

passport.use(ghStrategy);
//normally you would use a database to store an id, etc
//called once after successful authentication
passport.serializeUser(function(user, done) {
	done(null, user);
});
//usually you wouldn't use this, because if a user has been banned, they would have to sign
//out to be blocked- but this is easy for now
//called everytime a session starts
passport.deserializeUser(function(user,done) {
	done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

//add urls to allow people to actually authenticate
app.get('/signin/github', passport.authenticate('github'));
//will now take the user to github signin page, but need to make sure to come back
//express lets you use as many funcs as necessary, will complete in order
app.get('/signin/github/callback', passport.authenticate('github'),
	function(req, res) {
		res.redirect('/secure.html');
	});
	
//signout
app.get('/signout', function(req, res) {
	req.logout();
	res.redirect('/');
});

app.use(express.static(__dirname + '/static/public'));

//if the middleware does not call next, the request stops
//completely undocumented method
app.use(function(req, res, next) {
	//req.isAuthenticated()
	if(!req.isAuthenticated()) {
		res.redirect('/'); 
	}
	next();
		
});

app.use(express.static(__dirname + '/static/secure'));

app.listen(80, function() {
	console.log('server is listening');
});

//in vagrant export COOKIE_SIG_SECRET = $(uuidgen)
//echo $COOKI... to confirm
