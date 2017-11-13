import { combineReducers } from "redux";

import { EventListFilterSetting } from "../components/events/EventListFilterSetting";
import { AuthenticationState } from "../common/state/Auth";

import EventListFilterSettingReducer from "./EventListFilterSettingReducer";
import AuthenticationReducer from "./AuthenticationReducer";

const EventHawkAppReducer = combineReducers({
  eventListFilterSettingState: EventListFilterSettingReducer,
  authState: AuthenticationReducer
})


export interface EventHawkAppState {
    eventListFilterSettingState: EventListFilterSetting,
    authState: AuthenticationState
}

export default EventHawkAppReducer