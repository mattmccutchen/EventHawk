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
import { VoteService, VoteItem } from "./votes";

// EventCategory keys will be converted to strings when making API calls to /events
export enum EventCategory {
    ALL = 0,
    SPORTS,
    GAMES,
    EDUCATIONAL,
    MUSIC,
    ART,
    FOOD,
}

export const EventCategoryName = new Map<number, string>([
    [EventCategory.ALL, 'All'],
    [EventCategory.SPORTS, 'Sports'],
    [EventCategory.GAMES, 'Games'],
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
            case "GAMES":
                return EventCategory.GAMES;
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
        let response = await EventService.showEvent(eventId);
        let newEventItem: EventItem

        return EventService.showEvent(eventId).then((res: AxiosResponse) => {
            if (res.status === 200) {
                newEventItem = {
                    id: eventId,
                    name: res.data.name,
                    description: res.data.description,
                    time: res.data.time,
                    location: res.data.location,
                    currentCapacity: res.data.current_capacity,
                    totalCapacity: res.data.total_capacity,
                    interestRating: res.data.interest_rating,
                    category: this.mapToCategory(res.data.category),
                    hostId: res.data.host_id, 
                    ticketId: res.data._my_ticket,
                    voteId: res.data._my_vote
                }
            } else {
                console.error("There was an error finding this event.");
            }
        }).then(() => {
            UserService.getUser(newEventItem.hostId).then(res => {
                newEventItem.host = res;
            }).catch(ex => {
                if (ex instanceof InvalidIdError) {
                    console.error("Ignoring invalid hostId when populating event list. hostId was: " + ex.id)
                    newEventItem.host = null;
                } else {
                    throw ex;
                }
            })
        }).then(() => {
            TicketService.getTicket(newEventItem.ticketId).then(res => {
                newEventItem.ticket = res;
            }).catch(ex => {
                if (ex instanceof InvalidIdError) {
                    console.error("Ignoring invalid ticketId when populating event list. ticketId was: " + ex.id)
                } else {
                    throw ex;
                }
            });
        }).then(() => {
            VoteService.getVote(newEventItem.voteId).then(res => {
                newEventItem.vote = res;
            }).catch(ex => {
                if (ex instanceof InvalidIdError) {
                    console.error("Ignoring invalid voteId when populating event list. voteId was: " + ex.id)
                } else {
                    throw ex;
                }
            });
        }).then(() => {
            return newEventItem;
        });
    }

    public static async getAllEventItems(filters: EventListFilterSetting): Promise<EventItem[]> {

        let response = await EventService.indexEvents(filters)
        let eventIds: string[] = response.data

        let events: EventItem[] = []
        

        await Promise.all(eventIds.map(function(eventId) {
            return EventService.getEventItem(eventId);
        })).then((event: EventItem[]) => {
            events = event;
        });

        return events
    }

    public static async upvote(event: EventItem): Promise<EventItem> {
        return this.createOrChangeVote(event, 1)
    }
    
    public static async downvote(event: EventItem): Promise<EventItem> {
        return this.createOrChangeVote(event, -1)
    }
    
    public static async novote(event: EventItem): Promise<EventItem> {
        return this.createOrChangeVote(event, 0)
    }

    private static async createOrChangeVote(event: EventItem, value: number): Promise<EventItem> {
        // Create a shallow copy of the EventItem, so we don't modify the argument
        let newEvent: EventItem = Object.assign({}, event); 

        if (!event.vote) {
            // If the vote doesn't exist, we have to create it
            newEvent.vote = await VoteService.createVote({eventId: event.id, value: value});
        } else {
            // The event already exists, so just update it
            newEvent.vote = await VoteService.updateVote(event.vote.id, {eventId: event.id, value: value})
        }

        return newEvent;
    }
}