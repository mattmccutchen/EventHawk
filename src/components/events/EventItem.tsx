export interface EventItem {
    name: string
    description: string
    time: string
    location: string
    totalCapacity: number
    category: string
    hostId: string
    id?: string
    currentCapacity?: number
    interestRating?: number
}