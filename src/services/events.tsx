import * as React from "react";
import { Link } from "react-router-dom";
import { configVals } from "./config";
import axios from "axios";
import { AxiosResponse } from "axios";
import { UserService } from "./user";
import { EventItem } from "../components/events/EventItem";
import { InvalidIdError } from "./exceptions";
import { EventListFilterSetting } from "../components/events/EventListFilterSetting";
import { TicketService } from "./tickets";
import { VoteService, VoteItem } from "./votes";
import * as moment from "moment";
import { ReviewService, UpdateReviewItem } from "./reviews";

// EventCategory keys will be converted to strings when making API calls to /events
export enum EventCategory {
    ALL = 0,
    SPORTS,
    GAMES,
    EDUCATION,
    MOVIES,
    MUSIC,
    ART,
    FOOD
}

export const EventCategoryName = new Map<number, string>([
    [EventCategory.ALL, 'All'],
    [EventCategory.SPORTS, 'Sports'],
    [EventCategory.GAMES, 'Games'],
    [EventCategory.EDUCATION, 'Education'],
    [EventCategory.MOVIES, 'Movies'],
    [EventCategory.MUSIC, 'Music'],
    [EventCategory.ART, 'Art'],
    [EventCategory.FOOD, 'Food'],
]);

export interface CreateEventItem {
    name: string,
    description: string,
    time: moment.Moment,
    location: string,
    totalCapacity: number,
    category: EventCategory,
}

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
            case "EDUCATION":
                return EventCategory.EDUCATION;
            case "MOVIES":
                return EventCategory.MOVIES;
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
                    time: moment(res.data.time),
                    location: res.data.location,
                    currentCapacity: res.data._current_capacity || 0,
                    totalCapacity: res.data.total_capacity,
                    interestRating: res.data._interest_rating || 0,
                    category: this.mapToCategory(res.data.category),
                    hostId: res.data.host_id,
                    ticketId: res.data._my_ticket,
                    voteId: res.data._my_vote,
                    reviewId: res.data._my_review,
                    reviewWouldReturn: res.data._review_would_ret,
                    reviewHostPrep: res.data._review_host_prep,
                    reviewMatchedDesc: res.data._review_matched_desc,
                }
            } else {
                console.error("There was an error finding this event.");
            }
        }).then(() => {
            return UserService.getUser(newEventItem.hostId).then(res => {
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
            if (newEventItem.ticketId != null) {
                return TicketService.getTicket(newEventItem.ticketId).then(res => {
                    newEventItem.ticket = res;
                }).catch(ex => {
                    if (ex instanceof InvalidIdError) {
                        console.error("Ignoring invalid ticketId when populating event list. ticketId was: " + ex.id)
                    } else {
                        throw ex;
                    }
                });
            }
        }).then(() => {
            if (newEventItem.voteId != null) {
                return VoteService.getVote(newEventItem.voteId).then(res => {
                    newEventItem.vote = res;
                }).catch(ex => {
                    if (ex instanceof InvalidIdError) {
                        console.error("Ignoring invalid voteId when populating event list. voteId was: " + ex.id)
                    } else {
                        throw ex;
                    }
                });
            }
        }).then(() => {
            if (newEventItem.reviewId != null) {
                return ReviewService.getReview(newEventItem.reviewId).then(res => {
                    newEventItem.review = res;
                }).catch(ex => {
                    if (ex instanceof InvalidIdError) {
                        console.error("Ignoring invalid reviewId when populating event list. reviewId was: " + ex.id)
                    } else {
                        throw ex;
                    }
                });
            }
        }).then(() => {
            return newEventItem;
        });
    }

    public static async getAllEventItems(filters: EventListFilterSetting): Promise<EventItem[]> {

        let response = await EventService.indexEvents(filters);
        let eventIds: string[] = response.data;

        let events: EventItem[] = [];

        events = await Promise.all(
            eventIds.map(
                function (eventId) {
                    return EventService.getEventItem(eventId);
                }
            )
        );

        return events;
    }

    public static async upvote(event: EventItem): Promise<EventItem> {
        return this.createOrChangeVote(event, 1);
    }

    public static async downvote(event: EventItem): Promise<EventItem> {
        return this.createOrChangeVote(event, -1);
    }

    public static async novote(event: EventItem): Promise<EventItem> {
        return this.createOrChangeVote(event, 0);
    }

    private static async createOrChangeVote(event: EventItem, value: number): Promise<EventItem> {
        // Create a shallow copy of the EventItem, so we don't modify the argument
        let newEvent: EventItem = Object.assign({}, event);

        let oldValue = 0;

        if (!event.vote) {
            // If the vote doesn't exist, we have to create it
            newEvent.vote = await VoteService.createVote({ eventId: event.id, value: value });
            newEvent.voteId = newEvent.vote.id;
        } else {
            // The event already exists, so just update it
            oldValue = event.vote.value;
            newEvent.vote = await VoteService.updateVote(event.vote.id, { eventId: event.id, value: value });
        }
        
        let deltaValue: number = oldValue - value;

        newEvent.interestRating -= deltaValue;

        return newEvent;
    }

    public static async requestCreateEvent(event: CreateEventItem): Promise<AxiosResponse> {
        let url = configVals.apiRoot + configVals.events;

        let body = {
            "event":
                {
                    "name": event.name,
                    "description": event.description,
                    "time": event.time.toISOString(),
                    "location": event.location,
                    "total_capacity": event.totalCapacity,
                    "category": EventCategory[event.category],
                }
        }
        return axios.post(url, body, UserService.getAuthenticationHeader());
    }

    public static async createEvent(event: CreateEventItem): Promise<{ succeeded: boolean, message: string }> {

        let item: EventItem = null;

        let response: AxiosResponse;

        try {
            response = await this.requestCreateEvent(event);
        } catch (e) {
            if (e.response && (e.response.status >= 400 && e.response.status < 500)) {
                // TODO: Handle specific exceptions
                // TODO: Remove user facing error messages from service: They belong in the presentation layer
                console.error(e);
                let message: string = "Error!";

                if (e.response.status === 409) {
                    message = "This event already exists! Change the title and try again.";
                }

                return { succeeded: false, message: message }
            } else {
                throw e;
            }
        }

        if (response.status >= 200 && response.status < 300) {
            return { succeeded: true, message: "Success!" }
        }
    }

    public static async createTicket(event: EventItem): Promise<EventItem> {
        // Create a shallow copy of the EventItem, so we don't modify the argument
        let newEvent: EventItem = Object.assign({}, event);

        newEvent.ticket = await TicketService.createTicket({ eventId: event.id });
        newEvent.ticketId = newEvent.ticket.id;
        newEvent.currentCapacity++;

        return newEvent;
    }

    public static async deleteTicket(event: EventItem): Promise<EventItem> {
        // Create a shallow copy of the EventItem, so we don't modify the argument
        let newEvent: EventItem = Object.assign({}, event);

        await TicketService.deleteTicket(event.ticket);
        newEvent.ticket = null;
        newEvent.ticketId = null;
        newEvent.currentCapacity--;

        return newEvent;
    }

    public static async createOrChangeReview(event: EventItem, review: UpdateReviewItem): Promise<EventItem> {
        if (!event.review) {
            // If the review doesn't exist, we have to create it
            await ReviewService.createReview({eventId: event.id, ...review});
        } else {
            // The event already exists, so just update it
            await ReviewService.updateReview(event.reviewId, review);
        }
        
        // Since reviews are calculated by the API, it's safer to retrieve the event from the API
        // than to modify the cached event.
        return EventService.getEventItem(event.id);
    }

}