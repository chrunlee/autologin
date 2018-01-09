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

//禅道
info('2',function(err,rst){
	var user = rst[0];
	console.log(user.description)
	task.push(function(cb){
		chandao(user.user,user.pwd,user.description,function(){
			cb(null,true);
		});
	});
});
//千库网
info('3',function(err,rst){
	var user = rst[0];
	var u = user.user,p = user.pwd,d = user.description;
	var exec = require('child_process').exec;
	task.push(function(cb){
		exec('casperjs qiankuwang.js '+u +' ' + p,function(){
			console.log(d);
			cb(null,true);
		});
	});
});

setTimeout(function(){
	task.start(24 * 60 * 60 * 1000);	
},10 * 1000);


app.listen(5124,function(){
	console.log('port : 5124');
});
