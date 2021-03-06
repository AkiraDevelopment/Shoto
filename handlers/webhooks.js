const express = require("express");
const bodyParser = require("body-parser");
const app = express();
module.exports = client => {

	const port = client.config.webhook_port;

	app.use(bodyParser.json());

	//on post to server check if authorization matches
	app.post("/", function (req, res) {
		let body = req.body;
		let headers = req.headers;
		if(headers.authorization === client.config.topgg_webhook_auth){
			res.statusCode = 200;
			res.json({
				message: "ok got it!"
			});
			require("../database/models/voteget")(client,body);
		}else if(headers.authorization === client.config.donatebot_webhook_auth){
			console.log(body);
			res.statusCode = 200;
			res.json({
				message: "ok got it!"
			});
			require("../database/models/donateGet")(client,body);
		}else{
			res.statusCode = 401;
			res.json({
				message: "Error unauthorized!"
			});
		}


	});
    
	app.listen(port, () => {
    
		client.logger.info(`Webhook server loaded on port ${port}`);
    
	});

};