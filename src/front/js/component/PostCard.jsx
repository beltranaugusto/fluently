import React from "react";
import { useNavigate } from 'react-router-dom';
import { Card, Group, Text, Button, Badge, ActionIcon, Stack } from '@mantine/core';
import { DeviceGamepad } from 'tabler-icons-react';



export const PostCard = () => {
    const navigate = useNavigate();
    return (
        <>
            <Card shadow="sm" padding="lg" radius="md" mb="sm" withBorder>

                <Group position="apart" mb="xs">
                    <Text weight={500} w="180px">Encuentro para hablar de videojuegos</Text>
                    <ActionIcon size="xl">
                        <DeviceGamepad size="2em" />
                    </ActionIcon>
                </Group>

                <Group position="apart" mb="xs">
                    <Stack maw={"300px"} spacing={"0px"}>

                        <Text size="sm" color="dimmed" weight={500}>
                            Miguel Otero
                        </Text>

                        <Text size="xs" color="dimmed" weight={500}>
                            <Text size="sm" span>5km Away</Text> - Plaza La Candelaria
                        </Text>

                        <Text size="sm" color="dimmed" weight={400}>
                            16/04/23
                        </Text>



                    </Stack>
                    <Group position="right" maw={"100px"}>
                        <div className="d-flex flex-column">
                            <Text size="xs" color="dimmed" align="right">
                                <Badge color="blue" size="sm" radius="xs" variant="dot">Online</Badge>
                            </Text>

                            <Text size="xs" color="dimmed" align="right">
                                <Badge color="yellow" size="sm" radius="xs" variant="dot">Casual</Badge>
                            </Text>

                            <Text size="xs" color="dimmed" align="right">
                                <Badge color="green" size="sm" radius="xs" variant="dot">Beginner</Badge>
                            </Text>
                        </div>
                    </Group>
                </Group>



                <Button onClick={() => { navigate("/post") }} variant="light" color="blue" fullWidth mt="md" radius="md">
                    See More
                </Button>
            </Card>
        </>
    );
};
