import React from "react";

import { Button, Group, Box, Space, ActionIcon, Center, Checkbox, Text, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';

import { ArrowBack } from 'tabler-icons-react';

export const StepThree = (props) => {

    const form = useForm({
        initialValues: {
            is_school: false,
            about_me: ''
        },

        validate: {
            about_me: (value) => (value.length > 15 ? null : 'About me too short.'),
        }
    }
    );

    const nextStep = async (formValues) => {
        props.handleFormValues(formValues)
        props.handleActiveState(props.active + 1)
    }

    return (
        <Box mx="auto">
            <form onSubmit={form.onSubmit((formValues) => {
                console.log(formValues)
                nextStep(formValues);
            })}>

                {/*About Me Input*/}
                <Textarea
                    placeholder="About Me"
                    label="About Me"
                    description="Write a small paragraph talking a little bit of yourself or your organization."
                    autosize
                    withAsterisk
                    minRows={1}
                    maxRows={3}
                    {...form.getInputProps('about_me')}
                />

                <Space h="sm" />

                {/*Are you a School? Input*/}

                <Text color="dimmed" size={"xs"} mb={"xs"}>If you are creating the profile of a school/academy please check this box. This allows your profile to appear featured in a special section.</Text>
                <Checkbox
                    label="Are you a School?"
                    {...form.getInputProps('is_school')}
                />

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
