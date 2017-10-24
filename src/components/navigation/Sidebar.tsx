import * as React from "react";
import { NavLink } from "react-router-dom"
export interface SidebarProps { event: React.MouseEventHandler<HTMLElement> }
export class Sidebar extends React.Component<SidebarProps, {}> {
    render() {
        return <div className="sidebar left">
            <ul>
                <li><NavLink to={`/`} exact activeClassName="active" onClick={this.props.event}><i className="fa fa-rss" aria-hidden="true"></i> Stream</NavLink></li>
                <li><NavLink to={`/myevents`} onClick={this.props.event}><i className="fa fa-calendar-o" aria-hidden="true"></i> My Events</NavLink></li>
                <li><NavLink to={`/events/create`} onClick={this.props.event}><i className="fa fa-plus" aria-hidden="true"></i> Create Event</NavLink></li>
            </ul>
        </div>
    }
}