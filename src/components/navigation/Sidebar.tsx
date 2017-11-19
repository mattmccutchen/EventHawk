import * as React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { EventHawkAppState } from "../../reducers/EventHawkAppReducer";
import { AuthenticationState } from "../../common/state/Auth";

export interface SidebarProps { 
    type?: string, 
    event: React.MouseEventHandler<HTMLElement>,
    authState?: AuthenticationState
    history?: { push(path: string): any }
}

const mapStateToProps = (state: EventHawkAppState) => {
    return {
        authState: state.authState
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
        } else {
            el = <div className="sidebar left">
                <ul>
                    <li><NavLink to={`/`} exact activeClassName="active" onClick={this.props.event}><i className="fa fa-rss" aria-hidden="true"></i> Stream</NavLink></li>
                    <li><NavLink to={`/myevents`} onClick={this.props.event}><i className="fa fa-calendar-o" aria-hidden="true"></i> My Events</NavLink></li>
                    <li><NavLink to={`/events/create`} onClick={this.props.event}><i className="fa fa-plus" aria-hidden="true"></i> Create Event</NavLink></li>
                </ul>
            </div>;
        }

        return el;
    }
}

export const Sidebar = withRouter(connect(mapStateToProps, null)(SidebarComponent));