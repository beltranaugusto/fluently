import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Card, Group, Text, Button, ActionIcon, Box, Grid, Avatar, ScrollArea, Badge, Center, Stack, Divider, Space } from '@mantine/core';
import { DeviceGamepad, Star, CalendarEvent, Location } from 'tabler-icons-react';
import { redIcon } from "../tools/redIconMarker";
import { PostCard } from "./PostCard.jsx";




export const Profile = () => {

    const { store, actions } = useContext(Context);
    const [posts, setPosts] = useState([])
    const [currentLocation, setCurrentLocation] = useState([])

    const { id } = useParams();


    useEffect(() => {
        postsList()
        if (store.currentLocation)
            setCurrentLocation(store.currentLocation)
    }, [store.currentLocation]);

    const postsList = async () => {
        setPosts(await actions.getPosts())
    }


    return (
        <>
            <Card shadow="xl" padding="lg" radius="md" mb="sm" withBorder>

                {/*Profile Pic*/}
                <Center>
                    <Avatar size="xl" src={null} alt="no image here" />
                </Center>

                {/*Profile Info Box*/}
                <Box mt={"md"} sx={(theme) => ({ textAlign: 'left', padding: theme.spacing.sm, borderRadius: theme.radius.sm, cursor: 'pointer', })}>

                    {/*Name, Country, Languages and Rating*/}
                    <Group position="apart" align="start">
                        <div>
                            <Text size="md" transform="capitalize" weight={500}>Luis Liscano</Text>
                            <Text size="xs" weight={500}>English, Spanish</Text>
                            <Text size="xs" weight={500}>Venezuela, Caracas</Text>
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
                    <Text size={"xs"} mt={"sm"}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sapien orci, sagittis sodales ipsum vitae, finibus placerat nibh. Vestibulum lacus elit, pretium eget lectus vehicula, viverra tempus mauris. Etiam venenatis suscipit ligula, et lacinia nunc.
                    </Text>

                    {/*Connect, Assisted and Created*/}
                    <Group position="apart" align="center" mt={"md"}>

                        <Button variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>Connect</Button>

                        <Stack align="center" spacing={"0px"}>
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
                </Box>

                {/*Connections*/}
                <Box className="border" sx={(theme) => ({ marginTop: theme.spacing.md, padding: theme.spacing.md, minHeight: "70px", backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], borderRadius: theme.radius.sm, })}>
                    <Text size="sm" color="dimmed" weight={400}>
                        <Text fw={500} span>12</Text> Connections
                    </Text>
                    <ScrollArea>
                        <Box sx={(theme) => ({ display: "flex" })}>
                            <Box sx={(theme) => ({ minWidth: "40px", backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], textAlign: 'center', borderRadius: theme.radius.sm, cursor: 'pointer', margin: theme.spacing.xs, })}>
                                <Avatar className="mx-auto" size="lg" radius="sm" />
                                <Text size="xs" color="dimmed" transform="capitalize">Raamses</Text>
                                <Text size="xs" mt={"-3px"} color="dimmed">Garcia</Text>
                            </Box>
                            <Box sx={(theme) => ({ minWidth: "40px", backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], textAlign: 'center', borderRadius: theme.radius.sm, cursor: 'pointer', margin: theme.spacing.xs, })}>
                                <Avatar className="mx-auto" size="lg" radius="sm" />
                                <Text size="xs" color="dimmed" transform="capitalize">Nier</Text>
                                <Text size="xs" mt={"-3px"} color="dimmed">Automata</Text>
                            </Box>
                            <Box sx={(theme) => ({ minWidth: "40px", backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], textAlign: 'center', borderRadius: theme.radius.sm, cursor: 'pointer', margin: theme.spacing.xs, })}>
                                <Avatar className="mx-auto" size="lg" radius="sm" />
                                <Text size="xs" color="dimmed" transform="capitalize">Alianza</Text>
                                <Text size="xs" mt={"-3px"} color="dimmed">Francesa</Text>
                            </Box>
                            <Box sx={(theme) => ({ minWidth: "40px", backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], textAlign: 'center', borderRadius: theme.radius.sm, cursor: 'pointer', margin: theme.spacing.xs, })}>
                                <Avatar className="mx-auto" size="lg" radius="sm" />
                                <Text size="xs" color="dimmed" transform="capitalize">Luis</Text>
                                <Text size="xs" mt={"-3px"} color="dimmed">Liscano</Text>
                            </Box>
                            <Box sx={(theme) => ({ minWidth: "40px", backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], textAlign: 'center', borderRadius: theme.radius.sm, cursor: 'pointer', margin: theme.spacing.xs, })}>
                                <Avatar className="mx-auto" size="lg" radius="sm" />
                                <Text size="xs" color="dimmed" transform="capitalize">Michelle</Text>
                                <Text size="xs" mt={"-3px"} color="dimmed">Chacin</Text>
                            </Box>
                            <Box sx={(theme) => ({ minWidth: "40px", backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], textAlign: 'center', borderRadius: theme.radius.sm, cursor: 'pointer', margin: theme.spacing.xs, })}>
                                <Avatar className="mx-auto" size="lg" radius="sm" />
                                <Text size="xs" color="dimmed" transform="capitalize">Eid</Text>
                                <Text size="xs" mt={"-3px"} color="dimmed">Mubarak</Text>
                            </Box>

                        </Box>
                    </ScrollArea>
                </Box>

            </Card >
            {
                posts?.map((item) => {
                    if (item.user_id == 5) return <PostCard key={item.id} data={item} currentLocation={currentLocation} />;
                })
            }
        </>
    );
};
