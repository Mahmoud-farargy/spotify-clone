import React from "react";
import ReactDom from "react-dom";
import App from "./Components/App/App";
import {BrowserRouter} from "react-router-dom";
import {AppProvider} from "./Context";

const Main=(
        <AppProvider>
                <BrowserRouter>
                        <App />
                </BrowserRouter>     
        </AppProvider>        
)

ReactDom.render(Main, document.getElementById("app"));