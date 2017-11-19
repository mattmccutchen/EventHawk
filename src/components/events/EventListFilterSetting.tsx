import { EventCategory } from "../../services/events";

export interface EventListFilterSetting {
    hostUserId?: string; // Only include items hosted by this user
    attendeeUserId?: string; // Only include items attended by this user
    category?: EventCategory; // Only include events with this category
}