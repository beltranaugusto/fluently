import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';

import { Button, Group, Box, TextInput, PasswordInput, Title, Space, Divider, Stack, Notification } from '@mantine/core';
import { useForm } from '@mantine/form';

import { Lock, At, X } from 'tabler-icons-react';


export const Login = (props) => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [loginFailed, setLoginFailed] = useState(false);

    useEffect(() => {
        if (store.token != null) {
            navigate("/home");
        }
    }, [store.token, loginFailed]);

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length > 7 ? null : 'Invalid Password'),
        },
    });

    const logIn = async (values) => {
        if (await actions.logIn(values) == false) {
            setLoginFailed(true)
        }
    }

    return (
        <>
            <Title order={3} className="text-center">Fluently</Title>
            <Title order={1} className="text-center">Login</Title>
            <Space h="xl" />
            <Box mx="auto">
                <form onSubmit={form.onSubmit(async (values) => { logIn(values) })}>
                    {/*Email Input*/}
                    <TextInput size="md" label="Email" placeholder="your@email.com" icon={<At size="1rem" />} {...form.getInputProps('email')} />
                    <Space h="sm" />

                    {/*Password Input*/}
                    <PasswordInput size="md" placeholder="Password" label="Password" icon={<Lock size="1rem" />} {...form.getInputProps('password')} />

                    {/*Login Button*/}
                    <Group position="right" mt="md">
                        <Button type="submit">Login</Button>
                    </Group>

                </form>
            </Box>

            <Space h="lg" />
            <Divider my="sm" />
            <Space h="lg" />

            {/*Register or Login with Google Buttons*/}
            <Stack h={300} >
                <Button variant="outline">Login with Google</Button>
                <Button onClick={() => props.setShow(true)} variant="outline">Register a New Account</Button>
            </Stack>


            {/*Login Failed Message*/}
            {loginFailed ?
                <Notification onClick={() => setLoginFailed(false)} icon={<X size="1.1rem" />} color="red">
                    Bad Credentials!
                </Notification> : null}
        </>
    );
};
