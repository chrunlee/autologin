phantom.outputEncoding = 'GBK';

var url = 'http://588ku.com/';

var casper = require('casper').create({
	verbose: true,
    logLevel: "error",//debug
    pageSettings: {
         loadImages:  true,        
         loadPlugins: true,    
         userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2729.4 Safari/537.36'
         // cookie : 'bt_guid=%227abb1358097d785106fe1cfa74f62328%22; host=www.baidu.com; source_url=%22www.baidu.com%22; non_search_first=1; search_word_to_type=it_undefined; back_search_keyword=it; from_url=201699; 699pic_popup_lock=1; company_drop=1; Qs_lvt_209865=1514881811%2C1514883124; backConditionFilterField=8_0; no_login_pv=13; referer=%22http%3A%5C%2F%5C%2F588ku.com%5C%2F%22; 955f4fcc833ec97e69a301badd315cf6=%220a35a8a8059a99fb4f9570dd8c0a57c7%22; 588ku_login_refer_url=%22http%3A%5C%2F%5C%2F588ku.com%5C%2F%22; phoneold7608462=1; temp_login_uid=7608462; temp_login_avator=%22http%3A%5C%2F%5C%2Fq.qlogo.cn%5C%2Fqqapp%5C%2F101252414%5C%2F56525932E1B34C54B3D013186000359E%5C%2F100%22; temp_login_flag2=1; auth_id=%227608462%7C%5Cu665a%5Cu5b89%7C1514970793%7C3d0ed08bd933a5a14099027d1a4a62bc%22; success_target_path=%22http%3A%5C%2F%5C%2F588ku.com%5C%2F%22; sns=%7B%22token%22%3A%7B%22access_token%22%3A%22F67905465E3A16120D934E2C01906EE4%22%2C%22expires_in%22%3A%227776000%22%2C%22refresh_token%22%3A%222052290D20DB192FF4E1B4A47CF360F1%22%2C%22openid%22%3A%2256525932E1B34C54B3D013186000359E%22%7D%2C%22type%22%3A%22qq%22%7D; PHPSESSID=hjiukbdv3bsaqv8escq3n6t5n0; location=0; down_type=1; 588KUSSID=4s69thiiu2os0dvt5u1222cdd0; Qs_pv_209865=2567386963505946000%2C3415055892779275000%2C1243148626499135000%2C2373812345183735000%2C2625103328855688000; mediav=%7B%22eid%22%3A%22436045%22%2C%22ep%22%3A%22%22%2C%22vid%22%3A%221Ct-3u*Rb*9v*-Ybj%60%3DY%22%2C%22ctn%22%3A%22%22%7D; Hm_lvt_3e90322e8debb1d06c9c463f41ea984b=1514881812,1514882842,1514883125,1514884486; Hm_lpvt_3e90322e8debb1d06c9c463f41ea984b=1514884486; Hm_lvt_8226f7457e3273fa68c31fdc4ebf62ff=1514881812,1514882842,1514883125,1514884486; Hm_lpvt_8226f7457e3273fa68c31fdc4ebf62ff=1514884486'
    }
});

var opts = require("utils").dump(casper.cli.args);

casper.start().thenOpen('http://588ku.com/index.php?m=login&a=snsLogin&type=qq&source=',function(){});
casper.withFrame(0,function(){
	this.echo('登录中...')
	this.click('#switcher_plogin');//切换
	this.wait(1000);
	this.fillSelectors('form#loginform',{
		'#u' : opts[0],
		'#p' : opts[1]
	});
	this.click('#loginform input[type="submit"]');
	this.wait(5000);
});

casper.thenOpen(url,function(){
	this.echo('进入'+url);
	this.waitForSelector('.already-sign-but');
});

casper.then(function(){
	this.echo('点击签到');
	this.click('a.already-sign-but');
	this.wait(2000);
});
casper.then(function(){
	if(this.exists('.signIn-btn')){
		this.echo('还未签到，正在签到中...')
	}
});
casper.then(function(){
	this.click('.signIn-btn');
	this.wait(1000);
});
casper.then(function(){
	this.capture('res.png');
	this.echo('签到结束,查看 res.png 图片');
});
casper.then(function(){
	this.exit();//退出
})

casper.run();

