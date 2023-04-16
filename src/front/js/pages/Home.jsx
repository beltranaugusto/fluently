import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { PostCard } from "../component/PostCard.jsx";
import { Grid, Card, TextInput, Button, Group, Space } from '@mantine/core';
import { Search } from 'tabler-icons-react';

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [posts, setPosts] = useState([])

    //
    useEffect(() => {
        postsList()
    }, []);

    const postsList = async () => {
        setPosts(await actions.getPosts())
    }

    return (
        <>
            <Card padding="lg" radius="md" mb="sm" withBorder>
                <TextInput
                    placeholder="Search"
                    icon={<Search size="0.8rem" />}
                />
                <Space h="sm" />
                <Group spacing="xs" grow>
                    <Button size="xs" variant="outline">KM</Button>
                    <Button size="xs" variant="outline">Date</Button>
                </Group>
            </Card>
            <Grid>
                <Grid.Col span={12}>
                    {
                        posts?.map((item) => {
                            return <PostCard key={item.id} data={item} />;
                        })
                    }
                </Grid.Col>
            </Grid>
        </>
    );
};
