import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

// Mantine Components and Icons import.
import { useForm } from '@mantine/form';
import { Lock, At, ArrowBack, User, Location } from 'tabler-icons-react';
import {
    Button, Group, Box, TextInput, PasswordInput, Title,
    Space, Divider, MultiSelect, ActionIcon, Stepper, Center,
    Select, Checkbox, Text
}
    from '@mantine/core';

export const Register = (props) => {
    const { store, actions } = useContext(Context);

    // 'active' is the state that controls the steps of the register form. It also updates the Stepper component with the correspondent step.
    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    // 'formOne' is the basic information form. Email, Name and Password are here.
    const formOne = useForm({
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

    // 'formTwo' is the languages and location form. Languages, Country and City are here.
    const formTwo = useForm({
        initialValues: {
            languages: '',
            country: '',
            city: '',
        },

        validate: {
            languages: (value) => (value.length > 0 ? null : 'You must select at least a language.'),
            country: (value) => (value.length > 0 ? null : 'You must select a country.'),
            city: (value) => (value.length > 0 ? null : 'You must write a city.'),
        },
    },
    );

    // 'formThree' is the additional information form. Is a School? is here.
    const formThree = useForm({
        initialValues: {
            school: '',
        },

    },
    );

    // 'continueForm' is a handler that checks if the form is valid before changing to the next step.
    const continueForm = (formValues) => {
        if (formValues.isValid()) {
            nextStep()
        }
    }


    return (
        <>
            <Title order={3} className="text-center">DuoLingo</Title>
            <Title order={1} className="text-center">Register</Title>

            <Space h="xl" />

            {active == 0 ?
                <Box mx="auto">
                    <form onSubmit={formOne.onSubmit((values) => {
                        console.log(values)
                        continueForm(formOne)
                    })}>
                        <TextInput
                            size="md"
                            label="Name"
                            placeholder="John Doe"
                            withAsterisk
                            icon={<User size="1rem" />}
                            description="If you are a school, write the name of the school."
                            {...formOne.getInputProps('name')}
                        />
                        <Space h="sm" />
                        <TextInput
                            size="md"
                            label="Email"
                            placeholder="your@email.com"
                            withAsterisk
                            icon={<At size="1rem" />}
                            {...formOne.getInputProps('email')}
                        />
                        <Space h="sm" />
                        <PasswordInput
                            size="md"
                            placeholder="Password"
                            label="Password"
                            withAsterisk
                            description="Password must be at least 8 characters long."
                            icon={<Lock size="1rem" />}
                            {...formOne.getInputProps('password')}
                        />
                        <Space h="sm" />
                        <PasswordInput
                            size="md"
                            placeholder="Confirm Password"
                            icon={<Lock size="1rem" />}
                            {...formOne.getInputProps('confirmPassword')}
                        />
                        <Group position="apart" mt="md">
                            <ActionIcon onClick={() => props.setShow(false)} size="lg" variant="outline"><ArrowBack size="1rem" /></ActionIcon>
                            <Button type="submit">Continue</Button>
                        </Group>
                    </form>
                </Box>
                : null}

            {active == 1 ?
                <Box mx="auto">
                    <form onSubmit={formTwo.onSubmit((values) => {
                        console.log(values);
                        continueForm(formTwo);
                    })}>
                        <MultiSelect data={[
                            { value: 'English', label: 'English' },
                            { value: 'Spanish', label: 'Spanish' },
                            { value: 'French', label: 'French' },
                            { value: 'Italian', label: 'Italian' },
                        ]}
                            label="Pick the languages you are interested in"
                            placeholder="Select the languages."
                            withAsterisk
                            {...formTwo.getInputProps('languages')}
                        />
                        <Space h="sm" />
                        <Select data={[
                            { value: 'United States', label: 'United States' },
                            { value: 'Venezuela', label: 'Venezuela' },
                            { value: 'Colombia', label: 'Colombia' }
                        ]}
                            label="Where are you from?"
                            placeholder="Select a country."
                            withAsterisk
                            {...formTwo.getInputProps('country')}
                        />
                        <Space h="sm" />
                        <TextInput
                            size="sm"
                            label="Write the name of your city of residence"
                            placeholder="Write the name of your city."
                            withAsterisk
                            icon={<Location size="1rem" />}
                            {...formTwo.getInputProps('city')}
                        />

                        <Group position="apart" mt="md">
                            <ActionIcon onClick={() => props.setShow(false)} size="lg" variant="outline"><ArrowBack size="1rem" /></ActionIcon>
                            <Button type="submit">Continue</Button>
                        </Group>
                    </form>
                </Box>
                : null}

            {active == 2 ?
                <Box mx="auto">
                    <form onSubmit={formThree.onSubmit((values) => {
                        console.log(values);
                        continueForm(formThree);
                    })}>
                        <Box sx={(theme) => ({
                            width: '240px',
                            textAlign: 'center'
                        })}>

                            <Text fz="sm" fw={500}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </Text>
                        </Box>

                        <Space h="sm" />

                        <Center>
                            <Checkbox
                                label="Are you an School?"
                            />
                        </Center>
                        <Space h="sm" />


                        <Group position="apart" mt="md">
                            <ActionIcon onClick={() => props.setShow(false)} size="lg" variant="outline"><ArrowBack size="1rem" /></ActionIcon>
                            <Button type="submit">Continue</Button>
                        </Group>
                    </form>
                </Box>
                : null}


            <Space h="lg" />
            <Divider my="sm" />
            <Space h="lg" />

            <Center mx="auto">
                <Stepper size="xs" breakpoint="sm" active={active} onStepClick={setActive}>
                    <Stepper.Step label="First step" description="Basic Information">
                    </Stepper.Step>
                    <Stepper.Step label="Second step" description="Language Preferences">
                    </Stepper.Step>
                    <Stepper.Step label="Final step" description="Finishing up">
                    </Stepper.Step>
                    <Stepper.Completed>
                    </Stepper.Completed>
                </Stepper>
            </Center>

        </>
    );
};
