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

		if(res.connected) {
			if(session) localStorage.setItem("session", 1);

			return {state: true};
		}
		else return {state: false, message: res.data.message};
	}
	catch(err){
		throw err;
	}
}