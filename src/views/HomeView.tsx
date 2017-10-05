import * as React from "react"
import { EventList } from "../components/events/EventList"

export const HomeView = () => (
    <div>
        <div>
            <h1>Upcoming Events</h1>
        </div>
        <EventList />
    </div>
)