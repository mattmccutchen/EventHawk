import * as React from "react";
import axios from "axios";
import * as JwtDecode from "jwt-decode";
import { configVals } from "./config";

export class UserService {
    public static performLogin(email: string, password: string): void {
        axios.post(configVals.apiRoot + configVals.login, {
            auth: {
                "email": email,
                "password": password
            }
        }).then(response => {
            this.saveToken(response.data.jwt);
        }).catch(function (error) {
            console.log(error);
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

    private static getToken(): string {
        return window.localStorage.getItem("token");
    }

    private static saveToken(token: string): void {
        window.localStorage.setItem("token", token);
        this.setUserId();
    }

    public static getAuthenticationHeader(): { headers: { Authorization: string } } {
        return {
            headers: { 
                Authorization: `Bearer ${UserService.getToken()}` }
        }
    }
}