import * as React from "react";
import { Header } from "../components/navigation/Header";
import { Sidebar } from "../components/navigation/Sidebar";
import { Container } from "../components/Container";
import { Switch, Route } from "react-router-dom";

import { HomeView } from "../views/HomeView";
import { LoginView } from "../views/LoginView";
import { CreateEventView } from "../views/CreateEventView";
import { UserProfileView } from "../views/UserProfileView";

export const Content = () => (
    <div>
        <Switch>
            <Route exact path="/" component={HomeView}/>
            <Route path="/login" component={LoginView}/>
            <Route path="/events/create" component={CreateEventView}/>
            <Route path="/users/profile" component={UserProfileView}/>
        </Switch>
    </div>
)

export const App = () => (
    <div className="root">
        <Header />
        <div className="global-container">
            <Sidebar />
            <div className="content">
                <div className="area">
                    <Content />
                </div>
            </div>
        </div>
    </div>
);