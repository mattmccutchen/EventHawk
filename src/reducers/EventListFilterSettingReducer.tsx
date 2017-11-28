import { EventListFilterSetting } from "../components/events/EventListFilterSetting";
import { AnyAction } from "redux";

export interface EventListFilterSettingReducerAction extends AnyAction {
    type: string,
    newSetting: EventListFilterSetting
}

const EventListFilterSettingReducer = (state: EventListFilterSetting = { category: 0, sort: "interest_descending" }, action: EventListFilterSettingReducerAction) => {
    switch (action.type) {
        case "NEW":
            return action.newSetting
        default:
            return state
    }
}

export default EventListFilterSettingReducer