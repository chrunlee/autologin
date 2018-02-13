const https = require('https');
var mailer = require('./mailer');
const limit = 268;
function check( cb ){
	const opts = {
		hostname : 'www.dbjb.com',
		path : '/Index/MethodQuoteprice'
	};
	const req = https.request(opts,(res)=>{
		const data = [];
		res.setEncoding('utf8');
		res.on('data',(chunk)=>{
			data.push(chunk);
		});
		res.on('end',()=>{
			const str = data.toString();
			const obj = JSON.parse(str);
			console.log(`result:${str}`)
			if(obj && obj.responseParams){
				const price = parseInt(obj.responseParams);
				if(price < limit){
					//发送邮件
					const content = '当前黄金价格'+price+'低于'+limit+',请尽快查看存金宝信息，是否购买。';
					mailer('chrunlee@foxmail.com','黄金价格低于'+limit,content,function(){
						console.log('黄金价格收集完毕');
					});
					
				}
			}
			if(cb)cb();
		})
	});
	req.on('error',function(err){
		if(err){
			console.log(err);
		}
		if(cb)cb();
	})
	req.end();
}
module.exports = check;