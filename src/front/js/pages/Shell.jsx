import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { MyNavbar } from "../component/MyNavbar.jsx";
import { Home } from "./Home.jsx";

import { AppShell, Header, Footer, Container, Button } from '@mantine/core';

export const Shell = () => {
	const { store, actions } = useContext(Context);

	return (
		<AppShell
			padding="md"
			header={<Header height={70} p="xs">{<MyNavbar />}</Header>}
			footer={<Footer height={60} p="md"><Container><Button onClick={actions.logout} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>Logout</Button></Container></Footer>}
		>
			<Home />
		</AppShell>
	);
};
