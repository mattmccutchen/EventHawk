import * as React from "react";
import { NavLink } from "react-router-dom"
export interface sidebarProps {type: String}
export class Sidebar extends React.Component<sidebarProps, undefined> {
    render() {
        if (this.props.type === "left")
            return <div className={` sidebar ${ this.props.type } `}>
                <ul>
                    <li><NavLink to={`/`} exact activeClassName="active"><i className="fa fa-rss" aria-hidden="true"></i> Stream</NavLink></li>
                    <li><NavLink to={`/myevent`}><i className="fa fa-calendar-o" aria-hidden="true"></i> My Events</NavLink></li>
                    <li><NavLink to={`/events/create`}><i className="fa fa-plus" aria-hidden="true"></i> Create Event</NavLink></li>
                </ul>
            </div>
        else
            return <div className={` sidebar ${ this.props.type } `}>
                <div className="area">
                    
                </div>
            </div>
    }
}