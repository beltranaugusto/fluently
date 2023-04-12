import React from "react";
import { Link } from "react-router-dom";
import { Card, Group, Text, Button, ActionIcon, Box, Grid, Avatar, ScrollArea, Container } from '@mantine/core';
import { DeviceGamepad, Star } from 'tabler-icons-react';



export const Post = () => {
    return (
        <>
            <Card shadow="xl" padding="lg" radius="md" mb="sm" withBorder>
                <Box className="border" sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], textAlign: 'left', marginBottom: theme.spacing.md, padding: theme.spacing.md, borderRadius: theme.radius.sm, cursor: 'pointer', })}>
                    <Group position="apart">
                        <Text weight={500} w="180px">Encuentro para hablar de videojuegos</Text>
                        <ActionIcon size="xl">
                            <DeviceGamepad size="5em" />
                        </ActionIcon>
                    </Group>
                </Box>
                <Box className="border" sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], textAlign: 'left', marginBottom: theme.spacing.md, padding: theme.spacing.lg, borderRadius: theme.radius.sm, cursor: 'pointer', })}>
                    <Text size="md" color="dimmed">Description</Text>
                    <Text mt={"sm"} size="xs" color="dimmed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Fusce at nulla diam. Phasellus non sapien vel mauris ultricies finibus.
                        Mauris ut nisl in mauris mollis fermentum ac bibendum dolor. Quisque nec dolor gravida, viverra est vitae, suscipit velit.
                        Cras porttitor fringilla mattis. In arcu felis, elementum id porttitor id, sodales eu tortor.
                        <ul>
                            <li>
                                Nam erat sapien, porta a quam vitae, ullamcorper commodo mi. In aliquet aliquet nulla eget commodo.
                            </li>
                            <li>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non semper libero.
                            </li>
                        </ul>
                    </Text>
                </Box>
                <Grid>
                    <Grid.Col span="auto" className="d-flex align-items-center">
                        <Avatar className="mx-auto" size="lg" radius="sm" />
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <Box className="border" sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], textAlign: 'left', padding: theme.spacing.sm, borderRadius: theme.radius.sm, cursor: 'pointer', })}>

                            <Group position="apart" align="start">
                                <div>
                                    <Text size="md" color="dimmed">Raamses Garcia</Text>
                                    <Text size="xs" color="dimmed">Ingles, Español, Frances</Text>
                                    <Text mt={"sm"} size="xs" color="dimmed">Venezuela, Caracas</Text>
                                </div>
                                <div className="d-flex">
                                    <Text mt={"5px"} mb={"auto"} mr={"3px"} size="xs" color="dimmed">4.78</Text>
                                    <ActionIcon size="md">
                                        <Star size="1.3em" />
                                    </ActionIcon>
                                </div>

                            </Group>
                        </Box>
                    </Grid.Col>
                </Grid>
                <Box className="border" sx={(theme) => ({ minHeight: "200px", backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], textAlign: 'left', marginTop: theme.spacing.md, padding: theme.spacing.md, borderRadius: theme.radius.sm, cursor: 'pointer', })}>
                </Box>
                <Group mt={"md"} grow>
                    <Button onClick={() => { navigate(-1) }} variant="gradient" gradient={{ from: 'lime', to: 'green' }}>I Will Go</Button>
                </Group>

                <Box className="border" sx={(theme) => ({ marginTop: theme.spacing.md, padding: theme.spacing.md, minHeight: "70px", backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], borderRadius: theme.radius.sm, })}>
                    <ScrollArea borderRadius="xs">
                        <Box sx={(theme) => ({ display: "flex" })}>
                            <Box sx={(theme) => ({ minWidth: "40px", backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], textAlign: 'center', borderRadius: theme.radius.sm, cursor: 'pointer', margin: theme.spacing.xs, })}>
                                <Avatar className="mx-auto" size="lg" radius="sm" />
                                <Text size="xs" color="dimmed">Beltran</Text>
                                <Text size="xs" mt={"-3px"} color="dimmed">Liscano</Text>
                            </Box>
                            <Box sx={(theme) => ({ minWidth: "40px", backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], textAlign: 'center', borderRadius: theme.radius.sm, cursor: 'pointer', margin: theme.spacing.xs })}>
                                <Avatar className="mx-auto" size="lg" radius="sm" />
                                <Text size="xs" color="dimmed">Maria</Text>
                                <Text size="xs" mt={"-3px"} color="dimmed">Antonieta</Text>
                            </Box>
                            <Box sx={(theme) => ({ minWidth: "40px", backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], textAlign: 'center', borderRadius: theme.radius.sm, cursor: 'pointer', margin: theme.spacing.xs })}>
                                <Avatar className="mx-auto" size="lg" radius="sm" />
                                <Text size="xs" color="dimmed">Lousiux</Text>
                            </Box>
                            <Box sx={(theme) => ({ minWidth: "40px", backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], textAlign: 'center', borderRadius: theme.radius.sm, cursor: 'pointer', margin: theme.spacing.xs })}>
                                <Avatar className="mx-auto" size="lg" radius="sm" />
                                <Text size="xs" color="dimmed">Miriam</Text>
                                <Text size="xs" mt={"-3px"} color="dimmed">Ramirez</Text>
                            </Box>
                            <Box sx={(theme) => ({ minWidth: "40px", backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], textAlign: 'center', borderRadius: theme.radius.sm, cursor: 'pointer', margin: theme.spacing.xs })}>
                                <Avatar className="mx-auto" size="lg" radius="sm" />
                                <Text size="xs" color="dimmed">Carlito</Text>
                                <Text size="xs" mt={"-3px"} color="dimmed">Useche</Text>
                            </Box>
                            <Box sx={(theme) => ({ minWidth: "40px", backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], textAlign: 'center', borderRadius: theme.radius.sm, cursor: 'pointer', margin: theme.spacing.xs })}>
                                <Avatar className="mx-auto" size="lg" radius="sm" />
                                <Text size="xs" color="dimmed">Lord</Text>
                                <Text size="xs" mt={"-3px"} color="dimmed">Valdomero</Text>
                            </Box>
                        </Box>
                    </ScrollArea>
                </Box>

            </Card >
        </>
    );
};
