import * as React from "react";
import { Link } from "react-router-dom";
import { configVals } from "./config";
import axios from "axios";
import { AxiosResponse } from "axios";
import { UserService } from "./user"

export class EventService {
    static async indexEvents(): Promise<AxiosResponse> {
        return axios.get(configVals.apiRoot + configVals.events, UserService.getAuthenticationHeader());
    }

    static async showEvent(id: string): Promise<AxiosResponse> {
        return axios.get(configVals.apiRoot + configVals.events + "/" + id, UserService.getAuthenticationHeader())
    }
}