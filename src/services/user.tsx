import * as React from "react";
import * as JwtDecode from "jwt-decode";
import axios from "axios";
import { AxiosResponse } from "axios";
import { configVals } from "./config";

export class UserService {

    /* Login */

    public static async performLogin(email: string, password: string): Promise<AxiosResponse> {
        return axios.post(configVals.apiRoot + configVals.login, {
            auth: {
                "email": email,
                "password": password
            }
        });
    }

    public static getUserId() {
        window.localStorage.getItem("user_id");
    }

    private static setUserId(): void {
        var token: string = this.getToken();
        var decoded: { user_id: string } = JwtDecode(token);
        window.localStorage.setItem("user_id", decoded.user_id);
    }

    public static isLoggedIn(): boolean {
        return this.getUserId() != null;
    }

    public static getToken(): string {
        return window.localStorage.getItem("token");
    }

    public static saveToken(token: string): void {
        window.localStorage.setItem("token", token);
        this.setUserId();
    }

    public static getAuthenticationHeader(): { headers: { Authorization: string } } {
        return {
            headers: {
                Authorization: `Bearer ${UserService.getToken()}`
            }
        }
    }


    /* User API */

    private static async showUser(userId: string): Promise<AxiosResponse> {
        return axios.get(configVals.apiRoot + configVals.users + "/" + userId, UserService.getAuthenticationHeader())
    }

    public static async getUserItem(userId: string): Promise<UserItem> {
        let response = await axios.get(configVals.apiRoot + configVals.users + "/" + userId, UserService.getAuthenticationHeader())

        // Assume showUser returns an array of user items with exactly 0 or 1 item
        if (response.data.length == 1) {
            let user = response.data[0]
            let newUserItem: UserItem = {
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                id: userId
            }
            return newUserItem
        }
        return null
    }
}

export interface UserItem {
    firstName: string
    lastName: string
    email: string
    id: string
}
