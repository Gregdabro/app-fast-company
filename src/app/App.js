import React from "react";
import Navbar from "./components/UI/navbar";
import { Route, Switch } from "react-router-dom";
import Login from "./layouts/login";
import Home from "./layouts/home";
import NotFoundPage from "./components/UI/notFoundPage";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path="/" exact component={ Home } />
                <Route path="/login/:type?" component={ Login } />
                <Route path="/users/:userId?/:edit?" component={ Users } />
                <Route path="*" component={ NotFoundPage } />
            </Switch>
            <ToastContainer/>
        </>
    );
};

export default App;
