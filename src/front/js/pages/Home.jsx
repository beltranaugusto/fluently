import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';


import { MyCard } from "../component/MyCard.jsx";

import { Grid, Container, Card, TextInput, Button, Group, Space } from '@mantine/core';
import { Search } from 'tabler-icons-react';

export const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    // Redirection to the login page if the user is not logged.
    useEffect(() => {
        if (store.token == null) {
            navigate("/");
        }
    }, [store.token]);

    return (
        <Container>
            <Card padding="lg" radius="md" mb="sm" withBorder>

                <TextInput
                    placeholder="Search"
                    icon={<Search size="0.8rem" />}
                />
                <Space h="sm" />
                <Group spacing="xs" grow>
                    <Button size="xs" variant="outline">KM</Button>
                    <Button size="xs" variant="outline">Date</Button>
                </Group>
            </Card>
            <Grid>
                <Grid.Col span={12}>
                    <MyCard />
                    <MyCard />
                    <MyCard />
                </Grid.Col>
            </Grid>
        </Container>
    );
};
