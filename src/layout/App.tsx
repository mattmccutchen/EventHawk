import * as React from "react";
import { Switch } from "react-router-dom";

import { Header } from "../components/navigation/Header";
import { Sidebar } from "../components/navigation/Sidebar";
import { Container } from "../components/Container";
import { Login } from "../components/authentication/Login";
import { Logout } from "../components/authentication/Logout";
import { Register } from "../components/authentication/Register";

import { UserService } from "../services/user";
import { Maintenance } from "../components/maintenance/Maintenance";
import { AppRoute } from "../components/navigation/AppRoute";
import { EventListFilterContainer } from "../components/events/EventListFilterContainer";

import { HomeView } from "../views/HomeView";
import { MyEventsView } from "../views/MyEventsView";
import { CreateEventView } from "../views/CreateEventView";
import { UserProfileView } from "../views/UserProfileView";
import { EventStatistics } from "../views/EventStatistics";

interface routerProps {
    path: string,
    exact: boolean,
    sidebar: any,
    options: any,
    auth: number,
    main: any
}

const router: routerProps[] = [
    {
        path: "/",
        exact: true,
        sidebar: () => <Sidebar event={null} />,
        options: () => <Sidebar event={null} type="options" />,
        auth: 0,
        main: () => <HomeView />
    },
    {
        path: "/login",
        exact: false,
        sidebar: null,
        options: null,
        auth: 2,
        main: () => <Login history={null} />
    },
    {
        path: "/signup",
        exact: false,
        sidebar: null,
        options: null,
        auth: 2,
        main: () => <Register />
    },
    {
        path: "/myevents",
        exact: false,
        sidebar: () => <Sidebar event={null} />,
        options: () => <Sidebar event={null} type="options" />,
        auth: 1,
        main: () => <MyEventsView />
    },
    {
        path: "/events/create",
        exact: false,
        sidebar: () => <Sidebar event={null} />,
        options: () => <Sidebar event={null} type="options" />,
        auth: 1,
        main: () => <CreateEventView />
    },
    {
        path: "/events/edit",
        exact: false,
        sidebar: () => <Sidebar event={null} />,
        options: () => <Sidebar event={null} type="options" />,
        auth: 1,
        main: () => <CreateEventView />
    },
    {
        path: "/events/filter",
        exact: false,
        sidebar: () => <Sidebar event={null} />,
        options: () => <Sidebar event={null} type="options" />,
        auth: 0,
        main: () => <EventListFilterContainer history={null} />
    },
    {
        path: "/event/:id/statistics",
        exact: false,
        sidebar: () => <Sidebar event={null} />,
        options: null,
        auth: 0,
        main: (props: any) => <EventStatistics {...props} />
    },
    {
        path: "/user/:id",
        exact: false,
        sidebar: () => <Sidebar type="user" event={null} />,
        options: () => <Sidebar event={null} type="options" />,
        auth: 1,
        main: () => <UserProfileView />
    },
    {
        path: "/user/logout",
        exact: true,
        sidebar: null,
        options: null,
        auth: 1,
        main: () => <Logout history={null} />
    }
];

export const Content = () => (
    <div className="global-container" id="app_context">
        {router.map((route, num) => (
            <AppRoute key={num} path={route.path} exact={route.exact} component={route.sidebar} auth={route.auth} />
        ))}
        <div className="content">
            <div className="area">
                {router.map((route, num) => (
                    <AppRoute key={num} path={route.path} exact={route.exact} component={route.main} auth={route.auth} />
                ))}
            </div>
            <footer>EventHawk &copy; 2017</footer>
        </div>
        {router.map((route, num) => (
            <AppRoute key={num} path={route.path} exact={route.exact} component={route.options} auth={route.auth} />
        ))}
    </div>
);

export const App = () => (
    <div className="root">
        <Header />
        <Switch>
            <Maintenance>
                <Content />
            </Maintenance>
        </Switch>
    </div>
);