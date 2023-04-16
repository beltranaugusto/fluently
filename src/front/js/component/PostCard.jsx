import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';

import { Card, Group, Text, Button, Badge, ActionIcon, Stack } from '@mantine/core';

import { DeviceGamepad, Music, Abc, AerialLift, Armchair, Backpack, BallFootball, Ballpen } from 'tabler-icons-react';



export const PostCard = (props) => {
    const { store, actions } = useContext(Context);
    const { title, date, tags, location, user_name, id } = props.data
    const navigate = useNavigate();

    // Functions to calculate the distance between the user and the event
    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }
    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return parseInt(d);
    }

    // Function to choose a random icon for the post. THIS WILL CHANGE
    const randomIcon = () => {
        let colors = ["dark", "red", "pink", "grape", "violet", "indigo", "blue", "cyan", "teal", "green", "lime", "yellow", "orange"]
        let randomColor = colors[Math.floor(Math.random() * colors.length)]
        let icons = [<DeviceGamepad size={"2rem"} />, <Music size={"2rem"} />, <Abc size={"2rem"} />,
        <AerialLift size={"2rem"} />, <Armchair size={"2rem"} />, <Backpack size={"2rem"} />,
        <BallFootball size={"2rem"} />, <Ballpen size={"2rem"} />]
        return <ActionIcon color={randomColor} size="xl" mr="lg">{icons[Math.floor(Math.random() * icons.length)]}</ActionIcon>
    }

    return (
        <>
            <Card shadow="sm" padding="lg" radius="md" mb="sm" withBorder>

                {/*Title and Icon*/}
                <Group position="apart" mb="xs">
                    <Text weight={500} w="180px">{title}</Text>
                    <ActionIcon size="xl">
                        {randomIcon()}
                    </ActionIcon>
                </Group>

                {/*Info and Tags Group*/}
                <Group position="apart" mb="xs">

                    {/*Info about the post*/}
                    <Stack maw={"300px"} spacing={"0px"}>
                        <Text size="sm" color="dimmed" weight={500} transform="capitalize">
                            {user_name}
                        </Text>
                        <Text size="xs" color="dimmed" weight={500}>
                            <Text size="sm" span>{getDistanceFromLatLonInKm(location[0], location[1], store.user_data.location[0], store.user_data.location[1])}km Away</Text>
                        </Text>
                        <Text size="sm" color="dimmed" weight={400}>
                            {date}
                        </Text>
                    </Stack>

                    {/*Tags*/}
                    <Group position="right" maw={"100px"}>
                        <div className="d-flex flex-column">
                            {
                                tags?.map((item) => {
                                    return (
                                        <Text size="xs" color="dimmed" align="right">
                                            <Badge color={item[1]} size="sm" radius="xs" variant="dot">{item[0]}</Badge>
                                        </Text>);
                                })
                            }
                        </div>
                    </Group>
                </Group>

                {/*See More Button*/}
                <Button onClick={() => { navigate("/post/" + id) }} variant="light" color="blue" fullWidth mt="md" radius="md">
                    See More
                </Button>
            </Card>
        </>
    );
};
