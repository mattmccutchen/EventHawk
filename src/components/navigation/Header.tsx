import * as React from "react";
import { Link } from "react-router-dom";
import { DropSidebar } from "./DropSidebar"

export class Header extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return <nav className="header">
            <DropSidebar />
            <Link to="/" className="navbar-brand header-logo">EventHawk</Link>
            <div className="options-container">
                <div className="links">
                    <input type="text" className="header-input search" placeholder="Search for events" />
                    <input type="submit" className="header-search-submit" value="" />
                    <Link to="login" className="option">Sign In</Link>
                    <Link to="signup" className="option">Sign Up</Link>
                </div>
            </div>
        </nav>
    }
}