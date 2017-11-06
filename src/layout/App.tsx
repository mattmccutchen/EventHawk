import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { Header } from "../components/navigation/Header";
import { Sidebar } from "../components/navigation/Sidebar";
import { Container } from "../components/Container";
import { Login } from "../components/authentication/Login"
import { Register } from "../components/authentication/Register"
import { Maintenance } from "../components/maintenance/Maintenance";

import { HomeView } from "../views/HomeView";
import { MyEventsView } from "../views/MyEventsView";
import { CreateEventView } from "../views/CreateEventView";
import { UserProfileView } from "../views/UserProfileView";
import { RateEventView } from "../views/RateEventView";
import { EventListFilterContainer } from "../components/events/EventListFilterContainer"

import EventHawkAppReducer from '../reducers/EventHawkAppReducer'

let store = createStore(EventHawkAppReducer)

const router = [
    {
        path: "/",
        exact: true,
        sidebar: () => <Sidebar event={null} />,
        main: () => <HomeView />
    },
    {
        path: "/login",
        exact: false,
        sidebar: null,
        main: () => <Login />
    },
    {
        path: "/signup",
        exact: false,
        sidebar: null,
        main: () => <Register />
    },
    {
        path: "/myevents",
        exact: false,
        sidebar: () => <Sidebar event={null} />,
        main: () => <MyEventsView />
    },
    {
        path: "/events/create",
        exact: false,
        sidebar: () => <Sidebar event={null} />,
        main: () => <CreateEventView />
    },
    {
        path: "/events/edit",
        exact: false,
        sidebar: () => <Sidebar event={null} />,
        main: () => <CreateEventView />
    },
    {
        path: "/events/rate",
        exact: false,
        sidebar: () => <Sidebar event={null} />,
        main: () => <RateEventView />
    },
    {
        path: "/users/profile",
        exact: false,
        sidebar: () => <Sidebar event={null} />,
        main: () => <UserProfileView />
    },
    {
        path: "/events/filter",
        exact: false,
        sidebar: () => <Sidebar event={null} />,
        main: () => <EventListFilterContainer history={null} />
    }
];

export const Content = () => (
    <div className="global-container">
        {router.map((route, num) => (
            <Route key={num} path={route.path} exact={route.exact} component={route.sidebar} />
        ))}
        <div className="content">
            <div className="area">
                {router.map((route, num) => (
                    <Route key={num} path={route.path} exact={route.exact} component={route.main} />
                ))}
            </div>
            <footer>EventHawk &copy; 2017</footer>
        </div>
    </div>
);

export const App = () => (
    <Provider store={store}>
        <div className="root">
            <Header />
            <Content />
        </div>
    </Provider>
);