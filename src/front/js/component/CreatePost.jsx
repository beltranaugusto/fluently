// React Imports
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";

// Mantine Imports
import { Card, Group, Button, Box, Title, MultiSelect, Space, TextInput, Textarea, Grid, Text, Checkbox, Center, Divider, Flex, ActionIcon } from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';

// Leaflet Imports
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { redIcon } from "../tools/redIconMarker";

// Icons Imports
import { Clock, Calendar, Check } from 'tabler-icons-react';

export const CreatePost = () => {

    const { store, actions } = useContext(Context);


    const [position, setPosition] = useState(null); // Coordinates selected for the location of the event.
    const [checked, setChecked] = useState(false); // Boolean value to represent if the event is online or not.
    const [creationSuccess, setCreationSuccess] = useState(false); // Boolean Value to check if the post was created.

    const navigate = useNavigate();

    // Create a marker on the map on click and get its coordinates. Used for the location of the new post.
    function LocationMarker() {
        const map = useMapEvents({
            click(e) {
                console.log(e.latlng)
                setPosition(e.latlng)
            },
        })
        return position === null ? null : (
            <Marker position={position} icon={redIcon}>
                <Popup>Event's Location</Popup>
            </Marker>
        )
    }

    // Calls the action of creating the post and asynchronously checks if it was a success. This is called when submitting the form.
    const checkSuccess = async (values) => {
        console.log({ ...values, position: position, user_id: store.user_data.id })
        if (await actions.createPost({ ...values, position: position, user_id: store.user_data.id }) == "bien") {
            setCreationSuccess(true)
        }
    }

    // Initialization of the form and its validations.
    const form = useForm({
        initialValues: {
            title: '',
            description: '',
            date: '',
            hour: '',
            tags: ''
        },

        validate: {
            title: (value) => (value.length > 3 ? null : 'Title too short.'),
            description: (value) => (value.length > 10 ? null : 'Description too short.'),
            date: (value) => (value.length != '' ? null : 'The event must have a date.'),
            hour: (value) => (value.length != '' ? null : 'The event must have an hour.'),
            tags: (value) => (value.length > 2 ? null : 'The event must have 3 tags.'),
        },
    },
    );

    return (
        <>
            <Card shadow="xl" padding="lg" radius="md" mb="sm" withBorder>

                {creationSuccess ?
                    <Box mx="auto" my={"xl"}>
                        <Flex direction={{ base: 'column' }} justify={"center"} align={"center"}>

                            {/*Success Message*/}
                            <ActionIcon color="green" size="xl" radius="xl" variant="outline"><Check size="2rem" /></ActionIcon>
                            <Title mt={"md"} order={5} className="text-center">Event Created Sucessfully</Title>

                            {/*Go Back Button*/}
                            <Button mt="lg" onClick={() => { navigate("/home") }} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Go back Home</Button>
                        </Flex>
                    </Box>
                    :
                    <>
                        {/*Page Title*/}
                        <Box sx={(theme) => ({ marginBottom: theme.spacing.sm, padding: theme.spacing.sm, borderRadius: theme.radius.sm, })}>
                            <Group position="center">
                                <Title align="center" order={3} weight={500} w="180px">Create Post</Title>
                            </Group>
                        </Box>

                        {/*Create Post Form*/}
                        <Box mx="auto">
                            <form onSubmit={form.onSubmit((values) => { checkSuccess(values) })}>

                                {/*Title Input*/}
                                <TextInput
                                    size="sm"
                                    label="Title"
                                    placeholder="Title"
                                    description="Describe your event with some few words."
                                    withAsterisk
                                    {...form.getInputProps('title')}
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
                                    {...form.getInputProps('description')}
                                />
                                <Space h="sm" />

                                {/*Date and Hour Input*/}
                                <Grid align="apart" grow>
                                    <Grid.Col span={6}>
                                        <DateInput
                                            minDate={new Date()}
                                            valueFormat="YYYY MM DD"
                                            description="Select when the date."
                                            label="Date"
                                            placeholder="Date"
                                            withAsterisk
                                            icon={<Calendar size="1rem" />}
                                            {...form.getInputProps('date')}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <TimeInput
                                            description="Write the hour. (PM/AM)"
                                            label="Hour"
                                            withAsterisk
                                            icon={<Clock size="1rem" />} ml="auto"
                                            {...form.getInputProps('hour')}
                                        />
                                    </Grid.Col>
                                </Grid>
                                <Space h="xl" />

                                {/* Is Online? Input*/}
                                <Divider variant="dashed" />
                                <Center>
                                    <Checkbox
                                        m={"md"}
                                        label={<Text weight={500}>Is your event online?</Text>}
                                        size={"md"}
                                        checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)}
                                    />
                                </Center>
                                <Divider variant="dashed" />

                                <Space h="md" />

                                {/* Checks if the checkbox was clicked*/}
                                {!checked ?
                                    <>
                                        {/*Location Input*/}
                                        <Text size={"sm"} weight={500}>Location<Text color="red" span> *</Text></Text>
                                        <Text mb={"-9px"} size={"xs"} color="dimmed">Click on the map to select where your event will take place, the blue marker is your current location.</Text>
                                        {/*Map*/}
                                        <Box className="border" sx={(theme) => ({ minHeight: "230px", textAlign: 'left', marginTop: theme.spacing.md, borderRadius: theme.radius.sm, cursor: 'pointer', position: "relative", zIndex: 1 })}>
                                            {store.currentLocation ?
                                                <MapContainer whenCreated={map => setMap({ map })} className="map" center={[store.currentLocation[0], store.currentLocation[1]]} zoom={13} scrollWheelZoom={false}>
                                                    <TileLayer
                                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                    />
                                                    <Marker position={[store.currentLocation[0], store.currentLocation[1]]}>
                                                        <Popup>
                                                            You are here.
                                                        </Popup>
                                                    </Marker>
                                                    <LocationMarker />
                                                </MapContainer>
                                                : null}
                                        </Box>

                                    </>
                                    : null}

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
                                    {...form.getInputProps('tags')}
                                />

                                <Space h="sm" />

                                {/*Submit Button*/}
                                <Group position="center" mt="md">
                                    <Button type="submit" size="lg" variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>Create Post</Button>
                                </Group>
                            </form>
                        </Box>
                    </>
                }








            </Card >
        </>
    );
};
