import * as React from "react";
import { Link } from "react-router-dom";
export class Header extends React.Component {
    render() {
        return <nav className="header">
            <Link to="/" className="navbar-brand header-logo">EventHawk</Link>
            <div className="options-container">
                <Link to="login" className="option">Sign In</Link>
                <Link to="register" className="option">Sign Up</Link>
            </div>
        </nav>
    }
}