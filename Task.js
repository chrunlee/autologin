var async = require('async');
var task = function(){
	var cache = [];
	var oneByOne = function(time){
		async.mapLimit(cache,1,function(item,cb){
			console.log('start next task');
			item(cb);
		},function(){
			console.log('work is end,after '+time+'ms task will be restart');
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
