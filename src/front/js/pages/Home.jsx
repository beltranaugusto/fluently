import React, { useContext, useEffect, useState, useRef, useCallback } from "react";
import { Context } from "../store/appContext";
import { PostCard } from "../component/PostCard.jsx";
import { Grid, Card, TextInput, Button, Group, Space } from '@mantine/core';
import { Search } from 'tabler-icons-react';
import { getLocation } from "../tools/getLocation";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [posts, setPosts] = useState([])
    const [currentLocation, setCurrentLocation] = useState([])
    const [page, setPage] = useState(1)

    // When scrolling to the end, change the page
    const handleScroll = async () => {
        const element = document.documentElement;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            setPage(prev => prev + 1)
        }
    };

    // Fetch data of the current page
    const postsList = async (page) => {
        try {
            let newPosts = await actions.getPosts(page)
            setPosts(prevPosts => [...prevPosts, ...newPosts])
        } catch (error) {
            console.log("No more posts")
        }
    }

    // I was having a unintended rerender that I fixed separating using two use effects
    // Initialization useEffect
    useEffect(() => {
        postsList(page)
    }, [page]);
    // Current Location useEffect
    useEffect(() => {
        if (store.currentLocation)
            setCurrentLocation(store.currentLocation)
    }, [store.currentLocation]);
    // Scroll event useEffect
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            <Grid gutter={"md"}>
                {
                    posts?.map((item) => {
                        return (
                            <Grid.Col key={item.id} sm={12} md={6}>
                                <PostCard key={item.id} data={item} currentLocation={currentLocation} />
                            </Grid.Col>
                        );
                    })
                }

            </Grid>
        </>
    );
};
