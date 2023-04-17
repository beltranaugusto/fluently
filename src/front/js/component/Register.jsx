import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

// Mantine Components and Icons import.
import { useForm } from '@mantine/form';



import { Lock, At, ArrowBack, User, Location, Check, X } from 'tabler-icons-react';
import {
    Button, Group, Box, TextInput, PasswordInput, Title,
    Space, Divider, MultiSelect, ActionIcon, Stepper, Center,
    Select, Checkbox, Text, Flex
}
    from '@mantine/core';

export const Register = (props) => {
    const { store, actions } = useContext(Context);

    // 'active' is the state that controls the steps of the register form. It also updates the Stepper component with the correspondent step.
    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));

    // State for checking if the email if available.
    const [emailAvailable, setEmailAvailable] = useState(true);

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
            school: false,
        },

    },
    );

    //  Function that attemps to sign up with the data from the forms in each step.
    const signUp = async () => {
        actions.signUp({ ...formOne.values, ...formTwo.values, ...formThree.values })
        nextStep()
    }

    // 'continueForm' is a handler that checks if the form is valid before changing to the next step.
    const continueForm = async (formValues) => {
        if (formValues.isValid()) {

            // Checking if the email is available.
            if (active == 0) {
                if (await actions.checkEmail(formOne.values["email"]) == "error") {
                    setEmailAvailable(false)
                } else {
                    nextStep()
                }
            }
            // If at last step, attemp to signup.
            else if (active == 2) {
                console.log("Sign up attemp")
                signUp()
            } else {
                nextStep()
            }

        }
    }


    return (
        <>
            <Title order={3} className="text-center">Fluently</Title>
            <Title order={1} className="text-center">Register</Title>

            <Space h="xl" />

            {/*First Step*/}
            {active == 0 ?
                <Box mx="auto">
                    <form onSubmit={formOne.onSubmit((values) => {
                        console.log(values)
                        continueForm(formOne)
                    })}>

                        {/*Name Input*/}
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

                        {/*Email Input*/}
                        <TextInput
                            size="md"
                            label="Email"
                            placeholder="your@email.com"
                            withAsterisk
                            icon={<At size="1rem" />}
                            {...formOne.getInputProps('email')}
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
                            {...formOne.getInputProps('password')}
                        />
                        <Space h="sm" />

                        {/*Confirm Password Input*/}
                        <PasswordInput
                            size="md"
                            placeholder="Confirm Password"
                            icon={<Lock size="1rem" />}
                            {...formOne.getInputProps('confirmPassword')}
                        />

                        {/*Continue Input*/}
                        <Group position="apart" mt="md">
                            <ActionIcon onClick={() => props.setShow(false)} size="lg" variant="outline"><ArrowBack size="1rem" /></ActionIcon>
                            <Button type="submit">Continue</Button>
                        </Group>
                    </form>
                </Box>
                : null}

            {/*Second Step*/}
            {active == 1 ?
                <Box mx="auto">
                    <form onSubmit={formTwo.onSubmit((values) => {
                        console.log(values);
                        continueForm(formTwo);
                    })}>

                        {/*Languages Input*/}
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

                        {/*Country Input*/}
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

                        {/*City Input*/}
                        <TextInput
                            size="sm"
                            label="Write the name of your city of residence"
                            placeholder="Write the name of your city."
                            withAsterisk
                            icon={<Location size="1rem" />}
                            {...formTwo.getInputProps('city')}
                        />

                        {/*Continue Button*/}
                        <Group position="apart" mt="md">
                            <ActionIcon onClick={() => props.setShow(false)} size="lg" variant="outline"><ArrowBack size="1rem" /></ActionIcon>
                            <Button type="submit">Continue</Button>
                        </Group>
                    </form>
                </Box>
                : null}

            {/*Step Three*/}
            {active == 2 ?
                <Box mx="auto">
                    <form onSubmit={formThree.onSubmit((values) => {
                        console.log(values);
                        continueForm(formThree);
                    })}>

                        {/*Info Message*/}
                        <Box sx={(theme) => ({
                            width: '240px',
                            textAlign: 'center'
                        })}>

                            <Text fz="sm" fw={500}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </Text>
                        </Box>

                        <Space h="sm" />

                        {/*Are you a School? Input*/}
                        <Center>
                            <Checkbox
                                label="Are you a School?"
                            />
                        </Center>
                        <Space h="sm" />

                        {/*Continue Button*/}
                        <Group position="apart" mt="md">
                            <ActionIcon onClick={() => props.setShow(false)} size="lg" variant="outline"><ArrowBack size="1rem" /></ActionIcon>
                            <Button type="submit">Finish</Button>
                        </Group>
                    </form>
                </Box>
                : null}

            {/*Last Step*/}
            {active == 3 ?
                <Box mx="auto">
                    <Flex direction={{ base: 'column' }}>

                        {/*Success Message*/}
                        <Group position="apart" mt="md">
                            <Title order={5} className="text-center">Signed Up Sucessfully</Title>
                            <ActionIcon color="green" size="xl" radius="xl" variant="outline"><Check size="2rem" /></ActionIcon>
                        </Group>

                        {/*Go Back Button*/}
                        <Button mt="lg" onClick={() => props.setShow(false)} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Go back and Log In</Button>
                    </Flex>
                </Box>
                : null}


            <Space h="lg" />
            <Divider my="sm" />
            <Space h="lg" />

            {/*Stepper*/}
            <Center mx="auto">
                <Stepper size="xs" breakpoint="sm" active={active}>
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
