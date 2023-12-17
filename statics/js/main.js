HTMLInputElement.prototype.checkValidation = function (){
	const element_parent_container = this.parentElement;
	const validity_state = this.validity;
	const validity_message_container = this.nextElementSibling;

	console.log(this.checkValidity(), validity_state)
	validity_message_container.textContent = null;
	this.checkValidity() === false  ?
		element_parent_container.classList.add("error") :
		element_parent_container.classList.remove("error");

	if(validity_state.typeMismatch) this.setCustomValidity("Veuillez respecter le format de données pour ce champ");
	else if(validity_state.valueMissing) this.setCustomValidity("Veuillez spécifier une valeur pour ce champ");
	else this.setCustomValidity("");

	if(this.checkValidity() === false) {
		element_parent_container.classList.add("error");

		validity_message_container.textContent = this.validationMessage;

		const error = new Error();
		error.name = "VALIDATION_ERROR";
		error.message = "Error while validating the input";
		throw error;
	}
	else { this.setCustomValidity(""); element_parent_container.classList.remove("error"); }
	return null;
}

function get_user_information(){
	if(localStorage.getItem("mail")) return localStorage.getItem("mail");
	else return sessionStorage.getItem("mail")
}

async function connect_to_server(
	mail,
	password,
	session
){
	try{
		const res = await axios({
			method: "post",
			url: "/boulou/plugmanager/connect_account",
			data: { mail, password, session },
			responseType: "json"
		});

		if(res.data.connected) {
			if(session) {
				localStorage.setItem("session", 1);
				localStorage.setItem("mail", mail);
			}
			else sessionStorage.setItem("mail", mail);


			return {state: true};
		}
		else return {state: false, message: res.data.message};
	}
	catch(err){
		throw err;
	}
}

async function switch_plug(
	id,
	mail,
	state
){
	try{
		const switch_plug = await axios({
			method: "put",
			url: "/boulou/plugmanager/switch",
			data: {
				id,
				mail,
				state
			},
			responseType: "json"
		});

		return switch_plug;
	}
	catch(err){
		throw err;
	}
} 

function append_plug_to_list(
	template,
	data
){
	const plug_list_container = document.querySelector(".plug-list");
	const plug_add_button = plug_list_container.querySelector(".add-plug");
	const plug_template = template;
	const plug_data = data;

	plug_template.querySelector(".icon .status").classList.add(plug_data.status ? "online" : "offline");
	plug_template.querySelector(".icon .status").innerHTML = plug_data.status ? `<i class="fa fa-exclamation-circle"></i> Active` : `<i class="fa fa-times"></i> Inactive`;
	plug_template.querySelector(".info .info-container .id").textContent = plug_data.id;
	plug_template.querySelector(".info .info-container .name").textContent = plug_data.name;

	plug_list_container.insertBefore(plug_template, plug_add_button);


	const plug_list = plug_list_container.querySelectorAll(".plug-entry:not(.add-plug)");
	const plug = plug_list[plug_list.length - 1];
	const plug_switch_button = plug.querySelector(".action .plug-switch");

	plug.dataset.id = data.id;
	plug.dataset.state = data.status ? 0 : 1;
	plug_switch_button.addEventListener("click", async (e) => {
		try{
			const switch_status_element = plug.querySelector(".icon .status");
			const switch_result = await switch_plug(
				plug.dataset.id,
				get_user_information(),
				plug.dataset.state
			);

			if(switch_result.data.success) {
				plug.setAttribute("data-state", switch_result.data.state === 0 ? 1 : 0);

				if(switch_result.data.state === 0){
					switch_status_element.classList.remove("online");
					switch_status_element.classList.add("offline");
					switch_status_element.innerHTML = `<i class="fa fa-times"></i> Inactive`;
				}
				else{
					switch_status_element.classList.add("online");
					switch_status_element.classList.remove("offline");
					switch_status_element.innerHTML = `<i class="fa fa-exclamation-circle"></i> Active`;
				}
			}
		}
		catch(err){
			console.error(err);
		}
	});

	console.log(plug)
	const plug_process_autoshutdown = plug.querySelector(".process button.save");
	const plug_process_percentage = plug.querySelector("[name='battery-percentage']");
	plug_process_autoshutdown.addEventListener("click", () => {
		axios({
			method: "get",
			url: "/boulou/plugmanager/autoshutdown",
			params: {
				id: plug.dataset.id,
				percentage: plug_process_percentage.value
			}
		});
	});

	return null;
}