//bug collect
var url = 'http://pm.boyuyun.com.cn/zentao/user-login.html';
var yesurl = 'http://pm.boyuyun.com.cn/zentao/company-dynamic-yesterday--date_desc-51-1000-1.html';
var superagent = require('superagent');

var events = require('events');

var cheerio = require('cheerio');

var iconv = require('iconv-lite');

var emitter = new events.EventEmitter();

//event
emitter.on('getContent',getContent);

emitter.on('analysis' , analysis);

emitter.on('send',send);

var callback = null;

function getCookie(user,password,cb){
	callback = cb;
	superagent.post(url)
		.type('form')
		.send({'account':user,'password':password})
		.end(function(err,res){
			emitter.emit('getContent',res.headers['set-cookie']);
		});
}


function getContent(cookie){
	superagent.get(yesurl)
		.set({
			'Cookie' : cookie[2],
			'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
		})
		.end(function(err,res){
			var $ = cheerio.load(res.text,{decodeEntities:false});
			var arr = [];
			$('tbody tr').each(function(index,item){
				var time = $($(item).find('td')[0]).html();//日期
				var name = $($(item).find('td')[1]).html();//用户
				var opt = $($(item).find('td')[2]).html();//动作
				var obj = $($(item).find('td')[3]).html();//对象
				var content = $($(item).find('td')[5]).html();//内容
				name = name.replace(/\\n/g,'');
				name = name.trim();
				arr.push({
					user : name,
					opt : opt,
					time : time,
					obj : obj,
					content : content
				});
			});
			emitter.emit('analysis',arr);
		});
};

//分析
function analysis(arr ){
	var map = {};
	arr.forEach(function(item){
		var name = item.user;
		var list = map[name] ? map[name] : {};
		//关注：创建了几个bug,激活了几个bug,解决了几个bug,关闭了几个bug
		var optarr = ['创建了','关闭了','激活了','解决了'];
		if(item.obj == 'Bug' && optarr.indexOf(item.opt) > -1){
			var count = list[item.opt] ? list[item.opt] : 0;
			count ++;
			list[item.opt] = count;
		}
		map[name] = list;
	});
	emitter.emit('send',map);
}

//发送邮件
function send(map){
	var content = '<div style="width:100%;min-height:200px;background-color:#49e;padding:20px;">';
	var namearr = [];
	for(var name in map){
		namearr.push(name);
	}
	content += '<div>共有<span style="color:red;">'+(namearr.length)+'</span>名同学登录系统:<span style="color:red;">'+(namearr.join(','))+'</span></div>';
	content += '<p style="font-weight:bold;">具体操作如下:</p>';
	for(var name in map){
		var info = map[name];
		content += '<div style="border:1px solid #eee;margin:15px;">';
		content += '<p>'+name+'</p>';
		for(var opt in info){
			content +='<p style="padding:10px 20px;color:white;">'+opt+info[opt]+'个bug.</p>';
		}
		content += '</div>';
	}
	content +='</div>';
	var mailer = require('./mailer');
	mailer('chrunlee@foxmail.com','禅道日常',content,function(){
		if(callback){
			callback();
		}
	});
}

module.exports = getCookie;