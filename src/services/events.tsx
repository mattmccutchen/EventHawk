import * as React from "react";
import { Link } from "react-router-dom";
import { configVals } from "./config";
import axios from "axios";
import { AxiosResponse } from "axios";
import { UserService } from "./user"
import { EventItem } from "../components/events/EventItem"
import { InvalidIdError } from "./exceptions";

export class EventService {
    public static async indexEvents(): Promise<AxiosResponse> {
        return axios.get(configVals.apiRoot + configVals.events, UserService.getAuthenticationHeader());
    }

    private static async showEvent(id: string): Promise<AxiosResponse> {
        return axios.get(configVals.apiRoot + configVals.events + "/" + id, UserService.getAuthenticationHeader())
    }

    public static async getEventItem(eventId: string): Promise<EventItem> {
        let response = await EventService.showEvent(eventId)

        // Assume showEvent returns an array of events with exactly 0 or 1 item
        if (response.status === 200) {
            let event = response.data
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

            try {
                newEventItem.host = await UserService.getUser(newEventItem.hostId)
            } catch (e) {
                if (e instanceof InvalidIdError) {
                    console.error("Ignoring invalid hostId when populating event list. hostId was: " + e.id)
                    newEventItem.host = null;
                } else {
                    throw e;
                }
            }

            return newEventItem
        }

        return null
    }

    public static async getAllEventItems(): Promise<EventItem[]> {

        let response = await EventService.indexEvents()
        let eventIds: string[] = response.data

        let events: EventItem[] = []
        for (let eventId of eventIds) {
            let newEvent: EventItem = await EventService.getEventItem(eventId)

            if (newEvent) {
                events.push(newEvent)
            }
        }

        return events
    }
}