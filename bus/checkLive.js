//检查某些地址是否还存活

var superagent = require('superagent');
var async = require('async');
var mailer = require('../lib/mailer');
var log = require('../lib/log');

function check (item,callback){
	var url = item.url,name = item.name;
	superagent.get(url).end(function(err,res){
		if(err){
			callback(null,{
				url : url,
				msg : '无法链接',
				alive : false
			});
		}else{
			callback(null,{
				url : url,
				msg : '正常运行',
				alive : true
			})
		}
	});
}
function start( item , callback){
	//对item中的url进行比对查看
	var other = JSON.parse(item.other);
	//{name : '',url : ''}
	if(other && other.length > 0){
		async.mapLimit(other,1,function(item,cb){
			check(item,cb);
		},function(err,rst){
			var deadurl = [];
			rst.forEach(function( aa ){
				if(!aa.alive){
					deadurl.push(aa);
				}
			});
			send(deadurl,callback);
		})
	}else{
		callback();
	}
}
function send( deadurl ,callback){
	console.log(deadurl);
	if(deadurl && deadurl.length > 0){
		var title = '有网站运行不正常，请检查！';
		var content = '无法运行的网站地址:<br />';
		deadurl.forEach(function(item){
			var url = item.url;
			content += url+'<br />';
		});
		mailer('chrunlee@foxmail.com',title,content,callback);
	}else{
		log('所有站点运行正常');
		callback();
	}
}

module.exports = start;

