import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';

import { getDistanceFromLatLonInKm } from "../tools/calculateDistance";
import { randomIcon } from "../tools/randomIcon";

import { Card, Group, Text, Button, Badge, ThemeIcon, Stack, Center, Flex } from '@mantine/core';

export const PostCard = (props) => {
    const { store, actions } = useContext(Context);
    const { title, date, tags, location, user_name, id, available, user_id } = props.data
    const { currentLocation } = props
    const navigate = useNavigate();

    return (
        <>
            <Card key={id} shadow="xs" padding="lg" radius="md" mih={"12rem"} withBorder>


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
                        <Text size={"xs"} color="dimmed" fw={600}>
                            <Badge onClick={() => { navigate("/profile/" + user_id) }} sx={() => ({ backgroundColor: "transparent", cursor: "pointer" })} size="xs" color="gray">
                                {user_name}
                            </Badge>
                        </Text>
                        <Text size={"xs"} color="blue" fw={600}>
                            <Badge size="xs">{getDistanceFromLatLonInKm(location[0], location[1], currentLocation[0], currentLocation[1])}km</Badge> Away
                        </Text>
                        {available ?
                            <Text size={"xs"} color="green" fw={600}>
                                <Badge size="xs" color="green">
                                    {date}
                                </Badge>
                            </Text> :
                            <Text size={"xs"} fw={700}>
                                <Badge size="xs" color="red">Event is over!</Badge></Text>
                        }

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
