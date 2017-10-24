import * as React from "react";
import { Link } from "react-router-dom";
import {configVals} from "./config";
import axios from "axios";
import { AxiosResponse } from "axios";

export class EventService {
    static async getAll(): Promise<AxiosResponse> { return axios.get(configVals.apiRoot + configVals.events); }
}