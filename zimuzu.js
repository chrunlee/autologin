//字幕组
phantom.outputEncoding = 'GBK';
var url = 'http://www.zimuzu.tv/user/login'
var casper = require('casper').create({
	pageSettings: {

        // 冒充浏览器
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53'
    },

    // 浏览器窗口大小
    viewportSize: {
        width: 1920,
        height: 900
    }
});

casper.start().thenOpen(url,function(){
	this.echo('进入登录页面');
});

casper.then(function(){
	this.fillSelectors('.user-form form',{
		'input[name="email"]' : 'sunfengqi_1@163.com',
		'input[name="password"]' : 'Passw0rd'
	});
});

casper.then(function(){
	this.wait(5000,function(){
		this.click('.user-form #login');
	});
	this.wait(10000,function(){
		var t = this.getTitle();
		this.echo(t);
		var d = new Date();
		var y = d.getFullYear(),m = d.getMonth()+1,dd = d.getDate();
		this.capture('pic/'+y+'-'+m+'-'+dd+'.png');
		phantom.exit();
	});
});

casper.run();
