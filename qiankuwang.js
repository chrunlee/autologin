phantom.outputEncoding = 'utf8';

var url = 'http://588ku.com/';

var casper = require('casper').create({
	verbose: true,
    logLevel: "debug",
    pageSettings: {
         loadImages:  true,        
         loadPlugins: true,    
         userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2729.4 Safari/537.36'
    }
});

var user = casper.cli.args[0],
	pwd = casper.cli.args[1];

casper.start().thenOpen('http://588ku.com/index.php?m=login&a=snsLogin&type=qq&source=',function(){});
casper.withFrame(0,function(){
	this.echo(user);
	this.echo('登录中...')
	this.click('#switcher_plogin');//切换
	this.wait(10000);
	this.capture('1.png');
	this.fillSelectors('form#loginform',{
		'#u' : user,
		'#p' : pwd
	});
	this.capture('2.png');
	this.click('form#loginform input[type="submit"]');
	this.capture('4.png');
	this.wait(15000);
});

casper.thenOpen(url,function(){
	this.echo('进入'+url);
	this.capture('3.png');
	this.waitForSelector('.already-sign-but');
});

casper.then(function(){
	this.echo('点击签到');
	this.click('a.already-sign-but');
	this.wait(12000);
});
casper.then(function(){
	if(this.exists('.signIn-btn')){
		this.echo('还未签到，正在签到中...')
	}
});
casper.then(function(){
	this.click('.signIn-btn');
	this.wait(11000);
});
casper.then(function(){
	this.capture('res.png');
	this.echo('签到结束,查看 res.png 图片');
});
casper.then(function(){
	this.exit();//退出
})

casper.run();

