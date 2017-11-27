var express = require('express');
var path = require('path');
var app = express();
var swig = require('swig');
var fs = require('fs');

swig.setDefaults({autoescape:false});
app.set('views',path.join(__dirname,'view'));
app.set('view engine','html');
app.engine('html',swig.renderFile);

app.use(express.static(path.join(__dirname,'pic')));


var info = require('./info');
var task = require('./Task');
//chandao
var chandao = require('./chandao');

info('2',function(err,rst){
	var user = rst[0];
	task.push(function(cb){
		chandao(user[0],user[1],function(){
			cb(null,true);
		});
	});
});

task.start(24 * 60 * 60 * 1000);

app.listen(5200,function(){
	console.log('port : 5100');
});
