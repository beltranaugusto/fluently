import React from "react";

import { Button, Group, Box, TextInput, Space, MultiSelect, ActionIcon, Select } from '@mantine/core';
import { useForm } from '@mantine/form';

import { ArrowBack, Location } from 'tabler-icons-react';

export const StepTwo = (props) => {

    const form = useForm({
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

    const nextStep = async (formValues) => {
        props.handleFormValues(formValues)
        props.handleActiveState(props.active + 1)
    }

    return (
        <Box mx="auto">
            <form onSubmit={form.onSubmit((formValues) => {
                nextStep(formValues);
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
                    {...form.getInputProps('languages')}
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
                    {...form.getInputProps('country')}
                />
                <Space h="sm" />

                {/*City Input*/}
                <TextInput
                    size="sm"
                    label="Write the name of your city of residence"
                    placeholder="Write the name of your city."
                    withAsterisk
                    icon={<Location size="1rem" />}
                    {...form.getInputProps('city')}
                />

                {/*Continue Button*/}
                <Group position="apart" mt="md">
                    <ActionIcon onClick={() => props.setShow(false)} size="lg" variant="outline"><ArrowBack size="1rem" /></ActionIcon>
                    <Button type="submit">Continue</Button>
                </Group>
            </form>
        </Box>
    );
};
