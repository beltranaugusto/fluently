const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token") || null,
      		user_data: JSON.parse(localStorage.getItem("user_data")) || null,
		},
		actions: {

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
						console.log(response.error)
						return false
					} else {
						console.log("Logged in succesfully")
						const userData = response.user_data
						const token = response.token
						localStorage.setItem("token", token);
						localStorage.setItem("user_data", JSON.stringify(userData));
						setStore({ token: token, user_data: userData });
						return true
					}
				})
			},

			logout: () => {
				console.log("Logged Out")
				localStorage.removeItem("token");
				localStorage.removeItem("user_data");
				setStore({ token: null, user_data: null });
			  },
			
			signUp: async (formData) => {
				return fetch(`${process.env.BACKEND_URL}/sign_up`, {
					method: "POST",
					body: JSON.stringify(formData),
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(async (response) => {
					response = await response.json();
					if (response.error){
						console.log(response.error)
						return false
					} else {
						console.log("Signed Up Successfully")
						return true
					}
				})
			},

			getUser: async (id) => {
				return fetch(`${process.env.BACKEND_URL}/getuser/` + id, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(async (response) => {
					response = await response.json();
					if (response.error){
						console.log(response.error)
						return false
					} else {
						console.log("Retrieval of user data successful")
						return response
					}
				})
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
						console.log(response.error)
						return false
					} else {
						console.log("Email available")
						return true
					}
				})
			},

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
						console.log(response.error)
						return false
					} else {
						console.log("Followed User Successfully")
						const updatedLoggedUserData = await getActions().getUser(ids.user1_id)
						localStorage.setItem("user_data", JSON.stringify(updatedLoggedUserData));
						setStore({user_data: updatedLoggedUserData });
						console.log("Updated Local User Data")
						return true
					}
				})
			},

			createPost: async (formData) => {
				return fetch(`${process.env.BACKEND_URL}/createpost`, {
					method: "POST",
					body: JSON.stringify(formData),
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(async (response) => {
					response = await response.json();
					if (response.error){
						console.log(response.error)
						return false
					} else {
						console.log("Created Post Successfully")
						return true
					}
				})
			},

			getPosts: async (page) => {
				const limit = 6;
				return fetch(`${process.env.BACKEND_URL}/getposts?page=${page}&limit=${limit}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(async (response) => {
					response = await response.json();
					if (response.error){
						console.log(response.error)
						return false
					} else {
						console.log("Retrieval of Posts Successful")
						return response
					}
				})
			},

			getPost: async (id) => {
				return fetch(`${process.env.BACKEND_URL}/getpost/` + id, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(async (response) => {
					response = await response.json();
					if (response.error){
						console.log(response.error)
						return false
					} else {
						console.log("Retrieval of Post Successful")
						return response
					}
				})
			},
			
			

		}
	}
};

export default getState;
