import React, { useContext } from "react";
import { Context } from "../store/appContext";

// Mantine Components and Icons import.
import { useForm } from '@mantine/form';
import { Lock, At } from 'tabler-icons-react';
import { Button, Group, Box, TextInput, PasswordInput, Title, Space, Divider, Stack } from '@mantine/core';

export const Login = (props) => {

    const { store, actions } = useContext(Context);

    // I'm using the Form feature of Mantine to capture and validate the form values.
    const form = useForm({

        // Setting up the inital values.
        initialValues: {
            email: '',
            password: '',
        },

        // Setting up the validation conditions.
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length > 8 ? null : 'Invalid Password'),
        },
    });

    return (
        <>
            <Title order={3} className="text-center">DuoLingo</Title>
            <Title order={1} className="text-center">Login</Title>
            <Space h="xl" />
            <Box mx="auto">
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <TextInput
                        size="md"
                        label="Email"
                        placeholder="your@email.com"
                        icon={<At size="1rem" />}
                        {...form.getInputProps('email')}
                    />
                    <Space h="sm" />
                    <PasswordInput
                        size="md"
                        placeholder="Password"
                        label="Password"
                        icon={<Lock size="1rem" />}
                        {...form.getInputProps('password')}
                    />
                    <Group position="right" mt="md">
                        <Button type="submit">Login</Button>
                    </Group>
                </form>
            </Box>

            <Space h="lg" />
            <Divider my="sm" />
            <Space h="lg" />

            <Stack h={300} >
                <Button variant="outline">Login with Google</Button>
                <Button onClick={() => props.setShow(true)} variant="outline">Register a New Account</Button>
            </Stack>
        </>
    );
};
