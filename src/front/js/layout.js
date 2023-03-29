import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Shell } from "./pages/Shell.jsx";
import injectContext from "./store/appContext";


import { MantineProvider } from '@mantine/core';

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
            <BrowserRouter basename={basename}>
                
                    <Routes>
                        <Route element={<Shell />} path="/" />
                    </Routes>
                
            </BrowserRouter>
            </MantineProvider>
        </div>
    );
};

export default injectContext(Layout);
