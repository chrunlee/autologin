var async = require('async');
var task = function(){
	var cache = [];
	var oneByOne = function(time){
		console.log('task start ---');
		async.mapLimit(cache,1,function(item,cb){
			item(cb);
		},function(){
			console.log('当天工作已完成， '+(time/1000/60/60)+'小时后继续执行');
			setTimeout(function(){
				oneByOne(time);
			},time);
		});
	}
	return {
		push : function( fn ){
			cache.push(fn);
		},
		start : function( time ){//定义循环时间，比如一天？
			//开始执行,promise
			oneByOne(time);
		}
	};
}

module.exports = task();
