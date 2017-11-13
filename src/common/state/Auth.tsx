export const LOGIN_SUCCESS: string =  "LOGIN_SUCCESS";
export const LOGIN_FAILURE: string = "LOGIN_FAIL";
export const LOGOUT_SUCCESS: string =  "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE: string = "LOGOUT_FAIL";

export const AUTHENTICATION_SET: string = "AUTHENTICATION_SET";

export interface AuthenticationState {
    loggedIn?: boolean,
    user_id?: string,
    first_name?: string,
    last_name?: string,
    email?: string
}