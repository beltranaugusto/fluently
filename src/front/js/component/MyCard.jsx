import React from "react";
import { Link } from "react-router-dom";
import { Card, Group, Text, Button, Badge, Image, ActionIcon, Space } from '@mantine/core';
import { Container, DeviceGamepad } from 'tabler-icons-react';



export const MyCard = () => {
    return (
        <>
            <Card shadow="sm" padding="lg" radius="md" mb="sm" withBorder>


                <Group position="apart" mb="xs">
                    <Text weight={500} w="180px">Encuentro para hablar de videojuegos</Text>
                    <ActionIcon size="xl">
                        <DeviceGamepad size="2em" />
                    </ActionIcon>
                </Group>


                <Text w="180px" size="xs" color="dimmed">
                    <Badge color="green" size="sm" radius="xs" variant="dot">Miguel Otero</Badge>
                </Text>

                <Text w="250px" size="xs" color="dimmed">
                    <Badge color="gray" size="sm" radius="xs" variant="dot">5Km</Badge>  <Badge color="gray" size="sm" radius="xs" variant="dot">Plaza La Candelaria</Badge>
                </Text>
                <Text w="180px" size="xs" color="dimmed">
                    <Badge color="gray" size="sm" radius="xs" variant="dot">16/04/23</Badge>
                </Text>

                <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                    See More
                </Button>
            </Card>
        </>
    );
};
