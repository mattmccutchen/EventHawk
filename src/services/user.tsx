import * as React from "react";
import * as JwtDecode from "jwt-decode";
import axios from "axios";
import { AxiosResponse } from "axios";
import { configVals } from "./config";

export class UserService {
    
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
}