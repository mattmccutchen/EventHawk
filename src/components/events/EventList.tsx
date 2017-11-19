import { EventListPresentation } from "./EventListPresentation"
import { EventHawkAppState } from "../../reducers/EventHawkAppReducer";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state: EventHawkAppState) => {
    return {
        filters: state.eventListFilterSettingState
    }
}

export const EventList = withRouter(connect(mapStateToProps, null)(EventListPresentation));