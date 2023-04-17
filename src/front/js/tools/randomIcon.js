
import React from "react";
import { DeviceGamepad, Music, Abc, AerialLift, Armchair, Backpack, BallFootball, Ballpen } from 'tabler-icons-react';
import { ThemeIcon } from '@mantine/core';

// Function to choose a random icon for the post. THIS WILL CHANGE
export const randomIcon = () => {
    let colors = ["dark", "red", "pink", "grape", "violet", "indigo", "blue", "cyan", "teal", "green", "lime", "yellow", "orange"]
    let randomColor = colors[Math.floor(Math.random() * colors.length)]
    let icons = [<DeviceGamepad size={"2rem"} />, <Music size={"2rem"} />, <Abc size={"2rem"} />,
    <AerialLift size={"2rem"} />, <Armchair size={"2rem"} />, <Backpack size={"2rem"} />,
    <BallFootball size={"2rem"} />, <Ballpen size={"2rem"} />]
    return <ThemeIcon color={randomColor} size="xl">{icons[Math.floor(Math.random() * icons.length)]}</ThemeIcon>
}