import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { Card, Group, Text, Button, ActionIcon, Box, Grid, Avatar, ScrollArea, Badge } from '@mantine/core';
import { DeviceGamepad, Star } from 'tabler-icons-react';
import { redIcon } from "../tools/redIconMarker";




export const Post = () => {

    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const [post, setPost] = useState()


    useEffect(() => {
        getPost()
    }, []);

    const getPost = async () => {
        setPost(await actions.getPost(id))
    }

    return (
        <>
            <Card shadow="xl" padding="lg" radius="md" mb="sm" withBorder>

                {/*Title*/}
                <Box sx={(theme) => ({ textAlign: 'left', marginBottom: theme.spacing.xs, padding: theme.spacing.md, borderRadius: theme.radius.sm, })}>
                    <Group position="apart">
                        <Text weight={500} w="180px">{post?.title}</Text>
                        <ActionIcon size="xl" color="blue">
                            <DeviceGamepad size="5em" />
                        </ActionIcon>
                    </Group>
                    <Text mt="xs" fs={"italic"} size="xs" color="dimmed" weight={400}>
                        Starts on:
                    </Text>
                    <Text fs={"italic"} size="xs" color="dimmed" weight={400}>
                        {post?.date}
                    </Text>
                </Box>

                <Text align="center" mb={"sm"}>
                    {
                        post?.tags?.map((item) => {
                            return <Badge m={"3px"} size="lg" radius="sm" color={item[1]}>{item[0]}</Badge>
                        })
                    }
                </Text>



                {/*About*/}
                <Box className="border" sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], textAlign: 'left', marginBottom: theme.spacing.md, padding: theme.spacing.lg, borderRadius: theme.radius.sm })}>

                    <Text mt={"sm"} size="xs" color="dimmed">
                        {post?.description}
                    </Text>
                </Box>

                {/*Post Creator*/}
                <Grid>
                    <Grid.Col span="auto" className="d-flex align-items-center">
                        <Avatar className="mx-auto" size="lg" radius="sm" />
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <Box sx={(theme) => ({ textAlign: 'left', padding: theme.spacing.sm, borderRadius: theme.radius.sm, cursor: 'pointer', })}>

                            <Group position="apart" align="start">
                                <div>
                                    <Text size="md" transform="capitalize" weight={500}>{post?.user_name}</Text>
                                    <Text size="xs" weight={500}>{post?.user_languages.map((item) => { return (item + " ") })}</Text>
                                    <Text mt={"sm"} size="xs" weight={500}>{post?.user_country}, {post?.user_city}</Text>
                                </div>
                                <div className="d-flex">
                                    <Text mt={"5px"} mb={"auto"} mr={"1px"} size="xs">4.78</Text>
                                    <ActionIcon size="md" color="yellow">
                                        <Star size="1.3em" />
                                    </ActionIcon>
                                </div>

                            </Group>
                        </Box>
                    </Grid.Col>
                </Grid>

                {/*Map with Location*/}

                <Box className="border" sx={(theme) => ({ minHeight: "230px", textAlign: 'left', marginTop: theme.spacing.md, borderRadius: theme.radius.sm, cursor: 'pointer', })}>
                    {post?.location ?
                        <MapContainer className="map" center={[post.location[0], post.location[1]]} zoom={13} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[post.location[0], post.location[1]]} icon={redIcon}>
                                <Popup>
                                    Event's Location.
                                </Popup>
                            </Marker>
                            <Marker position={[store.currentLocation[0], store.currentLocation[1]]}>
                                <Popup>
                                    You are here.
                                </Popup>
                            </Marker>
                        </MapContainer>
                        : null}
                </Box>

                {/*I Will Go Button*/}
                <Group mt={"md"} grow>
                    <Button onClick={() => { navigate(-1) }} variant="gradient" gradient={{ from: 'lime', to: 'green' }}>I Will Go</Button>
                </Group>

                {/*Attendees*/}
                <Box className="border" sx={(theme) => ({ marginTop: theme.spacing.md, padding: theme.spacing.md, minHeight: "70px", backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], borderRadius: theme.radius.sm, })}>
                    <Text size="sm" color="dimmed" weight={400}>
                        <Text fw={500} span>{post?.attendees.length}</Text> Attendees
                    </Text>
                    <ScrollArea>
                        <Box sx={(theme) => ({ display: "flex" })}>
                            {post?.attendees.map((item) => {
                                return (
                                    <Box sx={(theme) => ({ minWidth: "40px", backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], textAlign: 'center', borderRadius: theme.radius.sm, cursor: 'pointer', margin: theme.spacing.xs, })}>
                                        <Avatar className="mx-auto" size="lg" radius="sm" />
                                        <Text size="xs" color="dimmed" transform="capitalize">{item[0]}</Text>
                                        {/* Arreglar Apellido*/}
                                        {/* <Text size="xs" mt={"-3px"} color="dimmed">Liscano</Text> */}
                                    </Box>
                                )
                            })}
                        </Box>
                    </ScrollArea>
                </Box>

            </Card >
        </>
    );
};
