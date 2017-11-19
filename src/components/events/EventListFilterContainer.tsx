import { EventListFilterSetting } from "./EventListFilterSetting";
import { connect } from 'react-redux'
import { EventListFilterSettingActionNew } from '../../actions/EventListFilterSettingActions'
import { EventListFilter } from './EventListFilter'
import { withRouter } from 'react-router-dom'
import { EventHawkAppState } from "../../reducers/EventHawkAppReducer";

const mapDispatchToProps = (dispatch: any) => {
    return {
        onFilterApplied: (newFilter: EventListFilterSetting) => {
            dispatch(EventListFilterSettingActionNew(newFilter))
        }
    }
}

const mapStateToProps = (state: EventHawkAppState) => {
    return {
        filters: state.eventListFilterSettingState,
    }
}

export const EventListFilterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(EventListFilter))
