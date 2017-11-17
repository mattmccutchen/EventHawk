import * as React from "react";
import { UserService } from "../services/user";
import { EventList } from "../components/events/EventList";

export class HomeView extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return <div>
            <div>
                <h1>Upcoming Events</h1>
            </div>
            <EventList />
        </div>
    }
}