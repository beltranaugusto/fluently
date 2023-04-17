import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";

import { StepOne } from "./StepOne.jsx";
import { StepTwo } from "./StepTwo.jsx";
import { StepThree } from "./StepThree.jsx";


import { Button, Group, Box, Title, Space, Divider, ActionIcon, Stepper, Center, Flex } from '@mantine/core';

import { Check } from 'tabler-icons-react';

export const Register = (props) => {
    const { actions } = useContext(Context);

    const [active, setActive] = useState(0);
    const [formValues, setFormValues] = useState({});

    const handleActiveState = (value) => {
        setActive(value)
    }

    const handleFormValues = (newValues) => {
        setFormValues({ ...formValues, ...newValues })
    }

    const signUp = async () => {
        await actions.signUp(formValues)
    }

    useEffect(() => {
        if (active == 3) {
            signUp(formValues)
        }
    }, [formValues]);

    return (
        <>
            <Title order={3} className="text-center">Fluently</Title>
            <Title order={1} className="text-center">Register</Title>

            <Space h="xl" />

            {active == 0 ? <StepOne handleActiveState={handleActiveState} handleFormValues={handleFormValues} active={active} setShow={props.setShow} /> : null}
            {active == 1 ? <StepTwo handleActiveState={handleActiveState} handleFormValues={handleFormValues} active={active} setShow={props.setShow} /> : null}
            {active == 2 ? <StepThree handleActiveState={handleActiveState} handleFormValues={handleFormValues} active={active} setShow={props.setShow} /> : null}
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
