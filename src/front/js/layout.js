import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";
import { MantineProvider } from '@mantine/core';

import { ScrollArea } from '@mantine/core';

import { Shell } from "./pages/Shell.jsx";
import { LoginRegister } from "./pages/LoginRegister.jsx";
import { Test } from "./component/Test.jsx";
const Layout = () => {
    const basename = process.env.BASENAME || "";
    return (
        <>
            <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'light' }}>
                
                <BrowserRouter basename={basename}>
                        <Routes>
                            <Route element={<Test />} path="/test" />
                            <Route element={<LoginRegister />} path="/login" />
                            <Route element={<Shell />} path="/*" />
                        </Routes>
                </BrowserRouter>
                
            </MantineProvider>
        </>
    );
};

export default injectContext(Layout);
