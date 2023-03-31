import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useForm } from '@mantine/form';
import { Login } from "../component/Login.jsx";
import { Register } from "../component/Register.jsx";

import { Center, Flex } from '@mantine/core';

export const LoginRegister = () => {
    const { store, actions } = useContext(Context);
    const [show, setShow] = useState(false);

    // This component holds the views for the Login and Register forms.
    // The 'show' state controls what is shown.

    return (
        <Center mx="auto">
            <Flex direction={{ base: 'column' }}>

                {show ? <Register setShow={setShow} /> : <Login setShow={setShow} />}

            </Flex>
        </Center>
    );
};
