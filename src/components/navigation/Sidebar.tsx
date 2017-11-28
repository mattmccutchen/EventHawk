import * as React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CategoryPicker from "../events/CategoryPicker";
import { EventListFilterSetting } from "../events/EventListFilterSetting";
import { EventListFilterSettingActionNew } from "../../actions/EventListFilterSettingActions";
import { EventHawkAppState } from "../../reducers/EventHawkAppReducer";
import { AuthenticationState } from "../../common/state/Auth";

export interface SidebarProps {
    onFilterApplied(newFilter: EventListFilterSetting): any,
    type?: string, 
    event: React.MouseEventHandler<HTMLElement>,
    authState: AuthenticationState
    history?: { push(path: string): any },
    filters: EventListFilterSetting
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

class SidebarComponent extends React.Component<SidebarProps, {}> {

    constructor(props: SidebarProps) {
        super(props);
    }

    render() {
        let el: JSX.Element = null;

        if (this.props.type === "user") {
            el = <div className="sidebar left user">
                <div className="group">
                    <span className="header">{`${this.props.authState.first_name} ${this.props.authState.last_name}`}</span>
                </div>
            </div>
        } else if (this.props.type === "options") {
            el = <div className="sidebar right">
                <div className="group">
                    <span className="header">Categories</span>
                    <CategoryPicker renderAs="links" handleInputChange={this.props.onFilterApplied} filters={this.props.filters} allowAll />
                </div>
            </div>;
        } else {
            el = <div className="sidebar left">
                <div className="group">
                    <span className="header">General</span>
                    <ul>
                        <li><NavLink to={`/`} exact activeClassName="active" onClick={this.props.event}><i className="fa fa-rss" aria-hidden="true"></i>Events</NavLink></li>
                        <li><NavLink to={`/user/` + this.props.authState.user_id} onClick={this.props.event}><i className="fa fa-calendar-o" aria-hidden="true"></i> My Events</NavLink></li>
                        <li><NavLink to={`/events/create`} onClick={this.props.event}><i className="fa fa-plus" aria-hidden="true"></i> Create Event</NavLink></li>
                    </ul>
                </div>
            </div>;
        }

        return el;
    }
}

export const Sidebar = connect(mapStateToProps, mapDispatchToProps)(withRouter(SidebarComponent));
