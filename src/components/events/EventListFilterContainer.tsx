import { EventListFilterSetting } from "./EventListFilterSetting";
import { connect } from 'react-redux'
import { EventListFilterSettingActionNew } from '../../actions/EventListFilterSettingActions'
import { EventListFilter } from './EventListFilter'
import { withRouter } from 'react-router-dom'

const mapDispatchToProps = (dispatch: any) => {
    return {
        onFilterApplied: (newFilter: EventListFilterSetting) => {
            dispatch(EventListFilterSettingActionNew(newFilter))
        }
    }
}

export const EventListFilterContainer = connect(
    null,
    mapDispatchToProps
)(withRouter(EventListFilter))
