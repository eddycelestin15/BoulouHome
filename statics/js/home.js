const connect_button  = document.querySelector("form button[type='submit']");
const mail_field = document.querySelector("form [name='boulou_mail']")
const password_field = document.querySelector("form [name='boulou_password']");
const session_checkbox = document.querySelector("form [name='session-active']");
const state_message_container = document.querySelector("form .state-message-container");

const session_state = parseInt(localStorage.getItem("session"));

if(session_state){
	mail_field.addEventListener("input", () => mail_field.checkValidation());
	password_field.addEventListener("input", () => password_field.checkValidation());

	connect_button.addEventListener("click", async (e) => {
		e.preventDefault();
		try{
			mail_field.checkValidation();
			password_field.checkValidation();

			const connect_state = await connect_to_server(
				mail_field.value.trim(),
				password_field.value,
				session_checkbox.checked
			);

			if(connect_state.state){
				state_message_container.innerHTML = null;
				state_message_container.style.marginTop = 0;
				state_message_container.classList.remove("error");

				window.location.href = "/boulou/plugmanager/dash";
			}
			else{
				state_message_container.innerHTML = `<i class="fa fa-times"></i> Verifier que les informations que vous avez saisies sont correctes. ${connect_state.message}.`;
				state_message_container.classList.add("error");
				state_message_container.style.marginTop = "10px";
			}
		}
		catch(err){
			console.error(err);
		}

	});
}
else{
	window.location.href = "/boulou/plugmanager/dash";
}