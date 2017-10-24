import * as React from "react";
import { NavLink } from "react-router-dom"
import { Sidebar } from "./Sidebar"

export interface IDropSidebarState { isOpen: boolean }

export class DropSidebar extends React.Component<{}, IDropSidebarState> {

    constructor(props: any) {
        super(props);
        this.state = { isOpen: false };
    }

    sidebarLinkClick(e: Event) {
        e.preventDefault();
        this.setState({ isOpen: false });
    }

    render() {
        return <div id="side_navbar">
            <input type="checkbox" id="side_navbar_ch" checked={this.state.isOpen} onClick={() => this.setState({ isOpen: !this.state.isOpen })} />
            <i className="fa fa-bars"></i>
            <i className="fa fa-times"></i>
            <ul id="side_nav_dropin">
                <Sidebar event={e => this.sidebarLinkClick} />
            </ul>
        </div>
    }
}