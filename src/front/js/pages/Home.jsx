import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { MyCard } from "../component/MyCard.jsx";

import { Card, Image, Text, Badge, Button, Group, Paper, Grid, AppShell, Navbar, Header, Footer, Container } from '@mantine/core';

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<Container>
            <Grid>
                <Grid.Col span={4}>
                    <MyCard/>
                </Grid.Col>
                <Grid.Col span={4}>
                    <MyCard/>
                </Grid.Col>
                <Grid.Col span={4}>
                    <MyCard/>
                </Grid.Col>
                <Grid.Col span={4}>
                    <MyCard/>
                </Grid.Col>
                <Grid.Col span={4}>
                    <MyCard/>
                </Grid.Col>
                <Grid.Col span={4}>
                    <MyCard/>
                </Grid.Col>
            </Grid>
        </Container>
	);
};
