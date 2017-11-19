import { configVals } from "./config";
import axios from "axios";
import { AxiosResponse } from "axios";
import { UserService } from "./user"
import { InvalidIdError } from "./exceptions";

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
                isActive:response.data.is_active
            }
            return item;
        }
    }
}