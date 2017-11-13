import { EventListFilterSetting } from "../components/events/EventListFilterSetting";
import { EventListFilterSettingReducerAction } from "../reducers/EventListFilterSettingReducer";

export const EventListFilterSettingActionNew = (newSetting: EventListFilterSetting): EventListFilterSettingReducerAction => {
    return {
        type: "NEW",
        newSetting
    }
}