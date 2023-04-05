import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';


import { MyCard } from "../component/MyCard.jsx";

import { Grid, Container } from '@mantine/core';

export const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    // Redirection to the login page if the user is not logged.
    useEffect(() => {
        if (store.token == null) {
            navigate("/");
        }
    }, [store.token]);

    return (
        <Container>
            <Grid>
                <Grid.Col span={12}>
                    <MyCard />
                </Grid.Col>
            </Grid>
        </Container>
    );
};
