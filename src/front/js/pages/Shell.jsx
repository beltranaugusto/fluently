import React, { useContext, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";

import { AppShell, Header, Footer, Container, Button, Group } from '@mantine/core';

import { ShellNavbar } from "../component/ShellNavbar.jsx";
import { Post } from "../component/Post.jsx";
import { CreatePost } from "../component/CreatePost.jsx";
import { Home } from "./Home.jsx";
import { Profile } from "../component/Profile.jsx";

export const Shell = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();


	// Redirection to the login page if the user is not logged.
	useEffect(() => {
		if (store.token == null) {
			navigate("/login");
		}
	}, [store.token]);

	return (
		<>
			{/*App Shell, with the Navbar and the Footer*/}
			<AppShell
				padding="md"
				header={<Header height={70} p="xs">{<ShellNavbar />}</Header>}
				footer={<Footer height={60} p="sm">
					<Container mb="lg">
						<Group position="apart" >
							<Button onClick={actions.logout} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>Logout</Button>
							<Button onClick={() => { navigate("/createpost") }} variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>New Event</Button>
							<Button onClick={() => { navigate(-1) }} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Go Back</Button>
						</Group>
					</Container>
				</Footer>}
			>
				{/*Routes nested inside the shell*/}
				<div className="max-width">
					<Routes>
						<Route exact path="/home" element={<Home />} />
						<Route exact path="/profile/:id" element={<Profile />} />
						<Route exact path="/post/:id" element={<Post />} />
						<Route exact path="/createpost" element={<CreatePost />} />
					</Routes>
				</div>
			</AppShell>
		</>
	);
};
