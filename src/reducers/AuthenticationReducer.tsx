import { AnyAction } from "redux";
import { AuthenticationState, AUTHENTICATION_SET } from "../common/state/Auth";

export interface AuthenticationAction extends AnyAction {
    type: string,
    authSetting: AuthenticationState
}

const AuthenticationReducer = (state: AuthenticationState = {}, action: AuthenticationAction) => {
    switch (action.type) {
        case AUTHENTICATION_SET:
          return action.authSetting
        default:
          return state
      }
}

export default AuthenticationReducer;