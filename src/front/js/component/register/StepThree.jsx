import React from "react";

import { Button, Group, Box, Space, ActionIcon, Center, Checkbox, Text } from '@mantine/core';
import { useForm } from '@mantine/form';

import { ArrowBack } from 'tabler-icons-react';

export const StepThree = (props) => {

    const form = useForm({
        initialValues: {
            school: false,
        },
    },
    );

    const nextStep = async (formValues) => {
        props.handleFormValues(formValues)
        props.handleActiveState(props.active + 1)
    }

    return (
        <Box mx="auto">
            <form onSubmit={form.onSubmit((formValues) => {
                nextStep(formValues);
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
    );
};
