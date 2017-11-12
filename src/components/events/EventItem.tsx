import { UserItem } from "../../services/user"

export interface EventItem {
    name: string
    description: string
    time: string
    location: string
    totalCapacity: number
    category: string
    hostId: string
    id?: string
    interestRating?: number
    currentCapacity?: number
    host?: UserItem
}