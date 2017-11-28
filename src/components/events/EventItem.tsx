import { UserItem } from "../../services/user"
import { EventCategory } from "../../services/events";
import { TicketItem } from "../../services/tickets";
import { VoteItem } from "../../services/votes";
import * as moment from 'moment';
import { ReviewItem } from "../../services/reviews";

export interface EventItem {
    name: string
    description: string
    time: moment.Moment
    location: string
    totalCapacity: number
    category: EventCategory
    hostId?: string
    id?: string
    interestRating?: number
    currentCapacity?: number
    host?: UserItem
    ticketId?: string
    ticket?: TicketItem
    voteId?: string
    vote?: VoteItem
    reviewId?: string
    review?: ReviewItem
    reviewMatchedDesc?: number,
    reviewHostPrep?: number,
    reviewWouldReturn?: number
}