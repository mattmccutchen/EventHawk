import { combineReducers } from 'redux'
import EventListFilterSettingReducer from './EventListFilterSettingReducer'
import { EventListFilterSetting } from "../components/events/EventListFilterSetting";

const EventHawkAppReducer = combineReducers({
  eventListFilterSettingState: EventListFilterSettingReducer
})


export interface EventHawkAppState {
    eventListFilterSettingState: EventListFilterSetting
}

export default EventHawkAppReducer