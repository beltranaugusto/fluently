import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Button, Container, Avatar, Flex, TextInput, Title } from '@mantine/core';



export const MyNavbar = () => {

    const { store, actions } = useContext(Context);

    return (
        <>
            <Container>
                <Flex mih={50} gap="md" justify="space-between" align="flex-start" direction="row" wrap="wrap">
                    <Flex direction="row" gap="sm" align="center">
                        <Avatar color="blue" radius="sm" />
                        <Title order={3}>Fluently</Title>
                    </Flex>
                    <Flex direction="row" gap="md" align="center">
                        <TextInput placeholder="Search" />
                        <Button onClick={actions.logout} variant="gradient" gradient={{ from: 'orange', to: 'red' }}>Logout</Button>
                    </Flex>
                </Flex>
            </Container>
        </>
    );
};
