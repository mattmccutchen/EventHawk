export class EventItem {
    
    title: string
    description: string
    userName: string
    userId: string
    attendeeIds: string[]

    constructor(title: string, description: string, userName: string, userId: string, attendeeIds: string[]) {
        this.title = title;
        this.description = description;
        this.userName = userName;
        this.userId = userId;
        this.attendeeIds = attendeeIds ? attendeeIds : [];
    }
}