import React from "react";
import Navbar from "./components/UI/navbar";
import { Route, Switch } from "react-router-dom";
import Login from "./layouts/login";
import Home from "./layouts/home";
import NotFoundPage from "./components/UI/notFoundPage";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import QualitiesProvider from "./hooks/useQualities";

function App() {
    return (
        <>
            <Navbar />
            <ProfessionProvider>
                <QualitiesProvider>
                    <Switch>
                        <Route path="/" exact component={ Home } />
                        <Route path="/login/:type?" component={ Login } />
                        <Route path="/users/:userId?/:edit?" component={ Users } />
                        <Route path="*" component={ NotFoundPage } />
                    </Switch>
                </QualitiesProvider>
            </ProfessionProvider>
            <ToastContainer/>
        </>
    );
};

export default App;
