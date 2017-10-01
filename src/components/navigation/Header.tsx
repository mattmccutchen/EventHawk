import * as React from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap"
import { Navbar, Nav, NavItem } from "react-bootstrap";
export class Header extends React.Component {
    render() {
        return <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/" className="header-logo">EventHawk</Link>
                </Navbar.Brand>

            </Navbar.Header>
            
            <Nav pullRight>
                    <NavItem className="options-container">
                        <Link to="login" className="option">Sign In</Link>
                    </NavItem>
                    <NavItem className="options-container">
                        <Link to="register" className="option">Sign Up</Link>
                    </NavItem>
                </Nav>
        </Navbar>
    }
    /* ReactDOM.render(navbarInstance, mountNode);*/
    /*
        render() {
            return <nav className="header">
                <Link to="/" className="navbar-brand header-logo">EventHawk</Link>
                <div className="options-container">
                    <Link to="login" className="option">Sign In</Link>
                    <Link to="register" className="option">Sign Up</Link>
                </div>
            </nav>
            }
        */
}