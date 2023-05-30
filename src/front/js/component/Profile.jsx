import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Card, Group, Text, Button, ActionIcon, Box, Grid, Avatar, ScrollArea, Badge, Center, Stack, Divider, Space, Title } from '@mantine/core';
import { DeviceGamepad, Star, CalendarEvent, Location } from 'tabler-icons-react';
import { redIcon } from "../tools/redIconMarker";
import { PostCard } from "./PostCard.jsx";




export const Profile = () => {

    const { store, actions } = useContext(Context);
    const [user, setUser] = useState([])

    const [currentLocation, setCurrentLocation] = useState([])
    const [eventsToggle, setEventsToggle] = useState(false)

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getUser()
    }, [id]);

    useEffect(() => {
        if (store.currentLocation)
            setCurrentLocation(store.currentLocation)
    }, [store.currentLocation]);

    const getUser = async () => {
        let data = await actions.getUser(id)
        if (data) {
            setUser(data)
        } else {
            navigate("/home")
        }
    }

    const checkIfFollowed = () => {
        for (let item of store.user_data?.followed) {
            if (item.id === user.id) {
                return true
            }
        }
    }


    return (
        <>
            <Card shadow="xs" padding="lg" radius="md" withBorder align="right">
                {user?.is_school ? <Badge m={"3px"} size="lg" radius="sm" color={"green"} variant="filled">Academy</Badge> : null}

                {/*Profile Pic*/}
                <Center>
                    <Avatar size="xl" src={null} alt="no image here" />
                </Center>

                {/*Profile Info Box*/}
                <Box mt={"md"} sx={(theme) => ({ textAlign: 'left', padding: theme.spacing.sm, borderRadius: theme.radius.sm, cursor: 'pointer', })}>

                    {/*Name, Country, Languages and Rating*/}
                    <Group position="apart" align="start">
                        <div>
                            <Text size="md" transform="capitalize" weight={500}>{user?.name}</Text>
                            <Text size="xs" weight={500}>{user?.languages?.map((language, index) => {
                                if (index === user?.languages.length - 1) {
                                    return (language)
                                } else {
                                    return (language + ", ")
                                }
                            }
                            )}
                            </Text>
                            <Text size="xs" weight={500}>{user?.country}, {user?.city}</Text>
                        </div>
                        <Stack align="center" spacing={"0px"}>
                            <Group spacing={"0px"}>
                                <Text mt={"5px"} mb={"auto"} mr={"1px"} size="xs">4.78</Text>
                                <ActionIcon size="md" color="yellow">
                                    <Star size="1.3em" />
                                </ActionIcon>
                            </Group>
                            <Text size="xs" color="dimmed">118 Ratings</Text>
                        </Stack>
                    </Group>

                    {/*About Me*/}
                    <Text size={"xs"} mt={"sm"} maw={"30rem"}>
                        {user?.about_me}

                    </Text>

                    {/*Connect, Assisted and Created*/}
                    <Group position="apart" align="center" mt={"md"}>

                        {checkIfFollowed() ?
                            <Button onClick={() => actions.follow({ user1_id: store.user_data.id, user2_id: user?.id })} variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 105 }}>Unfollow</Button>
                            :
                            (store.user_data.id === user?.id ?
                                <Button disabled variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>Follow</Button>
                                :
                                <Button onClick={() => actions.follow({ user1_id: store.user_data.id, user2_id: user?.id })} variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>Connect</Button>
                            )
                        }

                        <Group>
                            <Stack align="center" spacing={"0px"} mx={"sm"}>
                                <Group spacing={"0px"}>
                                    <Text mt={"5px"} mb={"auto"} mr={"1px"} size="xs">34</Text>
                                    <ActionIcon size="md">
                                        <CalendarEvent size="1.3em" />
                                    </ActionIcon>
                                </Group>
                                <Text size="xs" color="dimmed">Events Assisted</Text>
                            </Stack>

                            <Stack align="center" spacing={"0px"}>
                                <Group spacing={"0px"}>
                                    <Text mt={"5px"} mb={"auto"} mr={"1px"} size="xs">34</Text>
                                    <ActionIcon size="md">
                                        <Location size="1.3em" />
                                    </ActionIcon>
                                </Group>
                                <Text size="xs" color="dimmed">Events Created</Text>
                            </Stack>
                        </Group>

                    </Group>
                </Box>

                {/*Connections*/}
                <Box className="border" sx={(theme) => ({ textAlign: "left", marginTop: theme.spacing.md, padding: theme.spacing.md, minHeight: "70px", backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], borderRadius: theme.radius.sm, })}>
                    <Text size="sm" color="dimmed" weight={400}>
                        <Text fw={500} span>{user?.followed?.length}</Text> Connections
                    </Text>
                    <ScrollArea>
                        <Box sx={(theme) => ({ display: "flex" })}>
                            {
                                user?.followed?.map((item) => {
                                    return (
                                        <Box onClick={() => navigate("/profile/" + item.id)} sx={(theme) => ({ minWidth: "40px", backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], textAlign: 'center', borderRadius: theme.radius.sm, cursor: 'pointer', margin: theme.spacing.xs, })}>
                                            <Avatar className="mx-auto" size="lg" radius="sm" />
                                            <Text size="xs" color="dimmed" transform="capitalize">{item.name}</Text>
                                        </Box>
                                    )
                                })
                            }



                        </Box>
                    </ScrollArea>
                </Box>

            </Card >


            <Center>
                {user?.posts?.length === 0 ?
                    <Badge className={`${eventsToggle ? "transparentBg" : null}`} onClick={() => setEventsToggle(false)} color="orange" size="lg" fw={500} my={"md"} order={4}>{store.user_data.id === user?.id ? "You Have No Active Events" : "This User has No Active Events"}</Badge>
                    :
                    <Badge
                        onClick={() => setEventsToggle(false)}
                        color="green" size="lg" fw={500} my={"md"} order={4}
                        className={`${eventsToggle ? "transparentBg" : null}`}
                    >
                        {store.user_data.id === user?.id ? "Your Active Events" : "Active Events of this User"}
                    </Badge>
                }

                {store.user_data.id === user?.id ?
                    <Badge
                        onClick={() => setEventsToggle(true)}
                        className={`${eventsToggle ? null : "transparentBg"}`}
                        ml={"xs"} color="orange" size="lg" fw={500} my={"md"} order={4}
                    >
                        Finished Events
                    </Badge>
                    : null}


            </Center>

            <Grid gutter={"md"}>
                {
                    user?.posts?.map((item) => {
                        if (eventsToggle) {
                            if (item.available == false) {
                                return (
                                    <Grid.Col key={item.id} sm={12} md={6}>
                                        <PostCard key={item.id} data={item} currentLocation={currentLocation} />
                                    </Grid.Col>
                                )
                            }
                        } else {
                            if (item.available == true) {
                                return (
                                    <Grid.Col key={item.id} sm={12} md={6}>
                                        <PostCard key={item.id} data={item} currentLocation={currentLocation} />
                                    </Grid.Col>
                                )
                            }
                        }
                    })
                }
            </Grid>
        </>
    );
};
