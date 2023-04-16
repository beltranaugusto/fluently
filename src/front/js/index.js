//import react into the bundle
import React from "react";
import * as ReactDOMClient from 'react-dom/client';
import "../styles/app.css";


//import your own components
import Layout from "./layout";

//render your react application

const appContainer = document.querySelector("#app")
const root = ReactDOMClient.createRoot(appContainer);
root.render(<Layout />)

