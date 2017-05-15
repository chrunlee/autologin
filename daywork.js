
var zimuzu = function(){
	console.log('开始执行凤起的自动登录字幕组');
	var exec = require('child_process').exec;
	exec('casperjs zimuzu.js',function(){
		console.log('凤起工作结束');
	});
};

var allstart = function(){
	var d = new Date();
	var d2 = new Date(d.getTime()+24*60*60*1000);
	var y = d2.getYear();
	var h = d2.getDate();
	var m = d2.getMonth();
	var d3 = new Date(y+1900,m,h);
	var time = d3.getTime() - d.getTime() + 1000*60*60*8;
	setTimeout(function(){
		
		zimuzu();
		allstart();
	},time);
}
module.exports = allstart;
