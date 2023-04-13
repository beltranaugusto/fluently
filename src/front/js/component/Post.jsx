import React from "react";
import { Link } from "react-router-dom";
import { Card, Group, Text, Button, ActionIcon, Box, Grid, Avatar, ScrollArea, Image, Badge } from '@mantine/core';
import { DeviceGamepad, Star } from 'tabler-icons-react';



export const Post = () => {
    return (
        <>
            <Card shadow="xl" padding="lg" radius="md" mb="sm" withBorder>

                {/*Title*/}
                <Box sx={(theme) => ({ textAlign: 'left', marginBottom: theme.spacing.sm, padding: theme.spacing.md, borderRadius: theme.radius.sm, })}>
                    <Group position="apart">
                        <Text weight={500} w="180px">Encuentro para hablar de videojuegos</Text>
                        <ActionIcon size="xl" color="blue">
                            <DeviceGamepad size="5em" />
                        </ActionIcon>
                    </Group>
                    <Text mt="xs" fs={"italic"} size="xs" color="dimmed" weight={400}>
                        Starts on: 16/04/23
                    </Text>
                </Box>

                <Text align="center" mb={"sm"}>
                    <Badge m={"3px"} size="lg" radius="sm">Online</Badge>
                    <Badge m={"3px"} size="lg" radius="sm" color="yellow">Casual</Badge>
                    <Badge m={"3px"} size="lg" radius="sm" color="lime">Beginner</Badge>
                </Text>



                {/*About*/}
                <Box className="border" sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], textAlign: 'left', marginBottom: theme.spacing.md, padding: theme.spacing.lg, borderRadius: theme.radius.sm })}>

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

                {/*Post Creator*/}
                <Grid>
                    <Grid.Col span="auto" className="d-flex align-items-center">
                        <Avatar className="mx-auto" size="lg" radius="sm" />
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <Box sx={(theme) => ({ textAlign: 'left', padding: theme.spacing.sm, borderRadius: theme.radius.sm, cursor: 'pointer', })}>

                            <Group position="apart" align="start">
                                <div>
                                    <Text size="md" weight={500}>Raamses Garcia</Text>
                                    <Text size="xs" weight={500}>Ingles, Español, Frances</Text>
                                    <Text mt={"sm"} size="xs" weight={500}>Venezuela, Caracas</Text>
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
                    <Image height={"230px"} width={"100%"} src="https://www.tintasytonercompatibles.es/blog/wp-content/uploads/2022/04/Como-imprimir-mapa-Google-Maps-grande.jpg" alt="Random image" />
                </Box>

                {/*I Will Go Button*/}
                <Group mt={"md"} grow>
                    <Button onClick={() => { navigate(-1) }} variant="gradient" gradient={{ from: 'lime', to: 'green' }}>I Will Go</Button>
                </Group>

                {/*Attendees*/}
                <Box className="border" sx={(theme) => ({ marginTop: theme.spacing.md, padding: theme.spacing.md, minHeight: "70px", backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0], borderRadius: theme.radius.sm, })}>
                    <Text size="sm" color="dimmed" weight={400}>
                        <Text fw={500} span>7</Text> Attendees
                    </Text>
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
