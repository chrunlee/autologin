/**
1.启动后读取数据库，将任务存放在内存中。
2.然后将每个任务开启定时处理
3.根据每个任务不同调用不同的业务处理
4.每个任务都有返回值或没有，如果有返回值，则调用邮件发送
5.



***/
var sqlUtil = require('./lib/sql');
var log = require('./lib/log');

//启动
(function start(){
	sqlUtil.getAll(function(err,rst){
		if(err || rst == null){
			//一天后启动
			setTimeout(function(){
				start();
			},24 * 60 * 60 * 1000);
		}else{
			//rst 执行
			exeTask(rst);
		}
	});	
})();

function exeTask (taskList){
	taskList.forEach(function( item ){
		var type = item.type,
			time = item.time,
			file= item.file;
		// var temp = require('./'+file);
		var delay = getNextTime(type,time);
		(function nextCall(){
			var temp = require('./bus/'+file);
			exeOne(temp,item,type,time,delay);
		})();
	});
}
function exeOne ( obj, data, type, time ,delay ){
	log('延迟:'+delay+'ms后执行:'+data.description);
	setTimeout(function(){
		obj(data,function(){
			var next = getNextTime(type,time);
			exeOne(obj,data,type,time,next);
		});
	},delay);
}

function getNextTime(type,time){
	var delay = 1000 * 10;//什么都没有则十秒后执行
	if(type == '0'){//定时，几个小时后
		time = parseInt(time,10);
		delay = time * 60 * 60 * 1000;
	}else{//定点
		var d = new Date();
		var hour = d.getHours();
		var min = d.getMinutes();
		var targetHour = parseInt(time.split(':')[0],10)
		var targetMin = parseInt(time.split(':')[1],10);
		if(hour <= targetHour && targetMin > min){
			var diffHour = targetHour - hour;
			var diffMin = targetMin >= min ? targetMin - min : (60 - min + targetMin)* -1;
			delay = ( diffHour * 60 + diffMin ) * 60 * 1000;
		}else{
			var diffHour = 24 - hour + targetHour;
			var diffMin = targetMin >= min ? targetMin - min : (60 - min + targetMin)* -1;
			delay = (diffHour * 60 + diffMin)* 60 * 1000;
		}
	}
	return delay;
}

