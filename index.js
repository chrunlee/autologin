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

app.get('/',function(req,res){
	//获得pic下图片展示
	var files = fs.readdirSync('pic');
	res.render('index',{files:files});
});

var daywork = require('./daywork');
daywork();

app.listen(5100,function(){
	console.log('port : 5100');
});
