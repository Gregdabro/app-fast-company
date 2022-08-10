import React from "react";
import Navbar from "./components/navbar";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import NotFoundPage from "./components/notFoundPage";
import UsersList from "./components/usersList";

function App() {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path="/" exact component={ Home } />
                <Route path="/login" component={ Login } />
                <Route path="/users/:userId?" component={ UsersList } />
                <Route path="*" component={ NotFoundPage } />
            </Switch>
        </>
    );
};

export default App;
