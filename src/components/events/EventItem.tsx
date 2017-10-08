export class EventItem {
    
    userId: string
    attendeeIds: string[]

    constructor(userId: string, attendeeIds: string[]) {
        this.userId=userId;
        this.attendeeIds = attendeeIds ? attendeeIds : [];
    }
}