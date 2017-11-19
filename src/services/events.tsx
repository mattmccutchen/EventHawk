import * as React from "react";
import { Link } from "react-router-dom";
import { configVals } from "./config";
import axios from "axios";
import { AxiosResponse } from "axios";
import { UserService } from "./user"
import { EventItem } from "../components/events/EventItem"
import { InvalidIdError } from "./exceptions";
import { EventListFilterSetting } from "../components/events/EventListFilterSetting";
import { TicketService } from "./tickets";

// EventCategory keys will be converted to strings when making API calls to /events
export enum EventCategory {
    ALL = 0,
    SPORTS,
    CARD_GAMES,
    EDUCATIONAL,
    MUSIC,
    ART,
    FOOD,
}

export const EventCategoryName = new Map<number, string>([
    [EventCategory.ALL, 'All'],
    [EventCategory.SPORTS, 'Sports'],
    [EventCategory.CARD_GAMES, 'Card games'],
    [EventCategory.EDUCATIONAL, 'Educational'],
    [EventCategory.MUSIC, 'Music'],
    [EventCategory.ART, 'Art'],
    [EventCategory.FOOD, 'Food'],
]);

export class EventService {
    public static async indexEvents(filters?: EventListFilterSetting): Promise<AxiosResponse> {
        let url = configVals.apiRoot + configVals.events

        let requestProperties = {
            params: {}
        }

        if (filters) {
            let filterParams: any = {}
            if (filters.attendeeUserId) {
                filterParams["attendedBy"] = filters.attendeeUserId
            }
            if (filters.hostUserId) {
                filterParams["hostedBy"] = filters.hostUserId
            }
            if (filters.category) {
                if (filters.category as EventCategory != EventCategory.ALL) {
                    filterParams["category"] = EventCategory[filters.category]
                }
            }
            Object.assign(requestProperties.params, filterParams)
        }

        Object.assign(requestProperties, UserService.getAuthenticationHeader())

        return axios.get(url, requestProperties);
    }

    private static async showEvent(id: string): Promise<AxiosResponse> {
        return axios.get(configVals.apiRoot + configVals.events + "/" + id, UserService.getAuthenticationHeader())
    }

    private static mapToCategory(category: string): EventCategory {
        category = category.toUpperCase()

        switch (category) {
            case "SPORTS":
                return EventCategory.SPORTS;
            case "CARD_GAMES":
                return EventCategory.CARD_GAMES;
            case "EDUCATIONAL":
                return EventCategory.EDUCATIONAL;
            case "MUSIC":
                return EventCategory.MUSIC;
            case "ART":
                return EventCategory.ART;
            case "FOOD":
                return EventCategory.FOOD;
            default:
                console.error("Unknown category: " + category)
                return EventCategory.ALL;
        }
    }

    public static async getEventItem(eventId: string): Promise<EventItem> {
        let response = await EventService.showEvent(eventId)

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
                category: this.mapToCategory(event.category),
                hostId: event.host_id,
                ticketId: event._my_ticket
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
            
            try {
                newEventItem.ticket = await TicketService.getTicket(newEventItem.ticketId)
            } catch (e) {
                if (e instanceof InvalidIdError) {
                    console.error("Ignoring invalid ticketId when populating event list. ticketId was: " + e.id)
                    newEventItem.host = null;
                } else {
                    throw e;
                }
            }

            return newEventItem
        }

        return null
    }

    public static async getAllEventItems(filters: EventListFilterSetting): Promise<EventItem[]> {

        let response = await EventService.indexEvents(filters)
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