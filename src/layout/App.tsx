import * as React from "react";
import { Header } from "../components/navigation/Header";
import { Sidebar } from "../components/navigation/Sidebar";
import { Container } from "../components/Container";
import { Switch, Route } from "react-router-dom";

import { Maintenance } from "../components/maintenance/Maintenance";

import { HomeView } from "../views/HomeView";
import { LoginView } from "../views/LoginView";
import { MyEventsView } from "../views/MyEventsView";
import { CreateEventView } from "../views/CreateEventView";
import { UserProfileView } from "../views/UserProfileView";
import { RateEventView } from "../views/RateEventView";
import { EventListFilterContainer } from "../components/events/EventListFilterContainer"

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import EventHawkAppReducer from '../reducers/EventHawkAppReducer'

let store = createStore(EventHawkAppReducer)

export const Content = () => (
    <div>
        <Switch>
            <Maintenance>
                <Route exact path="/" component={HomeView} />
                <Route path="/login" component={LoginView} />
                <Route path="/myevents" component={MyEventsView} />
                <Route path="/events/create" component={CreateEventView} />
                <Route path="/events/edit" component={CreateEventView} />
                <Route path="/events/rate" component={RateEventView} />
                <Route path="/users/profile" component={UserProfileView} />
                <Route path="/events/filter" component={EventListFilterContainer} />
            </Maintenance>
        </Switch>
    </div>
)

export const App = () => (
    <Provider store={store}>
        <div className="root">
            <Header />
            <div className="global-container">
                <Sidebar event={null} />
                <div className="content">
                    <div className="area">
                        <Content />
                    </div>
                </div>
            </div>
        </div>
    </Provider>
);