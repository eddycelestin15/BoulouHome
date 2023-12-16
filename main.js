const express = require("express");
const cors = require("cors");
const si = require("systeminformation");
const axios = require("axios");
const app = express();

const os = require("os");
const dotenv = require("dotenv").config;
const child_process = require("child_process");

dotenv();

/*app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.get("/plug/switch/", async () => {
	console.log("")
});

app.listen(process.env.SERVER_IP, process.env.SERVER_PORT, () => {console.log("Server running smoothly")});*/

//console.log(process.env)
(async () => {
	let i = 0;
	while(true){
		const batteryStatus = await si.battery();
		//console.log(batteryStatus)
		if(batteryStatus.maxCapacity === batteryStatus.currentCapacity || batteryStatus.percent >= 92){
			try{
				const plug = await axios({
					method: "post",
					url: "https://us-central1-boulou-functions-for-devs.cloudfunctions.net/boulou_switch_device",
					responseType: "json",
					data: {
						developerId: process.env.DEVELOPER_ID,
						email: process.env.DEVELOPER_MAIL,
						deviceId: process.env.PLUG_ID,
						switch_status: "OFF"
					}
				})

				console.log(os.platform());
				switch (os.platform()){
					case "win32": child_process.exec("shutdown /h");
					case "linux": child_process.exec("sudo systemctl suspend");
				}
			}
			catch(err){
				console.error(err);
			}
		}
		break;
	}
})()