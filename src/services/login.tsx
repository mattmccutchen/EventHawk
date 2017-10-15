import * as React from "react";
import { Link } from "react-router-dom";
import {configVals} from "./config";
import axios from "axios";

export class LoginService {
    static performLogin(email: String, password: String) {
        axios.post(configVals.apiRoot + "login", {
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
}