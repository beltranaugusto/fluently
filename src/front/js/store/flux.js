const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token") || null,
      		user_id: localStorage.getItem("user_id") || null,
      		email: localStorage.getItem("email") || null,
		},
		actions: {

			// Login action.
			logIn: async (formData) => {
				return fetch("http://127.0.0.1:3001/api/login", {
					method: "POST",
					body: JSON.stringify(formData),
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(async (response) => {
					const data = await response.json();
					
					if (data.error){
						console.log("error")
						return "error"
					} else {

						// Store and Local Storage fill up.
						console.log("good")
						localStorage.setItem("token", data.token);
						setStore({ token: data.token });
						localStorage.setItem("user_id", data.user_id);
						setStore({ user_id: data.user_id });
						localStorage.setItem("email", data.email);
						setStore({ email: data.email });
						return "bien"
					}
				})
			},
			
			// Sign Up Action
			signUp: async (formData) => {
				return fetch("http://127.0.0.1:3001/api/sign_up", {
					method: "POST",
					body: JSON.stringify(formData),
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(async (response) => {
					const data = await response.json();
					console.log(data)
					if (data.error){
						console.log("error")
						return "error"
					} else {
						console.log("good")
						return "bien"
					}
				})
			},

			// Check Email Action
			checkEmail: async (email) => {
				return fetch("http://127.0.0.1:3001/api/checkemail/" + email, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(async (response) => {
					const data = await response.json();
					console.log(data)
					if (data.error){
						console.log("email not available")
						return "error"
					} else {
						console.log("email available")
						return "bien"
					}
				})
			},
			
			// Logout Action
			logout: () => {
				localStorage.removeItem("token");
				localStorage.removeItem("user_id");
				localStorage.removeItem("email");
				setStore({ token: null, user_id: null, email: null });
			  },
		}
	}
};

export default getState;
