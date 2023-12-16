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
	await get_state_and_turn_pc_off();
	return;
})()

async function get_state_and_turn_pc_off() {
	const hour_start = 8;
	const minute_start = 30;
	const type_start = "pm";

	const hour_end = 3
	const minute_end = 30;
	const type_end = "am"; 

	const batteryStatus = await si.battery();
	if(batteryStatus.maxCapacity === batteryStatus.currentCapacity || batteryStatus.percent >= 93){
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
			});

			switch (os.platform()){
				case "win32": child_process.exec("shutdown /h");
				case "linux": child_process.exec("sudo systemctl suspend");
			}
		}
		catch(err){
			console.error(err);
		}
		finally{
			return;
		}
	}
	else {
		await new Promise((resolve) => setTimeout(() => resolve(true), 10000));
		await get_state_and_turn_pc_off();
	}
}