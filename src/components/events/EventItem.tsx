import { UserItem } from "../../services/user"
import { EventCategory } from "../../services/events";

export interface EventItem {
    name: string
    description: string
    time: string
    location: string
    totalCapacity: number
    category: EventCategory
    hostId: string
    id?: string
    interestRating?: number
    currentCapacity?: number
    host?: UserItem
}