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

casper.start().thenOpen(url,function(){
	this.wait(15000);
	
});
this.wait(15000,function(){
	this.echo('等待')
});
this.then(function(){
	this.capture('qianku.png');
});

casper.run();