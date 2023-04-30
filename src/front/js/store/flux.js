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
					response = await response.json();
					if (response.error){
						console.log("Error")
						return false
					} else {
						console.log("Good")
						const userData = response.user_data
						const token = response.token
						localStorage.setItem("token", token);
						localStorage.setItem("user_data", JSON.stringify(userData));
						setStore({ token: token, user_data: userData });
						return true
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
					response = await response.json();
					if (response.error){
						console.log("email not available")
						return false
					} else {
						console.log("email available")
						return true
					}
				})
			},

			// Get Posts Action
			getPosts: async (page) => {
				const limit = 6;
				return fetch(`${process.env.BACKEND_URL}/getposts?page=${page}&limit=${limit}`, {
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
						return false
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
						return false
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

			getLocation: () => {
				const successCallback = (position) => {
					localStorage.setItem("currentLocation", [position.coords.latitude, position.coords.longitude]);
					setStore({ currentLocation: [position.coords.latitude, position.coords.longitude] });
				};
				const errorCallback = (error) => {
					console.log(error);
				};
				navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
			},
			
			// Create Post Action
			createPost: async (formData) => {
				return fetch(`${process.env.BACKEND_URL}/createpost`, {
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
						return false
					} else {
						console.log("good")
						return true
					}
				})
			},
			

			// Get A User Action
			getUser: async (id) => {
				return fetch(`${process.env.BACKEND_URL}/getuser/` + id, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(async (response) => {
					const data = await response.json();
					if (data.error){
						console.log("there has been an error")
						return false
					} else {
						console.log("retrieval of user data successful")
						return data
					}
				})
			},

			// Follow User action.
			follow: async (ids) => {
				return fetch(`${process.env.BACKEND_URL}/follow`, {
					method: "POST",
					body: JSON.stringify(ids),
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(async (response) => {
					response = await response.json();
					if (response.error){
						console.log("Error")
						return false
					} else {
						console.log("Good")
						const updatedLoggedUserData = await getActions().getUser(ids.user1_id)
						localStorage.setItem("user_data", JSON.stringify(updatedLoggedUserData));
						setStore({user_data: updatedLoggedUserData });
						return true
					}
				})
			},

		}
	}
};

export default getState;
