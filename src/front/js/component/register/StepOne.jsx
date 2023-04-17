import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";

import { Button, Group, Box, TextInput, PasswordInput, Space, ActionIcon, Text } from '@mantine/core';
import { useForm } from '@mantine/form';

import { Lock, At, ArrowBack, User } from 'tabler-icons-react';

export const StepOne = (props) => {
    const { actions } = useContext(Context);

    const [emailAvailable, setEmailAvailable] = useState(true);

    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },

        validate: {
            name: (value) => (value.length > 3 ? null : 'Name too short.'),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length > 7 ? null : 'Invalid Password'),
            confirmPassword: (value, values) =>
                (value !== values.password ? 'Passwords did not match' : null),
        },
    },
    );

    const nextStep = async (formValues) => {
        if (await actions.checkEmail(form.values["email"]) == false) {
            setEmailAvailable(false)
        } else {
            props.handleFormValues(formValues)
            props.handleActiveState(props.active + 1)
        }
    }

    return (
        <Box mx="auto">
            <form onSubmit={form.onSubmit((formValues) => {
                nextStep(formValues)
            })}>

                {/*Name Input*/}
                <TextInput
                    size="md"
                    label="Name"
                    placeholder="John Doe"
                    withAsterisk
                    icon={<User size="1rem" />}
                    description="If you are a school, write the name of the school."
                    {...form.getInputProps('name')}
                />
                <Space h="sm" />

                {/*Email Input*/}
                <TextInput
                    size="md"
                    label="Email"
                    placeholder="your@email.com"
                    withAsterisk
                    icon={<At size="1rem" />}
                    {...form.getInputProps('email')}
                />
                {emailAvailable ? null : <Text fz="sm" c="red">Email unavailable.</Text>}
                <Space h="sm" />

                {/*Password Input*/}
                <PasswordInput
                    size="md"
                    placeholder="Password"
                    label="Password"
                    withAsterisk
                    description="Password must be at least 8 characters long."
                    icon={<Lock size="1rem" />}
                    {...form.getInputProps('password')}
                />
                <Space h="sm" />

                {/*Confirm Password Input*/}
                <PasswordInput
                    size="md"
                    placeholder="Confirm Password"
                    icon={<Lock size="1rem" />}
                    {...form.getInputProps('confirmPassword')}
                />

                {/*Continue Input*/}
                <Group position="apart" mt="md">
                    <ActionIcon onClick={() => props.setShow(false)} size="lg" variant="outline"><ArrowBack size="1rem" /></ActionIcon>
                    <Button type="submit">Continue</Button>
                </Group>
            </form>
        </Box>
    );
};
