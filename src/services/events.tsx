import * as React from "react";
import { Link } from "react-router-dom";
import { configVals } from "./config";
import axios from "axios";
import { AxiosResponse } from "axios";
import { UserService } from "./user"
import { EventItem } from "../components/events/EventItem"

export class EventService {
    static async indexEvents(): Promise<AxiosResponse> {
        return axios.get(configVals.apiRoot + configVals.events, UserService.getAuthenticationHeader());
    }

    static async showEvent(id: string): Promise<AxiosResponse> {
        return axios.get(configVals.apiRoot + configVals.events + "/" + id, UserService.getAuthenticationHeader())
    }

    static async getHydratedEvent(eventId: string): Promise<EventItem> {
        let event: EventItem = await EventService.showEvent(eventId).then(
            (res) => {
                // Assume showEvent returns an array of events with exactly 0 or 1 item
                if (res.data.length == 1) {
                    let event = res.data[0]
                    let newEventItem: EventItem = {
                        name: event.name,
                        description: event.description,
                        time: event.time,
                        location: event.location,
                        currentCapacity: event.current_capacity,
                        totalCapacity: event.total_capacity,
                        interestRating: event.interest_rating,
                        category: event.category,
                        hostId: event.host_id
                    }
                    return newEventItem
                } 
            }
        )

        return event
    }

    static async getAllEventsHydrated(): Promise<EventItem[]> {
        let eventIds: string[] = await EventService.indexEvents().then((res) => { return res.data })

        let events: EventItem[] = []
        for (let eventId of eventIds) {
            let newEvent: EventItem = await EventService.getHydratedEvent(eventId)

            if (newEvent) {
                events.push(newEvent)
            }
        }

        return events
    }
}