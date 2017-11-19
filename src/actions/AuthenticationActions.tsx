import { AnyAction } from "redux";
import { AuthenticationState, AUTHENTICATION_SET } from "../common/state/Auth";
import { AuthenticationAction } from "../reducers/AuthenticationReducer";

export const setUserState = (authSetting: AuthenticationState): AuthenticationAction => {
    return {
        type: AUTHENTICATION_SET,
        authSetting
    }
};