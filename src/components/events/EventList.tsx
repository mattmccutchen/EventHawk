import { EventListPresentation } from "./EventListPresentation"
import { EventHawkAppState } from "../../reducers/EventHawkAppReducer";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state: EventHawkAppState, ownProps: any) => {
    return {
        // If filters were passed in as properties to this component,
        // use those filters instead of the global filters from the state
        filters: ("filters" in ownProps) ? ownProps.filters : state.eventListFilterSettingState,
        authState: state.authState
    }
}

export const EventList = withRouter(connect(mapStateToProps, null)(EventListPresentation));