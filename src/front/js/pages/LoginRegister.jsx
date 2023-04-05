import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Login } from "../component/Login.jsx";
import { Register } from "../component/Register.jsx";

import { Center, Flex, Box } from '@mantine/core';

export const LoginRegister = () => {
    const { store, actions } = useContext(Context);
    const [show, setShow] = useState(false);

    // This component holds the views for the Login and Register forms.
    // The 'show' state controls what is shown.

    return (
        <Center mx="auto">
            <Flex direction={{ base: 'column' }}>

                {/* Declaring a min height and a min width for the login a register section */}
                <Box sx={() => ({ minHeight: '720px', minWidth: '280px', maxWidth: '280px' })}>
                    {show ? <Register setShow={setShow} /> : <Login setShow={setShow} />}
                </Box>

            </Flex>
        </Center>
    );
};
