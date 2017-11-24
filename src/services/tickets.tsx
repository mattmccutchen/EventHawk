import { configVals } from "./config";
import axios from "axios";
import { AxiosResponse } from "axios";
import { UserService } from "./user"
import { InvalidIdError, InvalidPropertyError } from "./exceptions";

export interface TicketItem {
    id: string,
    isAttending: boolean,
    attendeeId: string,
    eventId: string,
    isActive: boolean
}

export class TicketService {
    public static async showTicket(id: string): Promise<AxiosResponse> {
        let url = configVals.apiRoot + configVals.tickets + "/" + id

        let requestProperties = {
            params: {}
        }

        Object.assign(requestProperties, UserService.getAuthenticationHeader())

        return axios.get(url, requestProperties);
    }

    public static async getTicket(id: string): Promise<TicketItem> {

        let item: TicketItem = null;

        let response: AxiosResponse;

        try {
            response = await this.showTicket(id);
        } catch (e) {
            if (e.response && e.response.status === 404) {
                throw new InvalidIdError(id);
            } else {
                throw e;
            }
        }

        if (response.status === 200) {
            item = {
                id: id,
                isAttending: response.data.attending,
                attendeeId: response.data.attendee_id,
                eventId: response.data.event_id,
                isActive: response.data.is_active
            }
            return item;
        }
    }

    public static async requestCreateTicket(ticket: { eventId: string }): Promise<AxiosResponse> {
        let url = configVals.apiRoot + configVals.tickets

        let body = {
            "ticket":
                {
                    "attending": true,
                    "event_id": ticket.eventId
                }
        }
        return axios.post(url, body, UserService.getAuthenticationHeader());
    }

    public static async createTicket(ticket: { eventId: string }): Promise<TicketItem> {

        let item: TicketItem = null;

        let response: AxiosResponse;

        if (!ticket.eventId) {
            throw new InvalidPropertyError("eventId", ticket.eventId);
        }

        try {
            response = await this.requestCreateTicket({ eventId: ticket.eventId });
        } catch (e) {
            if (e.response && (e.response.status >= 400 && e.response.status < 500)) {
                throw new InvalidPropertyError("eventId", ticket.eventId);
            } else {
                throw e;
            }
        }

        if (response.status >= 200 && response.status < 300) {
            item = {
                id: response.data.ticket_id,
                eventId: response.data.event_id,
                attendeeId: response.data.attendee_id,
                isActive: response.data.is_active,
                isAttending: response.data.attending
            }
            return item;
        }
    }

    public static async requestDeleteTicket(id: string): Promise<AxiosResponse> {
        let url = configVals.apiRoot + configVals.tickets + "/" + id

        return axios.delete(url, UserService.getAuthenticationHeader());
    }

    public static async deleteTicket(ticket: TicketItem): Promise<void> {

        let response: AxiosResponse;

        try {
            response = await this.requestDeleteTicket(ticket.id);
        } catch (e) {
            if (e.response && e.response.status === 404) {
                throw new InvalidIdError(ticket.id);
            } else {
                throw e;
            }
        }

        if (response.status >= 200 && response.status < 300) {
            return
        }
    }

}