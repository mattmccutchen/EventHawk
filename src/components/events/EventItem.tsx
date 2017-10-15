export class EventItem {

    hostId: string
    attendeeIds: string[]
    name: string
    description: string

    constructor(hostId: string, attendeeIds: string[], name: string, description: string) {
        this.hostId = hostId;
        this.attendeeIds = attendeeIds ? attendeeIds : [];
        this.name = name;
        this.description = description;
    }
}