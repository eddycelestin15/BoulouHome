const express = require("express");
const cors = require("cors");
const si = require("systeminformation");
const axios = require("axios");
const app = express();

const os = require("os");
const dotenv = require("dotenv").config;
const child_process = require("child_process");

const PLUG_ON = "ON";
const PLUG_OFF = "OFF";

dotenv();

/*app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.get("/plug/switch/", async () => {
	console.log("")
});

eaLU3732

app.listen(process.env.SERVER_IP, process.env.SERVER_PORT, () => {console.log("Server running smoothly")});*/

//console.log(process.env)
(async () => {
add_value_to_start_date();
	await get_state_and_turn_pc_off();
	return;
})()

function add_value_to_start_date(){
	let hour_start = 20;
	let minute_start = 30;

	let hour_end = 3;
	let minute_end = 15;

	if(hour_start > hour_end) hour_end = hour_end + 24;

	const timezone_offset = parseInt(new Date().getTimezoneOffset() / 60);
	const date_start = new Date();
	const date_end = new Date();
	const current = new Date();

	date_start.setHours(hour_start - timezone_offset, minute_start, 0, 0);
	date_end.setHours(hour_end - timezone_offset, minute_end, 0, 0);
	current.setHours(current.getHours() - timezone_offset, 0, 0, 0);

	//console.log(date_start.getTime(), date_end.getTime(), current.getTime())
	if(date_start.getTime() <= current.getTime() && current.getTime() <= date_end.getTime()){
		return true;
	}
	else return false;
}


async function get_state_and_turn_pc_off() {
	const batteryStatus = await si.battery();
	const batteryLowerLevel = 56;
	const plugStatus = batteryStatus.percent > batteryLowerLevel ? PLUG_OFF : PLUG_ON;

	console.log("battery status");
	console.log(batteryStatus);

	console.log(add_value_to_start_date());

	if(batteryStatus.percent > batteryLowerLevel){
	if(batteryStatus.maxCapacity === batteryStatus.currentCapacity || batteryStatus.percent >= 58 || add_value_to_start_date()){
		console.log("Trying to turn off the plug");
		try{
			const plug = await axios({
				method: "post",
				url: "https://us-central1-boulou-functions-for-devs.cloudfunctions.net/boulou_switch_device",
				responseType: "json",
				data: {
					developerId: process.env.DEVELOPER_ID,
					email: process.env.DEVELOPER_MAIL,
					deviceId: process.env.PLUG_ID,
					switch_status: plugStatus
				}
			});

			console.log("Plug turned off");
			switch (os.platform()){
				case "win32": child_process.exec("shutdown /h");
				case "linux": child_process.exec("sudo shutdown now");
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
else{

			const plug = await axios({
				method: "post",
				url: "https://us-central1-boulou-functions-for-devs.cloudfunctions.net/boulou_switch_device",
				responseType: "json",
				data: {
					developerId: process.env.DEVELOPER_ID,
					email: process.env.DEVELOPER_MAIL,
					deviceId: process.env.PLUG_ID,
					switch_status: plugStatus
				}
			});
}
}


function register_user(){
	
}