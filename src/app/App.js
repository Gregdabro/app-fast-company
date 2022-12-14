import React from "react";
import Navbar from "./components/UI/navbar";
import { Route, Switch } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NotFoundPage from "./components/UI/notFoundPage";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import QualitiesProvider from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";

function App() {
    return (
        <div>
            <AuthProvider>
                <Navbar />
                <ProfessionProvider>
                    <QualitiesProvider>
                        <Switch>
                            <Route path="/" exact component={ Main } />
                            <Route path="/logout" component={ LogOut } />
                            <Route path="/login/:type?" component={ Login } />
                            <ProtectedRoute path="/users/:userId?/:edit?" component={ Users } />
                            <Route path="*" component={ NotFoundPage } />
                        </Switch>
                    </QualitiesProvider>
                </ProfessionProvider>
            </AuthProvider>
            <ToastContainer/>
        </div>
    );
};

export default App;
