import * as React from "react";
import { Link } from "react-router-dom";
import {configVals} from "./config";
import axios from "axios";

export class UserService {
    static performLogin(email: String, password: String) {
        axios.post(configVals.apiRoot + configVals.login, {
            auth: {
                "user_id": email,
                "password": password
            }
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

    static getUser(id: String) {
        axios.get(configVals.apiRoot + configVals.users + "/" + id).then(function (response) {
            return response;
        }).catch(function (error) {
            console.log(error);
        });
    }
}