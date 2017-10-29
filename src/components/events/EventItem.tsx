export class EventItem {
    
    title: string
    description: string
    userName: string
    hostId: string
    attendeeIds: string[]
    name: string
    category: string

    constructor(title: string, description: string, userName: string, hostId: string, attendeeIds: string[], category: string) {
        this.title = title;
        this.description = description;
        this.userName = userName;
        this.hostId = hostId;
        this.attendeeIds = attendeeIds ? attendeeIds : [];
        this.name = name;
        this.description = description;
        this.category = category;
    }
}