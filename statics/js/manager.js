const add_plug_button = document.querySelector(".plug-list .plug-entry.add-plug");

add_plug_button.addEventListener("click", async () => {
	const user = await get_user_information();
	console.log(user)

	const plug_id = prompt("Entrer l'id de la prise");
	const plug_verification = await axios({
		method: "post",
		url: "/boulou/plugmanager/verify_and_add_device",
		data: { id: plug_id, mail: user },
		responseType: "json"
	});

	if(plug_verification.data.device){
		const plug_template = document.getElementById("plug-entry-template").content.cloneNode(true);
		append_plug_to_list(
			plug_template,
			plug_verification.data.info
		);
	}
	else{
		console.error("Device not recognized");
	}
});

(async () => {

})();