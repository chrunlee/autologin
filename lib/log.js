//处理日志
var fs = require('fs');
var moment = require('moment');
var path = require('path');

var Log = function( str ){
	var now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
	//1.打印
	str = typeof str === 'string' ? str : str.toString();
	var info = now +'\t'+str+'\n';
	//2.写入文件
	var nowDate = moment(new Date()).format('YYYY-MM-DD');
	var logPath = path.join(__dirname,'../logs',nowDate+'.log');
	console.log(info);
	if(fs.existsSync(logPath)){
		fs.appendFile(logPath,info,function(err){
			if(err){
				console.log(err);
			}
		});
	}else{
		fs.writeFile(logPath,info,function(err){
			if(err){
				console.log(err);
			}
		});
	}
};

module.exports = Log;