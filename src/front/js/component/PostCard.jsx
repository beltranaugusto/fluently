import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';

import { getDistanceFromLatLonInKm } from "../tools/calculateDistance";
import { randomIcon } from "../tools/randomIcon";

import { Card, Group, Text, Button, Badge, ThemeIcon, Stack, Center } from '@mantine/core';

export const PostCard = (props) => {
    const { store, actions } = useContext(Context);
    const { title, date, tags, location, user_name, id, available } = props.data
    const { currentLocation } = props
    const navigate = useNavigate();

    return (
        <>
            <Card key={id} shadow="xs" padding="lg" radius="md" withBorder>
                {available ? null :
                    <Center>
                        <Badge color="red" size="sm" fw={500} order={4}>Date has already passed</Badge>
                    </Center>}


                {/*Title and Icon*/}
                <Group position="apart" mb="xs">
                    <Text weight={500} w="180px">{title}</Text>
                    <ThemeIcon size="xl">
                        {randomIcon()}
                    </ThemeIcon>
                </Group>

                {/*Info and Tags Group*/}
                <Group position="apart" mb="xs">

                    {/*Info about the post*/}
                    <Stack maw={"300px"} spacing={"0px"}>
                        <Text size="sm" color="dimmed" weight={500} transform="capitalize">
                            {user_name}
                        </Text>
                        <Text size="xs" color="dimmed" weight={500}>
                            <Text size="sm" span>{getDistanceFromLatLonInKm(location[0], location[1], currentLocation[0], currentLocation[1])}km Away</Text>
                        </Text>
                        <Text size="sm" color="dimmed" weight={400}>
                            {date}
                        </Text>
                    </Stack>

                    {/*Tags*/}
                    <Group position="right" maw={"150px"}>
                        <div className="d-flex flex-column">
                            {
                                tags?.map((item, index) => {
                                    return (
                                        <Text size="xs" color="dimmed" align="right" key={index}>
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
