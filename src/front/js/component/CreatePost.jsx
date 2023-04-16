import React from "react";
import { DateInput, TimeInput } from '@mantine/dates';
import { Card, Group, Button, Box, Title, MultiSelect, Space, TextInput, Textarea, Grid } from '@mantine/core';
import { Location, Clock, Calendar } from 'tabler-icons-react';



export const CreatePost = () => {
    return (
        <>
            <Card shadow="xl" padding="lg" radius="md" mb="sm" withBorder>

                {/*Page Title*/}
                <Box sx={(theme) => ({ marginBottom: theme.spacing.sm, padding: theme.spacing.sm, borderRadius: theme.radius.sm, })}>
                    <Group position="center">
                        <Title align="center" order={3} weight={500} w="180px">Create Post</Title>
                    </Group>
                </Box>

                {/*Create Post Form*/}
                <Box mx="auto">
                    <form>

                        {/*Title Input*/}
                        <TextInput
                            size="sm"
                            label="Title"
                            placeholder="Title"
                            description="Describe your event with some few words."
                            withAsterisk
                        />
                        <Space h="sm" />

                        {/*Description Input*/}
                        <Textarea
                            placeholder="Description"
                            label="Description"
                            description="Write a good paragraph or two of what your event will be about."
                            autosize
                            withAsterisk
                            minRows={3}
                            maxRows={6}
                        />
                        <Space h="sm" />

                        {/*Tags Input*/}
                        <MultiSelect data={[
                            { value: 'Online', label: 'Online' },
                            { value: 'Casual', label: 'Casual' },
                            { value: 'Beginner', label: 'Beginner' },
                            { value: 'Intermediate', label: 'Intermediate' },
                        ]}
                            label="Tags"
                            placeholder="Tags"
                            description="Select some tags to better describe your event."
                            withAsterisk
                        />
                        <Space h="sm" />

                        {/*Location Input*/}
                        <TextInput
                            size="sm"
                            label="Location"
                            description="Write where your event will take place. (This will change with the implementation of google maps.)"
                            placeholder="Location"
                            withAsterisk
                            icon={<Location size="1rem" />}
                        />
                        <Space h="sm" />

                        {/*Date and Hour Input*/}
                        <Grid align="apart">
                            <Grid.Col span={6}>
                                <DateInput
                                    valueFormat="YYYY MMM DD"
                                    description="Select when the date."
                                    label="Date"
                                    placeholder="Date"
                                    withAsterisk
                                    maw={400}

                                    icon={<Calendar size="1rem" />}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TimeInput
                                    description="Write the hour. (PM/AM)"
                                    label="Hour"
                                    withAsterisk
                                    icon={<Clock size="1rem" />} maw={400} ml="auto" />
                            </Grid.Col>
                        </Grid>

                        {/*Submit Button*/}
                        <Group position="center" mt="md">
                            <Button type="submit" variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>Create Post</Button>
                        </Group>
                    </form>
                </Box>






            </Card >
        </>
    );
};
