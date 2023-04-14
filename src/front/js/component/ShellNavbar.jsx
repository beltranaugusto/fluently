import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Button, Container, Avatar, Flex, Group, Title } from '@mantine/core';
import { Users, Bell, User } from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';



export const ShellNavbar = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <>
            <Container>
                <Flex mih={50} gap="md" justify="space-between" align="center" direction="row" wrap="wrap">

                    {/*Logo*/}
                    <Flex direction="row" gap="sm" align="center" onClick={() => { navigate("/home") }}>
                        <Avatar color="blue" radius="xs" />
                        <Title order={4}>Fluently</Title>
                    </Flex>

                    {/*Menu*/}
                    <Flex direction="row" gap="md" align="center">
                        <Group spacing="xs">
                            <Button size="xs" variant="outline"><Users size="1.2em" /></Button>
                            <Button size="xs" variant="outline"><Bell size="1.2em" /></Button>
                            <Button size="xs" variant="outline"><User size="1.2em" /></Button>
                        </Group>
                    </Flex>
                </Flex>
            </Container>
        </>
    );
};
