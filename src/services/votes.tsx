import { configVals } from "./config";
import axios from "axios";
import { AxiosResponse } from "axios";
import { UserService } from "./user"
import { InvalidIdError, InvalidPropertyError } from "./exceptions";

export interface VoteItem {
    id: string,
    voterId: string,
    eventId: string,
    value: number
}

export class VoteService {
    public static async requestGetVote(id: string): Promise<AxiosResponse> {
        let url = configVals.apiRoot + configVals.votes + "/" + id

        let requestProperties = {
            params: {}
        }

        Object.assign(requestProperties, UserService.getAuthenticationHeader())

        return axios.get(url, requestProperties);
    }

    public static async getVote(id: string): Promise<VoteItem> {

        let item: VoteItem = null;

        let response: AxiosResponse;

        try {
            response = await this.requestGetVote(id);
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
                voterId: response.data.voter_id,
                eventId: response.data.event_id,
                value: response.data.value
            }
            return item;
        }
    }

    public static async requestCreateVote(vote: {eventId: string, value: number}): Promise<AxiosResponse> {
        let url = configVals.apiRoot + configVals.votes

        let body = {
            "vote":
                {
                    "value": vote.value,
                    "event_id": vote.eventId
                }
        }
        return axios.post(url, body, UserService.getAuthenticationHeader());
    }

    public static async createVote(vote: {eventId: string, value: number}): Promise<VoteItem> {

        let item: VoteItem = null;

        let response: AxiosResponse;

        if (!vote.eventId) {
            throw new InvalidPropertyError("eventId", vote.eventId);
        }
        if (vote.value == null) {
            throw new InvalidPropertyError("value", vote.eventId);
        }

        try {
            response = await this.requestCreateVote({eventId: vote.eventId, value: vote.value});
        } catch (e) {
            if (e.response && (e.response.status >= 400 && e.response.status < 500)) {
                throw new InvalidPropertyError("eventId", vote.eventId);
            } else {
                throw e;
            }
        }

        if (response.status >= 200 && response.status < 300) {
            item = {
                id: response.data.vote_id,
                voterId: response.data.voter_id,
                eventId: response.data.event_id,
                value: response.data.value
            }
            return item;
        }
    }

    
    public static async requestUpdateVote(voteId: string, vote: {value: number, eventId: string}): Promise<AxiosResponse> {
        let url = configVals.apiRoot + configVals.votes + "/" + voteId

        let body = {
            "vote":
                {
                    "value": vote.value,
                    "event_id": vote.eventId
                }
        }
        return axios.put(url, body, UserService.getAuthenticationHeader());
    }

    public static async updateVote(voteId: string, vote: {value: number, eventId: string}): Promise<VoteItem> {

        let updatedVote: VoteItem

        let response: AxiosResponse;

        try {
            response = await this.requestUpdateVote(voteId, { value: vote.value, eventId: vote.eventId });
        } catch (e) {
            if (e.response && (e.response.status >= 400 && e.response.status < 500)) {
                throw new InvalidPropertyError("eventId", vote.eventId);
            } else {
                throw e;
            }
        }

        if (response.status >= 200 && response.status < 300) {
            updatedVote = {
                id: response.data.vote_id,
                voterId: response.data.voter_id,
                eventId: response.data.event_id,
                value: response.data.value
            }
            return updatedVote;
        }
    }
}