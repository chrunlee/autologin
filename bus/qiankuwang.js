phantom.outputEncoding = 'utf8';

var url = 'http://588ku.com/';

var casper = require('casper').create({
	verbose: true,
    logLevel: "error",
    pageSettings: {
         loadImages:  true,        
         loadPlugins: true,    
         userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2729.4 Safari/537.36'
    }
});

var user = casper.cli.args[0],
	pwd = casper.cli.args[1];

casper.start('http://588ku.com/index.php?m=login&a=snsLogin&type=qq&source=').viewport(1366, 2000).then(function(){

});
casper.withFrame(0,function(){
	this.echo('login...');
	this.click('#switcher_plogin');//切换
	this.wait(1000);
});
casper.withFrame(0,function(){
	this.fillSelectors('form#loginform',{
		'#u' : user,
		'#p' : pwd
	});
	this.wait(1000);
});
casper.withFrame(0,function(){
	this.capture('1.png');
	this.click('form#loginform input[type="submit"]');
	this.capture('2.png');
	this.wait(1000);
	this.capture('3.png');
	this.wait(10000);
	this.capture('4.png');
});



casper.thenOpen(url,function(){
	this.echo('incoming '+url);
	this.wait(15000);
	this.capture('5.png');
	this.waitForSelector('.already-sign-but');
});

casper.then(function(){
	this.echo('click to sign');
	this.click('a.already-sign-but');
	this.wait(12000);
});
casper.then(function(){
	if(this.exists('.signIn-btn')){
		this.echo('signing....')
	}
});
casper.then(function(){
	this.click('.signIn-btn');
	this.wait(11000);
});
casper.then(function(){
	this.capture('res.png');
	this.echo('sign over,look at res.png ');
});
casper.then(function(){
	this.exit();//退出
})

casper.run();

