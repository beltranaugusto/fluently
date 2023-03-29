import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { MyNavbar } from "../component/MyNavbar.jsx";
import { Home } from "./Home.jsx";

import { AppShell, Header, Footer, Container } from '@mantine/core';

export const Shell = () => {
	const { store, actions } = useContext(Context);

	return (
		<AppShell
		padding="md"
		header={<Header height={60} p="xs">{<MyNavbar/>}</Header>}
		footer={<Footer height={60} p="md"><Container>Footer</Container></Footer>}
		>
			<Home/>
		</AppShell>
	);
};
