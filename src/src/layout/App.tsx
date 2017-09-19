import * as React from "react"
import { Header } from "../components/navigation/Header"
import { Container } from "../components/Container"
import { Switch, Route } from "react-router-dom"

import { HomeView } from "../views/HomeView"
import { LoginView } from "../views/LoginView"

export const Content = () => (
    <div className="global-container">
        <Switch>
            <Route exact path="/" component={HomeView}/>
            <Route path="/login" component={LoginView}/>
        </Switch>
    </div>
)

export const App = () => (
    <div className="root">
        <Header />
        <Content />
    </div>
);