import * as React from "react";
import { Link } from "react-router-dom";
import {configVals} from "./config";
import axios from "axios";

export class EventService {
    static getAll() {
        axios.get(configVals.apiRoot + configVals.events).then(function (response) {
            return response.data;
        }).catch(function (error) {
            console.log(error);
        });
    }
}