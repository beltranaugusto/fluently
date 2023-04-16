const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token") || null,
      		user_data: JSON.parse(localStorage.getItem("user_data")) || null,
		},
		actions: {
			// Login action.
			logIn: async (formData) => {
				return fetch(`${process.env.BACKEND_URL}/login`, {
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

						// Store the user_data
						localStorage.setItem("user_data", JSON.stringify(data.user_data));
						setStore({ user_data: data.user_data });
						return "bien"
					}
				})
			},
			
			// Sign Up Action
			signUp: async (formData) => {
				return fetch(`${process.env.BACKEND_URL}/sign_up`, {
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
				return fetch(`${process.env.BACKEND_URL}/checkemail/` + email, {
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

			// Get Posts Action
			getPosts: async () => {
				return fetch(`${process.env.BACKEND_URL}/getposts/`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(async (response) => {
					const data = await response.json();
					console.log(data)
					if (data.error){
						console.log("there has been an error")
						return "error"
					} else {
						console.log("here are your posts")
						return data
					}
				})
			},

			// Get A Post Action
			getPost: async (id) => {
				return fetch(`${process.env.BACKEND_URL}/getpost/` + id, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(async (response) => {
					const data = await response.json();
					console.log(data)
					if (data.error){
						console.log("there has been an error")
						return "error"
					} else {
						console.log("here are your posts")
						return data
					}
				})
			},
			
			// Logout Action
			logout: () => {
				localStorage.removeItem("token");
				localStorage.removeItem("user_data");
				setStore({ token: null, user_data: null });
			  },
		}
	}
};

export default getState;
