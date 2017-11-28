import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { EventList } from "../components/events/EventList";
import { Dropdown, dropdownItem } from "../components/navigation/Dropdown";
import { EventListFilterSetting } from "../components/events/EventListFilterSetting";
import { EventListFilterSettingActionNew } from "../actions/EventListFilterSettingActions";
import { UserService } from "../services/user";
import { EventCategoryName } from "../services/events";
import { EventHawkAppState } from "../reducers/EventHawkAppReducer";
import { AuthenticationState } from "../common/state/Auth";

interface IHomeProps {
    onFilterApplied(newFilter: EventListFilterSetting): any,
    authState: AuthenticationState,
    history?: { push(path: string): any },
    filters: EventListFilterSetting
}

interface IHomeState {
    feedLoading: boolean
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onFilterApplied: (newFilter: EventListFilterSetting) => {
            dispatch(EventListFilterSettingActionNew(newFilter))
        }
    }
}

const mapStateToProps = (state: EventHawkAppState) => {
    return {
        authState: state.authState,
        filters: state.eventListFilterSettingState
    }
}

class HomeViewComponent extends React.Component<IHomeProps, IHomeState> {

    constructor(props: IHomeProps) {
        super(props);
        this.setFeedLoading = this.setFeedLoading.bind(this);
        this.state = {
            feedLoading: true
        }
    }

    componentWillMount() {
        if (!UserService.isLoggedIn()) {
            this.props.history.push("/login");
        }
    }

    setFeedLoading(loading: boolean) {
        this.setState({ feedLoading: loading });
    }

    render() {
        let items: dropdownItem[] = [{
            label: "Interest Rating (Ascending)", link: "", extra: { 
                order: "interest_ascending", onFilterApplied: this.props.onFilterApplied, filters: this.props.filters 
            }
        },
        {
            label: "Interest Rating (Descending)", link: "", extra: { 
                order: "interest_descending", onFilterApplied: this.props.onFilterApplied, filters: this.props.filters
            }
        }];

        let currentCategory: string = EventCategoryName.get(this.props.filters.category);
        
        return <div>
            <h1>Upcoming Events</h1>
            <div className="events-home-info">
                <div className="events-dropdown-box">
                    <div className="events-home-sort">
                        <Dropdown className="" items={items}>Sort</Dropdown>
                    </div>
                </div>
                <div className="events-dropdown-box">
                    <div className="events-home-filter">
                        { this.state.feedLoading && <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i> }
                        Filter: <strong>{currentCategory}</strong>
                    </div>
                </div>
            </div>
            { UserService.isLoggedIn() && <EventList showFilterButton={true} setFeedLoading={this.setFeedLoading} /> }
        </div>
    }
}

export const HomeView = connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeViewComponent));