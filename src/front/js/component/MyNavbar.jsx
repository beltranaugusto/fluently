import React from "react";
import { Link } from "react-router-dom";
import { useDisclosure } from '@mantine/hooks';
import { Button, Container, Avatar, Flex, TextInput, Title, Modal } from '@mantine/core';
import { LoginModal } from './LoginModal.jsx'


export const MyNavbar = () => {

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Container>
                <Flex
                    mih={50}
                    gap="md"
                    justify="space-between"
                    align="flex-start"
                    direction="row"
                    wrap="wrap"
                >
                    <Flex
                        direction="row"
                        gap="sm"
                        align="center"
                    >
                        <Avatar color="blue" radius="sm" />
                        <Title order={3}>DuoLingue</Title>
                    </Flex>

                    <Flex
                        direction="row"
                        gap="md"
                        align="center"
                    >
                        <TextInput
                            placeholder="Search"
                        />

                        <Modal opened={opened} onClose={close} title="Authentication">
                            <LoginModal />
                        </Modal>

                        <Button onClick={open} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Login</Button>
                    </Flex>
                </Flex>
            </Container>
        </>
    );
};
