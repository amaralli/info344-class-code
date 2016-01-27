'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var dbConfig = require('./secret/config-maria.json');
var bluebird = require('bluebird');

//set up connection pool, promise-based by bluebird
var connPool = bluebird.promisifyAll(mysql.createPool(dbConfig));

var storiesApi = require('./controllers/stories-api.js');
var Story = require('./models/story.js').Model(connPool);



var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/static'));

//segments the api stuff, makes post and stuff not so top
//level
app.use('/api/v1', storiesApi.Router(Story));

//getting this up and listening
app.listen(80, function() {
	console.log('server is listening...');
});


